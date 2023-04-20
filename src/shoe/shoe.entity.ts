import { ShoeBill } from "src/shoebill/shoebill.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "shoes"})
export class Shoe {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    description: string

    @Column()
    imageUrl: string

    @Column()
    quantity: number

    @OneToMany(() => ShoeBill, shoebill => shoebill.shoe)
    shoebills: ShoeBill[]

    @ManyToOne(() => User, user => user.shoes)
    @JoinColumn({ name: 'user_id'})
    user: User
}
