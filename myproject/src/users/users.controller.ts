import { Body, Controller, Delete, Param, Patch, Post, Get, Session, UseGuards} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUser } from 'src/users/dto/create-user.dto';
import { UpdateUser } from 'src/users/dto/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.inteceptor';
import { UserDTO } from "src/users/dto/user.dto";
import { AuthService } from './services/auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { AdmAuthGuard } from 'src/guard/admAuth.guards';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService){}

    @Post('/signup')
    async createUser(@Body() body:CreateUser, @Session() session: any){
        const user = await this.authService.signUp(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async singIn(@Body() body:CreateUser, @Session() session: any){
        const user = await this.authService.signIn(body.email, body.password);
        session.userId = user.id;
        return user;
    }


    @UseGuards(AdmAuthGuard)
    @Post('/createAdmin')
    async createAdmim(@Body() body:CreateAdmin, @Session() session: any){
        const user = await this.authService.createAdmin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @UseGuards(AuthGuard)
    @Get('/whoami')
    whoami(@CurrentUser() user: User){
        return user;
    }

    @Post('/signout')
    singOut(@Session() session:any){
        session.userId = null;
    }

    @UseGuards(AdmAuthGuard)
    @Patch('update/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUser){
        return this.authService.updateUser(parseInt(id), body);
    }

    @Delete('del/:id')
    deleteUser(@Param('id') id: string){
        return this.usersService.deleteUser(parseInt(id));
    }

    @Serialize(UserDTO)
    @Get('find/:id')
    findUser(@Param('id') id:string){
        console.log('handler is runing')
        return this.usersService.findUser(parseInt(id));
    }

    @UseGuards(AdmAuthGuard)
    @Serialize(UserDTO)
    @Get('findAll')
    findAll(){
        return this.usersService.findAllUsers();
    }

    @Delete('/delall')
    delAll(){
        return this.usersService.delAll();
    }
}
