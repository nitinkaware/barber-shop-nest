import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Timeslot } from './timeslot.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public email: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @ManyToOne(() => Timeslot, (timeslot) => timeslot.bookings)
  timeslot: Timeslot;
}
