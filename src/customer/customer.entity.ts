import { Bill } from "src/bill/bill.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'customers'})
export class Customer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullName: string

    @Column()
    email: string

    @Column()
    phone: string

    @OneToMany(() => Bill, bill => bill.customer)
    bills: Bill[];
    
}
