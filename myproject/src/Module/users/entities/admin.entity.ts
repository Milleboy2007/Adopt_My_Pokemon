import { Entity, Column } from 'typeorm';
import { IsInt, Min, Max } from 'class-validator';
import { User } from './user.entity';

@Entity()
export class Admin extends User {
  @Column()
  hireDate:Date;
}