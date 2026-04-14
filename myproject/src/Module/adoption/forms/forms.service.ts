import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formulaire } from '../entities/formulaire.entity';
import { CreateFormulaireDto } from '../dto/create-formulaire.dto';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Formulaire)
    private formulaireRepository: Repository<Formulaire>,
  ) {}

  create(body: CreateFormulaireDto) {
    const formulaire = this.formulaireRepository.create({
      ...body,
      statut: 'EN_ATTENTE',
    });

    return this.formulaireRepository.save(formulaire);
  }

  findAll() {
    return this.formulaireRepository.find();
  }

  async findOne(id: number) {
    const formulaire = await this.formulaireRepository.findOneBy({ id });

    if (!formulaire) {
      throw new NotFoundException('Formulaire introuvable');
    }

    return formulaire;
  }

  async delete(id: number) {
    const formulaire = await this.formulaireRepository.findOneBy({ id });

    if (!formulaire) {
      throw new NotFoundException('Formulaire introuvable');
    }

    await this.formulaireRepository.remove(formulaire);

    return { message: 'Formulaire supprime' };
  }
}