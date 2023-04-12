import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text') 
    username: string;

    @Column('text')
    password: string;

    @Column()
    createAt: Date;

}

