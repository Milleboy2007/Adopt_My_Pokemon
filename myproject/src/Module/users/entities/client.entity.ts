import { Entity, Column, PrimaryGeneratedColumn, AfterInsert } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Client extends User {
  @Column()
  adoptionLimit:number;
  @Column()
  berries:number;
  @Column()
  xpPotions:number;
}