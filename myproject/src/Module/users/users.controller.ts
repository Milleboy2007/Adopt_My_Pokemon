import { Body, Controller, Delete, Param, Patch, Post, Get, Session, UseGuards} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUser } from 'src/Module/users/dto/create-user.dto';
import { UpdateUser } from 'src/Module/users/dto/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.inteceptor';
import { UserDTO } from "src/Module/users/dto/user.dto";
import { AuthService } from './services/auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { SuperAdmAuthGuard } from 'src/guard/superAdmAuth.guards';
import { AdmAuthGuard } from 'src/guard/admAuth.guards';
import { CreateAdmin } from './dto/create-admin.dto';
import { parse } from 'path';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService){}
    
    @UseGuards(AdmAuthGuard)
    @Serialize(UserDTO)
    @Get('/findAll')
    findAll(){
        return this.usersService.findAllUsers();
    }

    @UseGuards(AdmAuthGuard)
    @Get('clients')
    findAllClients(){
        return this.usersService.findAllClients();
    }

    @UseGuards(AdmAuthGuard)
    @Get('admins')
    findAllAdmins(){
        return this.usersService.findAllAdmins();
    }

    @UseGuards(AdmAuthGuard)
    @Serialize(UserDTO)
    @Get(':id')
    findClient(@Param('id') id:string){
        console.log('handler is runing');
        return this.usersService.findUser(parseInt(id));
    }

    @UseGuards(AuthGuard)
    @Delete('me')
    deleteMyself(@CurrentUser() user: User){
        return this.usersService.deleteUser(user.id);
    }

    

    @UseGuards(SuperAdmAuthGuard)
    @Delete('/delall')
    delAll(){
        return this.usersService.delAll();
    }


    @UseGuards(SuperAdmAuthGuard)
    @Delete('del/:id')
    deleteUser(@Param('id') id: string){
        return this.usersService.deleteUser(parseInt(id));
    }

    @UseGuards(AdmAuthGuard)
    @Get(':id/log')
    getLogs(@Param('id') id: string){
        return this.usersService.getLogs(parseInt(id));
        
    }

    @UseGuards(AdmAuthGuard)
    @Get(':id/interactions')
    getInteractions(@Param('id') id:string){
        return this.usersService.getInteractions(parseInt(id));
    }
    
    @UseGuards(AdmAuthGuard)
    @Get(':id/adoptions')
    getAdoptions(@Param('id') id:string){
        return this.usersService.getAdoptions(parseInt(id));
    }
    
    @UseGuards(AuthGuard)
    @Get('myAdoptions')
    async getMyAdoptions(@CurrentUser() user: User){
        return this.usersService.getAdoptions(user.id);
    }
    
    @UseGuards(AdmAuthGuard)
    @Get(':id/forms')
    async getForms(@Param('id') id:string){
        return this.usersService.getForms(parseInt(id));
    }

    @UseGuards(AuthGuard)
    @Get('myCreds')
    getCreds(@CurrentUser() user: User){
        return user.pokecred;
    }

    @UseGuards(AdmAuthGuard)
    @Get(':id/creds')
    async getCredsById(@Param('id') id:string){
        var usr = await(this.usersService.findUser(parseInt(id)))
        return usr.pokecred;
    }

    @UseGuards(AdmAuthGuard)
    @Get(':id/transactions')
    getTransactionsById(@Param('id') id:string){
        return this.usersService.getTransactions(parseInt(id));
    }

    @UseGuards(AuthGuard)
    @Get('myTransactions')
    getMyTransactions(@CurrentUser() user : User){
        return user.transactions;
    }

    @UseGuards(AuthGuard)
    @Get('myPokemons')
    getMyPokemons(@CurrentUser() user : User){
        return user.pokemons;
    }


    @UseGuards(AdmAuthGuard)
    @Get(':id/pokemons')
    getClientPokemons(@Param('id') id:string){
        return this.usersService.getPokemons(parseInt(id));
    }
}
