import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { Pokemon } from './pokemon.entity';

@Entity()
export class Interaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  typeAction: string; // ex: "CARESSE", "NOURRI", "JOUÉ"

  @CreateDateColumn() // Remplit la date automatiquement à la création
  date: Date;

  @Column()
  @IsInt()
  userId: number; // ID du Client concerné

  @Column()
  @IsInt()
  pokemonId: number;

  @ManyToOne(() => Pokemon,{onDelete: 'CASCADE'})
  @JoinColumn({name: 'pokemonId'})
  pokemon: Pokemon;
}