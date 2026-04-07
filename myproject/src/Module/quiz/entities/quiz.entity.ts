import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsInt, Min } from 'class-validator';


@Entity()
export class Quiz {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  titre: string;

  @Column()
  @IsString()
  difficulte: string[];

  @Column({ default: 10 })
  @IsInt()
  @Min(0)
  recompenseCredits: number;
}