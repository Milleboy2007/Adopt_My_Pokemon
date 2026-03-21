import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

@Entity()
export class Formulaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  @IsString()
  @IsNotEmpty()
  contenu: string; // Questions/Réponses formatées

  @Column()
  @IsInt()
  idClient: number;
}