import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('fact_sale2')
export class FactSale2 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  month: number;

  @Column('int')
  shoe_id: number;

  @Column('varchar', { length: 255 })
  address: string;

  @Column('int')
  total_sale: number;
}
