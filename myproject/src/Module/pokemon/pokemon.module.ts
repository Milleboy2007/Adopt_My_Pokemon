import { Module } from '@nestjs/common';
import { PokemonController } from './controller/pokemon.controller';
import { PokemonService } from './service/pokemon.service';
import { InteractionsService } from './service/interactions.service';
import { Pokemon } from './entities/pokemon.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interaction } from './entities/interaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon, Interaction])],
  controllers: [PokemonController],
  providers: [PokemonService, InteractionsService]
})
export class PokemonModule {}
