import { Bill } from "src/bill/bill.entity";
import { Shoe } from "src/shoe/shoe.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'shoebills'})
export class ShoeBill {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number

    @Column()
    size: number

    @ManyToOne(() => User, user => user.shoebills)
    @JoinColumn({ name: 'user_id'})
    user: User

    @ManyToOne(() => Shoe, shoe => shoe.shoebills)
    @JoinColumn({ name: 'book_id'})
    shoe: Shoe

    @ManyToOne(() => Bill, bill => bill.shoebills)
    @JoinColumn({ name: 'bill_id'})
    bill: Bill
}
