import { Body, Controller, Delete, Param, Patch, Post, Get, UseInterceptors} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from 'src/users/dto/create-user.dto';
import { UpdateUser } from 'src/users/dto/update-user.dto';
// import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.inteceptor';
import { UserDTO } from "src/users/dto/user.dto";


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post('/singup')
    createUser(@Body() body:CreateUser){
        return this.usersService.createUser(body.email, body.password);
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
