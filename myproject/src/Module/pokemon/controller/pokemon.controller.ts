import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { PokemonService } from '../service/pokemon.service';
import { CreatePokemon } from '../dto/create-pokemon.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { AdmAuthGuard } from 'src/guard/admAuth.guards';
import { NewInteraction } from '../dto/new-interaction.dto';
import { InteractionsService } from '../service/interactions.service';
import { PokeType } from '../entities/pokemon.entity';
import { SuperAdmAuthGuard } from 'src/guard/superAdmAuth.guards';

@Controller('pokemons')
export class PokemonController {

    constructor(
        private pokemonService: PokemonService,
        private interactionService: InteractionsService
    ){}

    @UseGuards(SuperAdmAuthGuard)
    @Get('/loadAllAPIPoke/:nb')
    get(@Param('nb', ParseIntPipe) nb:number){
        return this.pokemonService.getAllAPIPoke(nb);
    }

    @Get()
    getAllPokemon(){
        return this.pokemonService.findAllPokemon();
    }

    @Get('/:id')
    getOnePokemon(@Param('id', ParseIntPipe) id: number){
        return this.pokemonService.findOnePokemon(id);
    }

    @UseGuards(AdmAuthGuard)
    @Post('/create')
    CreatePokemon(@Body() body:CreatePokemon){
        return this.pokemonService.createPokemon(body.nom, body.img, body.grandeur, body.poids, body.type as PokeType[], body.niveau, body.prix);
    }

    @UseGuards(AdmAuthGuard)
    @Delete('/delete/:id')
    deletePokemon(@Param('id', ParseIntPipe) id: number){
        return this.pokemonService.deletePokemon(id);
    }

    @UseGuards(AuthGuard)
    @Post('/:id/newinteraction')
    newInteraction(@Param('id', ParseIntPipe) id: number, @Body() body: NewInteraction){
        this.interactionService.newPokeInteraction(id, body.userId, body.typeAction);
        return this.pokemonService.addPointInteraction(id, body.typeAction)
    }

    @UseGuards(AuthGuard)
    @Get('/:id/interactions')
    getAllInteractionForOnePokemon(@Param('id', ParseIntPipe) id: number){
        return this.interactionService.getAllInteractionForOnePokemon(id);
    }

    @UseGuards(AuthGuard)
    @Get('/MyPokemons/:id')
    getAllMyPokemon(@Param('id', ParseIntPipe) id: number){
        return this.pokemonService.getMyPokemon(id);
    }

    @UseGuards(AuthGuard)
    @Post('/pseudoChange/:id/:newPseudo')
    changePseudo(@Param('id', ParseIntPipe)id: number, @Param('newPseudo')newPseudo: string){
        return this.pokemonService.changePseudo(id, newPseudo);
    }

    @UseGuards(AuthGuard)
    @Post('/resetPseudo/:id')
    resetPseudo(@Param('id', ParseIntPipe)id: number){
        return this.pokemonService.resetPseudo(id)
    }

}
