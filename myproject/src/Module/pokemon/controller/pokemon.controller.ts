import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PokemonService } from '../service/pokemon.service';
import { CreatePokemon } from '../dto/create-pokemon.dto';

@Controller('pokemons')
export class PokemonController {

    constructor(private pokeonService: PokemonService){}

    @Get()
    getAllPokemon(){

    }

    @Get('/:id')
    getOnePokemon(@Param('id') id: string){

    }

    //ADMIN
    @Post('/create')
    CreatePokemon(@Body() body:CreatePokemon){

    }

    //ADMIN
    @Delete('/delete/:id')
    deletePokemon(@Param('id') id: string){

    }

    @Post('/:id/newinteraction')
    newInteraction(@Param('id') id: string, @Body() body: any){

    }

    @Get('/:id/interactions')
    getAllInteraction(@Param('id') id: string){

    }

}
