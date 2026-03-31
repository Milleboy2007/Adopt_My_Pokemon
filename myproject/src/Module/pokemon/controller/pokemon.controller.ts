import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PokemonService } from '../service/pokemon.service';
import { CreatePokemon } from '../dto/create-pokemon.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { AdmAuthGuard } from 'src/guard/admAuth.guards';

@Controller('pokemons')
export class PokemonController {

    constructor(private pokemonService: PokemonService){}

    @UseGuards(AuthGuard, AdmAuthGuard)
    @Get()
    getAllPokemon(){
        return this.pokemonService.findAllPokemon();
    }

    @UseGuards(AuthGuard, AdmAuthGuard)
    @Get('/:id')
    getOnePokemon(@Param('id') id: string){
        return this.pokemonService.findOnePokemon(parseInt(id));
    }

    @UseGuards(AdmAuthGuard)
    @Post('/create')
    CreatePokemon(@Body() body:CreatePokemon){
        return this.pokemonService.createPokemon(body.nom, body.grandeur, body.poids, body.type, body.niveau, body.prix);
    }

    @UseGuards(AdmAuthGuard)
    @Delete('/delete/:id')
    deletePokemon(@Param('id') id: string){
        return this.pokemonService.deletePokemon(parseInt(id));
    }

    @UseGuards(AuthGuard, AdmAuthGuard)
    @Post('/:id/newinteraction')
    newInteraction(@Param('id') id: string, @Body() body: any){
        
    }

    @UseGuards(AuthGuard, AdmAuthGuard)
    @Get('/:id/interactions')
    getAllInteraction(@Param('id') id: string){

    }

}
