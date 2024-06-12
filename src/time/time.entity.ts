import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Time {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: number;

  @Column()
  month: number;

  @Column({ type: 'datetime' })
  date: Date;
}
