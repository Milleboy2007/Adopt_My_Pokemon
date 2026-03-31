import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { PokemonService } from '../service/pokemon.service';
import { CreatePokemon } from '../dto/create-pokemon.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { AdmAuthGuard } from 'src/guard/admAuth.guards';
import { NewInteraction } from '../dto/new-interaction.dto';
import { InteractionsService } from '../service/interactions.service';

@Controller('pokemons')
export class PokemonController {

    constructor(
        private pokemonService: PokemonService,
        private interactionService: InteractionsService
    ){}

    @UseGuards(AuthGuard)
    @Get()
    getAllPokemon(){
        return this.pokemonService.findAllPokemon();
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    getOnePokemon(@Param('id', ParseIntPipe) id: number){
        return this.pokemonService.findOnePokemon(id);
    }

    @UseGuards(AdmAuthGuard)
    @Post('/create')
    CreatePokemon(@Body() body:CreatePokemon){
        return this.pokemonService.createPokemon(body.nom, body.grandeur, body.poids, body.type, body.niveau, body.prix);
    }

    @UseGuards(AdmAuthGuard)
    @Delete('/delete/:id')
    deletePokemon(@Param('id', ParseIntPipe) id: number){
        return this.pokemonService.deletePokemon(id);
    }

    @UseGuards(AuthGuard)
    @Post('/:id/newinteraction')
    newInteraction(@Param('id', ParseIntPipe) id: number, @Body() body: NewInteraction){
        return this.interactionService.newPokeInteraction(id, body.userId, body.typeAction);
    }

    @UseGuards(AuthGuard)
    @Get('/:id/interactions')
    getAllInteractionForOnePokemon(@Param('id', ParseIntPipe) id: number){
        return this.interactionService.getAllInteractionForOnePokemon(id);
    }

}
