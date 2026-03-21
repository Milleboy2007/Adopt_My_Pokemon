import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { IsInt, IsString } from 'class-validator';

@Entity()
export class Adoption {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  dateAdoption: Date;

  @Column()
  @IsInt()
  idClient: number;

  @Column()
  @IsInt()
  idPokemon: number;

  @Column({ default: 'EN_ATTENTE' })
  @IsString()
  statut: string;
}