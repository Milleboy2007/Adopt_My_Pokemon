import { Entity, Column } from 'typeorm';
import { IsNumber, Min } from 'class-validator';
import { AbstractUser } from './abstract-user.entity';

@Entity()
export class Client extends AbstractUser {
  @Column()
  @IsNumber()
  @Min(0)
  credits: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateInscription: Date;
}