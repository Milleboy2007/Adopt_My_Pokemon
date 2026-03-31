import { Entity, Column, PrimaryGeneratedColumn, AfterInsert } from "typeorm";

@Entity()
export abstract class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    
    @Column()
    password: string;

    @AfterInsert()
    logInster(){
        console.log("Nouvelle utilisateur créé")
    }

    @Column({default: false})
    admin: boolean
}