import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon, PokeType } from '../entities/pokemon.entity';

@Injectable()
export class PokemonService {
    constructor(
        @InjectRepository(Pokemon)
        private pokemonRepository: Repository<Pokemon>
    ){}

    // de 1 a 1350
    async getAllAPIPoke(nb: number){
        if (nb > 0 && nb <= 1350)
        {await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${nb}`)
            .then(rep => rep.json())
            .then(async data => {
                const allPoke = data.results.map(poke => {
                    return fetch(poke.url)
                        .then(rep => rep.json())
                        .then(async pokeData => {
                            const nom = pokeData.name;
                            const grandeur = pokeData.height; // décimètres (dm)
                            const poids = pokeData.weight; // hectogrammes (hg)
                            const type = pokeData.types.map(type => type.type.name);
                            const niveau = 1;
                            const prix = 0;
                            return await this.createPokemon(nom, grandeur, poids, type, niveau, prix);
                        })
                    });
                return await Promise.all(allPoke);
            }
        )} else throw new BadRequestException("Sa doit être entre 1 et 1350, pas plus pas moins");
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
