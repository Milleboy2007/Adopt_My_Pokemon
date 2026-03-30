import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdoptionController } from './adoption/adoption.controller';
import { FormsController } from './forms/forms.controller';
import { AdoptionService } from './adoption/adoption.service';
import { FormsService } from './forms/forms.service';
import { Adoption } from './entities/adoption.entity';
import { Formulaire } from './entities/formulaire.entity';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Adoption, Formulaire, Pokemon, User])],
  controllers: [AdoptionController, FormsController],
  providers: [AdoptionService, FormsService],
  exports: [AdoptionService],
})
export class AdoptionModule {}