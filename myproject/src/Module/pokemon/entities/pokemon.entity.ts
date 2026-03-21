import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsInt, IsBoolean, Min } from 'class-validator';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  nom: string;

  @Column()
  @IsString()
  type: string;

  @Column({ default: 1 })
  @IsInt()
  @Min(1)
  niveau: number;

  @Column({ default: false })
  @IsBoolean()
  estAdopte: boolean;
}