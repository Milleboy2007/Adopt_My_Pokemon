import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsString, IsInt, IsBoolean, Min, IsArray, IsIn } from 'class-validator';
import { Interaction } from './interaction.entity';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  nom: string;

  @Column()
  @IsInt()
  idClient: number;

  @Column()
  @IsInt()
  grandeur: number;
  
  @Column()
  @IsInt()
  poids: number;

  @Column('simple-array')
  @IsArray()
  type: string[];

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
}