import { ShoeBill } from "src/shoebill/shoebill.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => ShoeBill, shoebill => shoebill.shoe)
    shoebills: ShoeBill[]
}
