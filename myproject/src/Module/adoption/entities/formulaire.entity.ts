import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Formulaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idClient: number;

  @Column()
  nomComplet: string;

  @Column()
  age: number;

  @Column()
  typeLogement: string;

  @Column()
  aDejaEuPokemon: boolean;

  @Column({ nullable: true })
  autresAnimauxMaison: string;

  @Column()
  motivationAdoption: string;

  @Column('simple-json')
  typePokemonSouhaite: string[];

  @Column()
  tempsDisponibleParJour: string;

  @Column()
  engagementLongTerme: string;

  @Column()
  gestionAdaptationPokemon: string;

  @Column({ default: 'EN_ATTENTE' })
  statut: string;
}