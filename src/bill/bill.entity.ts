import { ShoeBill } from "src/shoebill/shoebill.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'bills' })
export class Bill {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    message: string

    @Column()
    createAt: Date = new Date(Date.now())

    @Column()
    status: number

    @ManyToOne(() => User, user => user.bills)
    @JoinColumn({name: 'user_id'})
    user: User

    @OneToMany(() => ShoeBill, shoebill => shoebill.bill)
    shoebills: ShoeBill[]
}
