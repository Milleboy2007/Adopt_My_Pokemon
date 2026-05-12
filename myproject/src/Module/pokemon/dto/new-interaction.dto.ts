import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { InteractionEnum } from '../entities/interaction.entity';

export class NewInteraction{
    
    @IsNotEmpty()
    @IsString()
    typeAction: InteractionEnum; // ex: "CARESSE", "NOURRI", "JOUÉ"

    @IsNotEmpty()
    @IsInt()
    userId: number; // ID du Client concerné
}