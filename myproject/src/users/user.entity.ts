import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, Check } from "typeorm";

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

    @AfterInsert()
    logInster(){
        console.log("Nouvelle utilisateur créé")
    }
}