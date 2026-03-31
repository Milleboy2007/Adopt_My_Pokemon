import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adoption, AdoptionStatus } from '../entities/adoption.entity';
import { Pokemon } from 'src/Module/pokemon/entities/pokemon.entity';
import { User } from 'src/Module/users/entities/user.entity';


@Injectable()
export class AdoptionService {
  constructor(
    @InjectRepository(Adoption)
    private adoptionRepository: Repository<Adoption>,

    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createAdoption(userId: number, pokemonId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    if (user.admin) {
      throw new BadRequestException(
        "Un administrateur ne peut pas créer une demande d'adoption client",
      );
    }

    const pokemon = await this.pokemonRepository.findOneBy({ id: pokemonId });

    if (!pokemon) {
      throw new NotFoundException('Pokemon introuvable');
    }

    if (pokemon.estAdopte) {
      throw new BadRequestException('Ce Pokémon est deja adopter');
    }

    const existingPending = await this.adoptionRepository.findOneBy({
      idClient: userId,
      idPokemon: pokemonId,
      statut: AdoptionStatus.PENDING,
    });

    if (existingPending) {
      throw new BadRequestException(
        "Une demande en attente existe deja pour ce Pokemon",
      );
    }

    const adoption = this.adoptionRepository.create({
      idClient: userId,
      idPokemon: pokemonId,
      statut: AdoptionStatus.PENDING,
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

  async findPending() {
    return this.adoptionRepository.find({
      where: { statut: AdoptionStatus.PENDING },
      order: { dateCreation: 'ASC' },
    });
  }

  async findApproved() {
    return this.adoptionRepository.find({
      where: { statut: AdoptionStatus.APPROVED },
      order: { dateCreation: 'DESC' },
    });
  }

  async findRejected() {
    return this.adoptionRepository.find({
      where: { statut: AdoptionStatus.REJECTED },
      order: { dateCreation: 'DESC' },
    });
  }

  async approve(id: number, adminId: number) {
    const adoption = await this.findById(id);

    if (adoption.statut !== AdoptionStatus.PENDING) {
      throw new BadRequestException(
        "Seules les demandes en attente peuvent etre approuvers",
      );
    }

    const admin = await this.usersRepository.findOneBy({ id: adminId });

    if (!admin || !admin.admin) {
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

    adoption.statut = AdoptionStatus.APPROVED;
    adoption.processedByAdminId = adminId;
    adoption.rejectionReason = null;

    pokemon.estAdopte = true;

    await this.pokemonRepository.save(pokemon);
    await this.adoptionRepository.save(adoption);

    return adoption;
  }

  async reject(id: number, adminId: number, reason?: string) {
    const adoption = await this.findById(id);

    if (adoption.statut !== AdoptionStatus.PENDING) {
      throw new BadRequestException(
        "Seules les demandes en attente peuvent etre refuser",
      );
    }

    const admin = await this.usersRepository.findOneBy({ id: adminId });

    if (!admin || !admin.admin) {
      throw new BadRequestException('Administrateur invalide');
    }

    adoption.statut = AdoptionStatus.REJECTED;
    adoption.processedByAdminId = adminId;
    adoption.rejectionReason = reason?.trim() || null;

    return this.adoptionRepository.save(adoption);
  }

}
