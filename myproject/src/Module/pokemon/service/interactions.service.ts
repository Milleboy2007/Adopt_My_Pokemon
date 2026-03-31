import { Injectable, NotFoundException } from '@nestjs/common';
import { Interaction } from '../entities/interaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



@Injectable()
export class InteractionsService {

    constructor(
        @InjectRepository(Interaction)
        private interactionRepository: Repository<Interaction>
    ){}

    newPokeInteraction(pokemonId: number, userId: number, typeAction: string){
        const newInteraction = this.interactionRepository.create({pokemonId, userId, typeAction});

        return this.interactionRepository.save(newInteraction);
    }

    async getAllInteractionForOnePokemon(pokemonId: number){
        const interactions = await this.interactionRepository.findBy({pokemonId});

        if(interactions.length == 0) throw new NotFoundException('Aucune interaction trouvée');

        return interactions;
    }
}
