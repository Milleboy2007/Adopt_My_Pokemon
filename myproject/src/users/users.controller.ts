import { Body, Controller, Delete, Param, Patch, Post, Get, UseInterceptors, Session, NotFoundException} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUser } from 'src/users/dto/create-user.dto';
import { UpdateUser } from 'src/users/dto/update-user.dto';
// import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.inteceptor';
import { UserDTO } from "src/users/dto/user.dto";
import { AuthService } from './services/auth.service';


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

    @Get('/whoami')
    whoami(@Session() session: any){
        return this.authService.whoami(session.userId);
    }

    @Post('/signout')
    singOut(@Session() session:any){
        session.userId = null;
    }

    @Patch('update/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUser){
        return this.usersService.updateUser(parseInt(id), body);
    }

    @Delete('del/:id')
    deleteUser(@Param('id') id: string){
        return this.usersService.deleteUser(parseInt(id));
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    // @UseInterceptors(new SerializeInterceptor(UserDTO))
    @Serialize(UserDTO)
    @Get('find/:id')
    findUser(@Param('id') id:string){
        console.log('handler is runing')
        return this.usersService.findUser(parseInt(id));
    }

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
