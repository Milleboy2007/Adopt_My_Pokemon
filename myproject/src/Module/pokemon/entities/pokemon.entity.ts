import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsString, IsInt, IsBoolean, Min, IsArray, IsIn } from 'class-validator';
import { Interaction } from './interaction.entity';

export enum PokeType{
  Normal = "normal",
  FIRE = "fire",
  WATER = "water",
  GRASS = "grass",
  ELECTRIC = "electric",
  ICE = "ice",
  FIGHTING = "fighting",
  POISON = "poison",
  GROUND = "ground",
  FLYING = "flying",
  PSYCHIC = "psychic",
  BUG = "bug",
  ROCK = "rock",
  GHOST = "ghost",
  DRAGON = "dragon",
  DARK = "dark",
  STEEL = "steel", 
  FAIRY = "fairy"
}

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  nom: string;

  @Column({ nullable: true })
  @IsString()
  img: string;

  @Column()
  @IsInt()
  grandeur: number; // décimètres (dm)
  
  @Column()
  @IsInt()
  poids: number; // hectogrammes (hg)

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