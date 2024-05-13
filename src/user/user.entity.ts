import { Bill } from 'src/bill/bill.entity';
import { Shoe } from 'src/shoe/shoe.entity';
import { ShoeBill } from 'src/shoebill/shoebill.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text') 
    username: string;

    @Column('text')
    password: string;

    @Column('text')
    phone: string;

    @Column('text')
    address: string;

    @OneToMany(() => Shoe, shoe => shoe.user)
    shoes: Shoe[]

    @OneToMany(() => ShoeBill, shoebill => shoebill.user)
    shoebills: ShoeBill[];

    @OneToMany(() => Bill, bill => bill.user)
    bills: Bill[];
}

