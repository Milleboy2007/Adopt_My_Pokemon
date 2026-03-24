import { Module } from '@nestjs/common';
import { PokemonController } from './controller/pokemon.controller';
import { InteractionsController } from './controller/interactions.controller';
import { PokemonService } from './service/pokemon.service';
import { InteractionsService } from './service/interactions.service';
import { InteractionsService } from './service/interactions.service';
import { InteractionsController } from './controller/interactions.controller';
import { PokemonService } from './service/pokemon.service';
import { PokemonController } from './controller/pokemon.controller';

@Module({
  controllers: [PokemonController, InteractionsController],
  providers: [PokemonService, InteractionsService]
})
export class PokemonModule {}
