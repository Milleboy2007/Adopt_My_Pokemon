import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUser{
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}