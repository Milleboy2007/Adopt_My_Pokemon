import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon, PokeType } from '../entities/pokemon.entity';
import { InteractionEnum } from '../entities/interaction.entity';

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
                            const img = pokeData.sprites.other.showdown.front_default || pokeData.sprites.other['official-artwork'].front_default || pokeData.sprites.front_default || pokeData.sprites.other.home.front_default || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
                            const grandeur = pokeData.height; // décimètres (dm)
                            const poids = pokeData.weight; // hectogrammes (hg)
                            const type = pokeData.types.map(type => type.type.name);
                            const niveau = 1;
                            const prix = Math.floor(Math.random() * (50 - 20 + 1)) + 20;;
                            return await this.createPokemon(nom, img, grandeur, poids, type, niveau, prix);
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

    createPokemon(nom: string, img: string,  grandeur: number, poids: number, type: PokeType[], niveau: number, prix: number){
        const newPoke = this.pokemonRepository.create({nom, img, grandeur, poids, type, niveau, prix});
        return this.pokemonRepository.save(newPoke);
    }

    deletePokemon(id:number){
        return this.pokemonRepository.delete(id);
    }

    async getMyPokemon(idClient:number){
        const allPoke = await this.findAllPokemon();
        return allPoke.filter(poke => poke.idClient == idClient);
    }

    async changePseudo(idPokemon: number, newPseudo: string){
        const poke = await this.findOnePokemon(idPokemon);
        poke.pseudo = newPseudo;
        return this.pokemonRepository.save(poke)
    }

    private calculerNiveau(pointsTotal: number): number {
        const p = Math.max(0, pointsTotal);
        const niveauExact = 1 + Math.log(p / 200 + 1) / Math.log(1.5);
        return Math.floor(niveauExact);
    }

    async addPointInteraction(idPokemon: number, action: InteractionEnum){
        const poke = await this.findOnePokemon(idPokemon)
        switch (action){
            case "caresse":
                poke.pointsInteraction += 3
                break;
            case "nourri":
                poke.pointsInteraction += 10
                break;
            case "joue":
                poke.pointsInteraction += 5
                break;
        }
        poke.niveau = this.calculerNiveau(poke.pointsInteraction)
        return this.pokemonRepository.save(poke)
    }

    async resetPseudo(id: number){
        const poke = await this.findOnePokemon(id)
        poke.pseudo = ""
        return this.pokemonRepository.save(poke)
    }
}
