import { Bill } from "src/bill/bill.entity";
import { Shoe } from "src/shoe/shoe.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'shoebills'})
export class ShoeBill {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number

    @Column()
    size: number

    @ManyToOne(() => Bill, bill => bill.shoebills)
    @JoinColumn({ name: 'bill_id'})
    bill: Bill

    @ManyToOne(() => Shoe, shoe => shoe.shoebills)
    @JoinColumn({ name: 'shoe_id'})
    shoe: Shoe
}
