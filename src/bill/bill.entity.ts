import { Customer } from "src/customer/customer.entity";
import { ShoeBill } from "src/shoebill/shoebill.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'bills' })
export class Bill {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    message: string

    @Column()
    cost: number

    @Column()
    address: string

    @ManyToOne(() => Customer, customer => customer.bills)
    @JoinColumn({name: 'customer_id'})
    customer: Customer

    @OneToMany(() => ShoeBill, shoebill => shoebill.bill)
    shoebills: ShoeBill[]
}
