import { Injectable, NotFoundException } from '@nestjs/common';
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
        
        const user = await(this.usersRepository.findOneBy({id}));

        if(!user) throw new NotFoundException("user not found");

        return user;
    }

    async findAllUsers(){
        const allUser = await(this.usersRepository.find());

        if(allUser.length == 0) throw new NotFoundException("none user found");

        return allUser;
    }

    async deleteUser(id: number){
        return this.usersRepository.delete(id);
    }

    delAll(){
        return this.usersRepository.deleteAll();
    }

    async updateUser(id:number, attrs: Partial<User>){
        return this.usersRepository.update(id, attrs);
    }

    async findUserByEmail(email: string){
        return this.usersRepository.findBy({email});
    }
}
