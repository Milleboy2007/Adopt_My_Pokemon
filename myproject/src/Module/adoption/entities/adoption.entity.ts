import { IsInt, IsOptional, IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'src/Module/users/user.entity';

export enum AdoptionStatus {
  PENDING = 'EN_ATTENTE',
  APPROVED = 'APPROUVEE',
  REJECTED = 'REFUSEE',
}

@Entity()
export class Adoption {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  dateCreation: Date;

  @UpdateDateColumn()
  dateModification: Date;

  @Column()
  @IsInt()
  idClient: number;

  @ManyToOne(() => User, user => user.adoptions)
  user: User
  
  @Column()
  @IsInt()
  idPokemon: number;

  @Column({ nullable: true })
  idFormulaire: number;

  @Column({ type: 'text', default: AdoptionStatus.PENDING })
  @IsString()
  statut: AdoptionStatus;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  rejectionReason?: string;

  @Column({ type: 'int', default: 0 })
  processedByAdminId: number;

}
