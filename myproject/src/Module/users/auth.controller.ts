import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';

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

    async createAdmin(email: string, password: string, permLvl: number){
        const existingUser = await this.usersService.findUserByEmail(email);

        if(existingUser.length) throw new BadRequestException("Email in use");

        const salt = randomBytes(8).toString('hex');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const result = salt+'.'+hash.toString('hex');

        const user = this.usersService.createAdmin(email, result, permLvl);

        return user;

    }

    async signIn(email: string, password: string){
        const [existingUser] = await this.usersService.findUserByEmail(email);
        
        if(!existingUser) throw new NotFoundException("User not found");

        const [salt, storedHash] = existingUser.password.split(".");

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (hash.toString("hex") !== storedHash) throw new BadRequestException('Invalide Password');

        existingUser.log.push(new Date());

        return existingUser;
    }

    async verifPass(email: string, password: string){
        const [existingUser] = await this.usersService.findUserByEmail(email);
        
        if(!existingUser) throw new NotFoundException("User not found");

        const [salt, storedHash] = existingUser.password.split(".");

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (hash.toString("hex") !== storedHash) return false;

        existingUser.log.push(new Date());

        return true;
    }

    whoami(userId:number){
        if (!userId) throw new NotFoundException('User not connected');
        return this.usersService.findUser(userId);
    }


    async updateUser(id: number, attrs: Partial<User> & { oldPassword?: string }) {
        const user = await this.usersService.findUser(id);

        if (!user) throw new NotFoundException("user not found");

        if (attrs.password) {
            if (!attrs.oldPassword) {
                throw new BadRequestException("Old password required");
            }

            const [salt, storedHash] = user.password.split(".");
            const hash = (await scrypt(attrs.oldPassword, salt, 32)) as Buffer;

            if (hash.toString("hex") !== storedHash) {
                throw new BadRequestException("Mot de passe incorrect");
            }

            const newSalt = randomBytes(8).toString('hex');
            const newHash = (await scrypt(attrs.password, newSalt, 32)) as Buffer;

            attrs.password = newSalt + "." + newHash.toString('hex');
        }

        let newAttrs = {password: attrs.password};

        return this.usersService.updateUser(id, newAttrs);
    }

}