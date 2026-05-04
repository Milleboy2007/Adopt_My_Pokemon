import { Injectable } from '@nestjs/common';
import { SatisfactionForm, SatisfactionLevel } from '../entities/satisfaction-form.entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SatisfactionFormService {
    constructor(
            @InjectRepository(SatisfactionForm)
            private satisfactionFormRepository: Repository<SatisfactionForm>
        ){}

    async createForm(name: string, satisfaction: SatisfactionLevel, comments: string) {       
        const newForm = this.satisfactionFormRepository.create({name, satisfaction, comments});
        
        return this.satisfactionFormRepository.save(newForm);
        
    }

    async afficherForm(){
        const allForm = await  this.satisfactionFormRepository.find();
        
        if(!allForm){
            throw new Error('No satisfaction forms found');
        }

        return allForm;
    }
}
