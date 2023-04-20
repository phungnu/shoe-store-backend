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
    address: string

    @Column()
    createAt: Date = new Date(Date.now())

    @ManyToOne(() => Customer, customer => customer.bills)
    @JoinColumn({name: 'customer_id'})
    customer: Customer

    @OneToMany(() => ShoeBill, shoebill => shoebill.bill)
    shoebills: ShoeBill[]
}
