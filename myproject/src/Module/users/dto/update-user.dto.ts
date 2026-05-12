import { IsString, IsEmail, IsOptional } from "class-validator";

export class UpdateUser{
    @IsEmail()
    @IsOptional()
    email!: string

    @IsString()
    @IsOptional()
    password: string

    @IsOptional()
    @IsString()
    lastEasyQuiz: string;

    @IsOptional()
    @IsString()
    lastMediumQuiz: string;

    @IsOptional()
    @IsString()
    lastHardQuiz: string;
    password!: string

    @IsString()
    @IsOptional()
    oldPassword!: string;
}