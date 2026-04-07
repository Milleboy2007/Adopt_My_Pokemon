import { IsString, IsNumber, Min, IsArray, IsNotEmpty, IsPositive, ArrayNotEmpty, IsInt, IsIn } from 'class-validator';


export class CreatePokemon{
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    titre: string;

    @IsNotEmpty()
    @IsString()
    difficulte: string[];

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    recompenseCredits: number;
}