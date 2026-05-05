import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/Module/users/user.entity';

@Entity()
export class Formulaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idClient: number;

  @Column({ nullable: true })
  idAdoption: number;
  
  @ManyToOne(() => User, user => user.forms)
  user: User

  @Column()
  nomComplet: string;

  @Column()
  age: number; // age

  @Column()
  typeLogement: string; // 2 1/2, 3 1/2, 4 1/2, 5 1/2

  @Column()
  aDejaEuPokemon: boolean; // True False

  @Column({ nullable: true })
  autresAnimauxMaison: string; // Chat, Chien, Poisson, Autre

  @Column()
  motivationAdoption: string; // Bonne moyenne et bonne

  @Column('simple-json')
  typePokemonSouhaite: string[]; //Enum Type

  @Column()
  tempsDisponibleParJour: string; // 1, 2, 3heure

  @Column()
  engagementLongTerme: string; // Oui ou Non

  @Column()
  gestionAdaptationPokemon: string; // Text Box

  @Column({ default: 'EN_ATTENTE' })
  statut: string;
}