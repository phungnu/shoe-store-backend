import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fact_sale1')
export class FactSale1 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  Visitor_to_Lead_Conversion_Rate: number;

  @Column('float')
  Order_success_rate: number;

  @Column('int')
  profit: number;
}