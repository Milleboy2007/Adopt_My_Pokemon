import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/Module/users/user.entity';
import { Formulaire } from '../entities/formulaire.entity'
import { from, NotFoundError } from 'rxjs';
import { error } from 'node:console';


@Injectable()
export class FormsService {
    constructor (
        @InjectRepository(Formulaire)
        private formsRepository: Repository <Formulaire>,

        @InjectRepository(User)
        private usersRepository: Repository <User>
        
    ) {}

    async createFormulaire(formID: number, contenu: string, idClient: number){
        const form = await this.formsRepository.findOneBy({id : formID})

        if (!form){
            throw new NotFoundException("Le formulaire n'a pas ete trouver")
        }

        

    }
}
