import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon/pokemon.controller';
import { InteractionsController } from './interactions/interactions.controller';
import { PokemonService } from './pokemon/pokemon.service';
import { InteractionsService } from './interactions/interactions.service';

@Module({
  controllers: [PokemonController, InteractionsController],
  providers: [PokemonService, InteractionsService]
})
export class PokemonModule {}
