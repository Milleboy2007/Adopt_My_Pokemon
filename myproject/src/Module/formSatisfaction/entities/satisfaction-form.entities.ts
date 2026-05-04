import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsArray, IsEnum, IsInt, IsOptional, IsString} from 'class-validator';

export enum SatisfactionLevel {
  TRES_SATISFAIT = "Très satisfait",
  SATISFAIT = "Satisfait",
  NEUTRE = "Neutre",
  INSATISFAIT = "Insatisfait",
  TRES_INSATISFAIT = "Très insatisfait",
}


@Entity()
export class SatisfactionForm {
    
    @PrimaryGeneratedColumn()
    @IsInt()
    id: number;

    @Column()
    @IsString()
    @IsOptional()
    name: string;

    @Column('simple-enum', { enum: SatisfactionLevel })
    @IsEnum(SatisfactionLevel, {each:true})
    satisfaction: SatisfactionLevel;

    @Column()
    @IsString()
    comments: string;

}