import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
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

    findUser(id:number){

    }

    findAllUsers(){

    }

    async deleteUser(id: number){
        return this.usersRepository.delete(id);
    }

    async updateUser(id:number, attrs: Partial<User>){
        const user = await(this.usersRepository.findOneBy({id}));

        if (!user) return null;

        Object.assign(user, attrs);
        return this.usersRepository.update(id, attrs);
    }
}
