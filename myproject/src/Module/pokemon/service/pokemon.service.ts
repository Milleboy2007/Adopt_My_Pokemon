import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon, PokeType } from '../entities/pokemon.entity';

@Injectable()
export class PokemonService {
    constructor(
        @InjectRepository(Pokemon)
        private pokemonRepository: Repository<Pokemon>
    ){}

    async getAPIPoke(){
        await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
            .then(data => console.log(data.json()));
    }

    async findAllPokemon(){
        const allPoke = await(this.pokemonRepository.find());

        if(allPoke.length == 0) throw new NotFoundException("none pokemon found");

        return allPoke;
    }

    async findOnePokemon(id:number){
        const poke = await(this.pokemonRepository.findOneBy({id}));

        if(!poke) throw new NotFoundException("Pokemon not found");

        return poke;
    }

    createPokemon(nom: string, grandeur: number, poids: number, type: PokeType[], niveau: number, prix: number){
        const newPoke = this.pokemonRepository.create({nom, grandeur, poids, type, niveau, prix});
        return this.pokemonRepository.save(newPoke);
    }

    deletePokemon(id:number){
        return this.pokemonRepository.delete(id);
    }
}
