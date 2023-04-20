import { Shoe } from 'src/shoe/shoe.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text') 
    username: string;

    @Column('text')
    password: string;

    @Column()
    createAt: string;

    @OneToMany(() => Shoe, shoe => shoe.user)
    shoes: Shoe[]
}

