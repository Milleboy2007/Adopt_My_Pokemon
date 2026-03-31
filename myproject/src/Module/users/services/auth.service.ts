import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from '../entities/user.entity';

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) {}
    
    async signUp(email: string, password: string){
        const existingUser = await this.usersService.findUserByEmail(email);

        if(existingUser.length) throw new BadRequestException("Email in use");

        const salt = randomBytes(8).toString('hex');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const result = salt+'.'+hash.toString('hex');

        const user = this.usersService.createUser(email, result);

        return user;

    }

    async createAdmin(email: string, password: string){
        const existingUser = await this.usersService.findUserByEmail(email);

        if(existingUser.length) throw new BadRequestException("Email in use");

        const salt = randomBytes(8).toString('hex');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const result = salt+'.'+hash.toString('hex');

        const user = this.usersService.createAdmin(email, result);

        return user;

    }

    async signIn(email: string, password: string){
        const [existingUser] = await this.usersService.findUserByEmail(email);
        
        if(!existingUser) throw new NotFoundException("User not found");

        const [salt, storedHash] = existingUser.password.split(".");

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (hash.toString("hex") !== storedHash) throw new BadRequestException('Invalide Password');

        return existingUser;
    }

    whoami(userId:number){
        if (!userId) throw new NotFoundException('User not connected');
        return this.usersService.findUser(userId);
    }


    async updateUser(id:number, attrs: Partial<User>){
        const user = await(this.usersService.findUser(id));

        if (!user) throw new NotFoundException("user not found");

        if(attrs.password){
            const salt = randomBytes(8).toString('hex');
    
            const hash = (await scrypt(attrs.password, salt, 32)) as Buffer;
    
            const result = salt+'.'+hash.toString('hex');

            attrs.password = result;
        }

        Object.assign(user, attrs);
        console.log( attrs.password)
        return this.usersService.updateUser(id, attrs);
    }

}
