import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/Module/users/user.entity';

@Entity()
export class Formulaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idClient: number;

  @ManyToOne(() => User, user => user.forms)
  user: User

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