import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from 'src/dto/create-user.dto';
import { UpdateUser } from 'src/dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post()
    createUser(@Body() body:CreateUser){
        return this.usersService.createUser(body.email, body.password);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUser){
        return this.usersService.updateUser(parseInt(id), body);
    }

    @Delete('del/:id')
    deleteUser(@Param('id') id: string){
        return this.usersService.deleteUser(parseInt(id));
    }
}
