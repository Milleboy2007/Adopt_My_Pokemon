import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

@Entity()
export class Formulaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  @IsString()
  @IsNotEmpty()
  contenu: string;

  @Column()
  @IsInt()
  idClient: number;
}