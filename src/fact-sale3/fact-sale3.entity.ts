import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fact_sale3')
export class FactSale3 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  month: number;

  @Column('float')
  Sales_growth: number;
}
