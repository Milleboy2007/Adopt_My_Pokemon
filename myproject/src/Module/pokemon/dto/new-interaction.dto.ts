import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class NewInteraction{
    
    @IsNotEmpty()
    @IsString()
    typeAction: string; // ex: "CARESSE", "NOURRI", "JOUÉ"

    @IsNotEmpty()
    @IsInt()
    userId: number; // ID du Client concerné
}