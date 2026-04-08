import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsString, IsInt, IsBoolean, Min, IsArray, IsIn } from 'class-validator';
import { Interaction } from './interaction.entity';

export enum PokeType{
  Normal = "Normal",
  FIRE = "Fire",
  WATER = "Water",
  GRASS = "Grass",
  ELECTRIC = "Electric",
  ICE = "Ice",
  FIGHTING = "Fighting",
  POISON = "Poison",
  GROUND = "Ground",
  FLYING = "Flying",
  PSYCHIC = "Psychic",
  BUG = "Bug",
  ROCK = "Rock",
  GHOST = "Ghost",
  DRAGON = "Dragon",
  DARK = "Dark",
  STEEL = "Steel", 
  FAIRY = "Fairy"
}

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  nom: string;

  @Column()
  @IsInt()
  grandeur: number;
  
  @Column()
  @IsInt()
  poids: number;

  @Column('simple-array')
  @IsArray()
  type: PokeType[];

  @Column({ default: 1 })
  @IsInt()
  @Min(1)
  niveau: number;

  @Column({ default: false })
  @IsBoolean()
  estAdopte: boolean;

  @Column({default: 0})
  @Min(0)
  @IsInt()
  pointsInteraction: number;

  @Column()
  @Min(0)
  @IsInt()
  prix: number;

  @Column({default: 0})
  @IsInt()
  idClient: number
}