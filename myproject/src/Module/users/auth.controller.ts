import { Body, Controller, Delete, Param, Patch, Post, Get, Session, UseGuards} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUser } from 'src/Module/users/dto/create-user.dto';
import { AuthService } from './services/auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { SuperAdmAuthGuard } from 'src/guard/superAdmAuth.guards';
import { CreateAdmin } from './dto/create-admin.dto';
import { UpdateUser } from './dto/update-user.dto';


@Controller('auth')
export class AuthController{
    constructor(private usersService: UsersService, private authService: AuthService){}
    

    @Post('/signin')
    async signIn(@Body() body:CreateUser, @Session() session: any){
        const user = await this.authService.signIn(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/verifMdp')
    async verifMdp(@Body() body: { email: string; password: string }) {
        return this.authService.verifPass(body.email, body.password);
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

    @UseGuards(AuthGuard)
    @Patch('update/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUser) {
        return this.authService.updateUser(+id, body);
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