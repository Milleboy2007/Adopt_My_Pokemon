import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adoption, AdoptionStatus } from '../entities/adoption.entity';
import { Pokemon } from 'src/Module/pokemon/entities/pokemon.entity';
import { User } from 'src/Module/users/user.entity';
import { Formulaire } from '../entities/formulaire.entity';

@Injectable()
export class AdoptionService {
  constructor(
    @InjectRepository(Adoption)
    private adoptionRepository: Repository<Adoption>,

    @InjectRepository(Formulaire)
    private formulaireRepository: Repository<Formulaire>,

    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createAdoption(
    userId: number,
    pokemonId: number,
    formulaireId: number,
  ) {
    //Formulaire
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    if (user.permLvl >= 2) {
      throw new BadRequestException(
        "Un administrateur ne peut pas creer une demande d'adoption client",
      );
    }

    const pokemon = await this.pokemonRepository.findOneBy({ id: pokemonId });

    if (!pokemon) {
      throw new NotFoundException('Pokemon introuvable');
    }

    if (pokemon.estAdopte) {
      throw new BadRequestException('Pokemon deja adopter');
    }

    const existingPending = await this.adoptionRepository.findOneBy({
      idClient: userId,
      idPokemon: pokemonId,
      statut: AdoptionStatus.PENDING,
    });

    if (existingPending) {
      throw new BadRequestException(
        'Une demande en attente existe deja pour ce Pokemon',
      );
    }

    const formulaire = await this.formulaireRepository.findOneBy({
      id: formulaireId,
    });

    if (!formulaire) {
      throw new NotFoundException('Formulaire introuvable');
    }

    if (formulaire.idClient !== userId) {
      throw new BadRequestException(
        "Ce formulaire n'appartient pas à cet utilisateur",
      );
    }

    const raisonRejet = this.checkAutoReject(formulaire, pokemon);

    let statut = AdoptionStatus.PENDING;
    let raison = '';

    if (raisonRejet) {
      statut = AdoptionStatus.REJECTED;
      raison = raisonRejet;
    }

    const adoption = this.adoptionRepository.create({
      idClient: userId,
      idPokemon: pokemonId,
      idFormulaire: formulaireId,
      statut: statut,
      rejectionReason: raison,
    });

    return this.adoptionRepository.save(adoption);
  }

  async findById(id: number) {
    const adoption = await this.adoptionRepository.findOneBy({ id });

    if (!adoption) {
      throw new NotFoundException("Demande d'adoption introuvable");
    }

    return adoption;
  }

  private async attachFormulaires(adoptions: Adoption[]) {
    return Promise.all(
      adoptions.map(async (adoption) => {
        const formulaire = await this.formulaireRepository.findOneBy({
          id: adoption.idFormulaire,
        });
        return { ...adoption, formulaire };
      }),
    );
  }

  async findPending() {
    const adoptions = await this.adoptionRepository.find({
      where: { statut: AdoptionStatus.PENDING },
      order: { dateCreation: 'ASC' },
    });
    return this.attachFormulaires(adoptions);
  }

  async findApproved() {
    const adoptions = await this.adoptionRepository.find({
      where: { statut: AdoptionStatus.APPROVED },
      order: { dateCreation: 'DESC' },
    });
    return this.attachFormulaires(adoptions);
  }

  async findRejected() {
    const adoptions = await this.adoptionRepository.find({
      where: { statut: AdoptionStatus.REJECTED },
      order: { dateCreation: 'DESC' },
    });
    return this.attachFormulaires(adoptions);
  }

  async approve(id: number, adminId: number) {
    const adoption = await this.findById(id);

    if (adoption.statut !== AdoptionStatus.PENDING) {
      throw new BadRequestException(
        'Seules les demandes en attente peuvent etre approuvers',
      );
    }

    const admin = await this.usersRepository.findOneBy({ id: adminId });

    if (!admin || admin.permLvl < 2) {
      throw new BadRequestException('Administrateur invalide');
    }

    const pokemon = await this.pokemonRepository.findOneBy({
      id: adoption.idPokemon,
    });

    if (!pokemon) {
      throw new NotFoundException('Pokemon introuvable');
    }

    if (pokemon.estAdopte) {
      throw new BadRequestException('Ce Pokemon a deja ete adopter');
    }

    const user = await this.usersRepository.findOneBy({id: adoption.idClient})
    if(!user){
      throw new NotFoundException('Utilisateur introuvable');
    }

    if(user.pokecred >= pokemon.prix){
      adoption.statut = AdoptionStatus.APPROVED;
      adoption.processedByAdminId = adminId;
      adoption.rejectionReason = "";

      pokemon.estAdopte = true;
      pokemon.idClient = adoption.idClient;

      user.pokecred -= pokemon.prix;

      await this.pokemonRepository.save(pokemon);
      await this.adoptionRepository.save(adoption);
      await this.usersRepository.save(user);
    }else {
      throw new BadRequestException("L'utilisateur ne possède pas assez de poke credit");
    }

    return adoption;
  }

  async reject(id: number, adminId: number, reason?: string) {
    const adoption = await this.findById(id);

    if (adoption.statut !== AdoptionStatus.PENDING) {
      throw new BadRequestException(
        'Seules les demandes en attente peuvent etre refuser',
      );
    }

    const admin = await this.usersRepository.findOneBy({ id: adminId });

    if (!admin || admin.permLvl < 2) {
      throw new BadRequestException('Administrateur invalide');
    }

    adoption.statut = AdoptionStatus.REJECTED;
    adoption.processedByAdminId = adminId;
    adoption.rejectionReason = reason?.trim() || '';

    return this.adoptionRepository.save(adoption);
  }

  private checkAutoReject(
    formulaire: Formulaire,
    pokemon: Pokemon,
  ): string | null {
    // regle1: motivation est mauvaise
    if (formulaire.motivationAdoption === 'Mauvaise') {
      return 'Motivation insufisante';
    }

    // regle2: temps dispo <<
    if (parseInt(formulaire.tempsDisponibleParJour) <= 1) {
      return 'Temps dispo insufisant (Minimum 2h de dispo)';
    }

    // regle3: Legement vs pokemon
    const limites = {
      Appartement: { hauteur: 5, poids: 64 }, //0.5m et 6.4kg
      'Petite Maison': { hauteur: 8, poids: 124 }, //0.8m et 12.4kg
      'Maison Familiale': { hauteur: 10, poids: 295 }, //1m et 29.5kg
      'Maison avec Grande Cour': { hauteur: 16, poids: 766 }, //1.6m et 76.6kg
      'Grande Maison avec Très Grande Cour': null,
    };

    const limite = limites[formulaire.typeLogement];

    if (
      limite !== null &&
      (pokemon.grandeur > limite.hauteur || pokemon.poids > limite.poids)
    ) {
      return `Ce Pokémon est trop grand ou trop lourd pour un(e) ${formulaire.typeLogement}`;
    }

    return null;
  }
}
