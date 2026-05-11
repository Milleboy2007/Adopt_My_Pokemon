import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { Pokemon } from './pokemon.entity';
import { User } from 'src/Module/users/user.entity';

export enum InteractionEnum{
  CARESSE = "caresse",
  NOURRI = "nourri",
  JOUE = "joue"
}

@Entity()
export class Interaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  typeAction: InteractionEnum; // ex: "CARESSE", "NOURRI", "JOUÉ"

  @CreateDateColumn() // Remplit la date automatiquement à la création
  date: Date;

  @Column()
  @IsInt()
  userId: number

  @ManyToOne(() => User, user => user.interactions)
  user: User;

  @Column()
  @IsInt()
  pokemonId: number;

  @ManyToOne(() => Pokemon,{onDelete: 'CASCADE'})
  @JoinColumn({name: 'pokemonId'})
  pokemon: Pokemon;
}