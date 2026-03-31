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


@Controller('auth')
export class AuthController{
    constructor(private usersService: UsersService, private authService: AuthService){}
    

    @Post('/signin')
    async singIn(@Body() body:CreateUser, @Session() session: any){
        const user = await this.authService.signIn(body.email, body.password);
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

    

    @UseGuards(SuperAdmAuthGuard)
    @Post('/createAdmin')
    async createAdmim(@Body() body:CreateAdmin, @Session() session: any){
        const user = await this.authService.createAdmin(body.email, body.password, body.permLvl);
        session.userId = user.id;
        return user;
    }

    @Post('/signup')
    async createUser(@Body() body:CreateUser, @Session() session: any){
        const user = await this.authService.signUp(body.email, body.password);
        session.userId = user.id;
        return user;
    }
}