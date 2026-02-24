import { IsString, IsEmail, IsOptional, IsNumber} from "class-validator";

export class UpdateUser{
    @IsEmail()
    @IsOptional()
    email: string

    @IsString()
    @IsOptional()
    password: string
}