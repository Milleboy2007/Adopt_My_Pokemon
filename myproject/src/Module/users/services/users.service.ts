import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ){}

    createUser(email: string, password: string){
        const newUser = this.usersRepository.create({email, password});
        return this.usersRepository.save(newUser);
    }

    createAdmin(email: string, password: string, permLvl: number){
        const newUser = this.usersRepository.create({email, password, permLvl});
        return this.usersRepository.save(newUser);
    }

    async findUser(id:number){
        
        const user = await this.usersRepository.findOneBy({id});

        if(!user) throw new NotFoundException("user not found");

        return user;
    }

    async findAllUsers(){
        const allUser = await this.usersRepository.find();

        if(allUser.length == 0) throw new NotFoundException("No users found");

        return allUser;
    }

    async findAllClients(){
        const allUsers = await this.usersRepository.find();

        if(allUsers.length == 0) throw new NotFoundException("No clients found");

        const allClients = allUsers.filter(c => c.permLvl === 1);

        return allClients;
    }

    async findAllAdmins(){
        const allUsers = await(this.usersRepository.find());

        if(allUsers.length == 0) throw new NotFoundException("No admins found");

        const allAdmins = allUsers.filter(c => c.permLvl != 1);

        return allAdmins;
    }

    async deleteUser(id: number){
        return this.usersRepository.delete(id);
    }

    async delAll(){
        return this.usersRepository.deleteAll();
    }

    async updateUser(id:number, attrs: Partial<User>){
        return this.usersRepository.update(id, attrs);
    }

    async findUserByEmail(email: string){
        return this.usersRepository.findBy({email});
    }

    async getLogs(id:number){
        var usr = await this.findUser(id);
        return usr.log;
    }

    async getInteractions(id:number){
        var usr = await this.findUser(id);
        return usr.interactions;
    }

    async getAdoptions(id:number){
        var usr = await this.findUser(id);
        return usr.adoptions;
    }

    async getForms(id:number){
        var usr = await this.findUser(id);
        return usr.forms;
    }

    async getTransactions(id:number){
        var usr = await this.findUser(id);
        return usr.transactions;
    }

    async getPokemons(id:number){
        var usr = await this.findUser(id);
        return usr.pokemons;
    }


    async addCredits(id:number, credits: number){
        const user = await this.findUser(id);
        const newCredits = user.pokecred + credits;
        await this.updateUser(id, {pokecred: newCredits});
        return newCredits;
    }

    async suppCredits(id:number, credits: number){
        const user = await this.findUser(id);
        if (user.pokecred < credits) throw new BadRequestException("Not enough credits");
        const newCredits = user.pokecred - credits;        
        await this.updateUser(id, {pokecred: newCredits});
        return newCredits;
    }


    async updateQuizDate(id:number, difficulte: string){
        const aujourdhui = new Date().toLocaleDateString('fr-CA');

        const colonneParDifficulte = {
            'EASY': 'lastEasyQuiz',
            'MEDIUM': 'lastMediumQuiz',
            'HARD': 'lastHardQuiz'
        }

        await this.updateUser(id, {[colonneParDifficulte[difficulte]]: aujourdhui});
    }

    
}
