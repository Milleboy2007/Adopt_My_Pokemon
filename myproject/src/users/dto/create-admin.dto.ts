import { IsString, IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class CreateAdmin{
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsNumber()
    @IsNotEmpty()
    permLvl: number
}