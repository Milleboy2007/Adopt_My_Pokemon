import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';

export abstract class AbstractUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @MinLength(8)
  @Exclude() // Ne sera pas envoyé dans les réponses JSON
  password: string;
}