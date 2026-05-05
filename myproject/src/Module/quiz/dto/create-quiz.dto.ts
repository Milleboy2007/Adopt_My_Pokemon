import { IsString, IsNumber, Min, IsArray, IsNotEmpty, IsPositive, ArrayNotEmpty, IsInt, IsIn } from 'class-validator';


export class CreateQuizDto{

    @IsNotEmpty()
    @IsString()
    titre: string;

    @IsNotEmpty()
    @IsString()
    difficulte: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(0)
    recompenseCredits: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    nombreDeQuestions: number;
}