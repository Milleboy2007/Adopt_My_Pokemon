import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsInt,IsOptional, IsString } from 'class-validator';

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

  @Column()
  @IsInt()
  idPokemon: number;

  @Column({ type: 'text', default: AdoptionStatus.PENDING })
  @IsString()
  statut: AdoptionStatus;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  rejectionReason?: string | null;

  @Column({ type: 'int', default: 0 })
  processedByAdminId: number;
}