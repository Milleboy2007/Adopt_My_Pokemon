import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsInt, IsBoolean, Min, IsArray, IsIn } from 'class-validator';

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

  @Column()
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