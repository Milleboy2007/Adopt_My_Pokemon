import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, Check, OneToMany } from "typeorm";
import { Interaction } from "../pokemon/entities/interaction.entity";
import { Adoption } from "../adoption/entities/adoption.entity";
import { Formulaire } from "../adoption/entities/formulaire.entity";
import { Pokemon } from "../pokemon/entities/pokemon.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    
    @Column()
    password: string;

    @Column()
    @Check("permLvl BETWEEN 1 AND 3")
    permLvl: number = 1;

    @Column()
    pokecred: number = 0;

    @Column("simple-array")
    log: Date[] = [];

    @OneToMany(() => Interaction, (interaction) => interaction.userId, { cascade: true })
    interactions: Interaction[];

    @OneToMany(() => Adoption, (adoption) => adoption.idClient, { cascade: true })
    adoptions: Adoption[];

    @OneToMany(() => Formulaire, (form) => form.idClient, { cascade: true })
    forms: Formulaire[];

    //@OneToMany(() => Pokemon, (pokemon) => pokemon.idClient, { cascade: true })
    @Column("simple-array")
    pokemons: Pokemon[] = [];

    @Column("simple-array")
    transactions: string[] = [];


    @AfterInsert()
    logInster(){
        console.log("Nouvel utilisateur créé")
    }

    @Column({ nullable: true })
    lastEasyQuiz: string; // "2026-05-06"

    @Column({ nullable: true })
    lastMediumQuiz: string;

    @Column({ nullable: true })
    lastHardQuiz: string;
}