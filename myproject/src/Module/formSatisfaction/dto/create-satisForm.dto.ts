import { ArrayNotEmpty, IsArray, IsEnum, IsOptional, IsString} from "class-validator";
import { SatisfactionLevel } from "../entities/satisfaction-form.entities";


export class CreateSatisfactionFormDto {

    @IsOptional()
    @IsString()
    name: string;


  
    @IsEnum(SatisfactionLevel, {each:true})
    satisfaction: SatisfactionLevel;

    @IsOptional()
    @IsString()
    comments: string;
}