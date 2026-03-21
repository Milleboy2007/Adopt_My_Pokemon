import { Entity, Column } from 'typeorm';
import { IsInt, Min, Max } from 'class-validator';
import { AbstractUser } from './abstract-user.entity';

@Entity()
export class Admin extends AbstractUser {
  @Column({ default: 1 })
  @IsInt()
  @Min(1)
  @Max(5)
  niveauAcces: number;
}