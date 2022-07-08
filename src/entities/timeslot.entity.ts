import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking } from './booking.entity';
import { Event } from './event.entity';

@Entity()
export class Timeslot {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'timestamp' })
  public startsAt: Date;

  @Column({ type: 'timestamp' })
  public endsAt: Date;

  @Column({ default: 1 })
  public totalConfirmedBookings: number;

  @ManyToOne(() => Event, (event) => event.timeslots)
  event: Event;

  @OneToMany(() => Booking, (booking) => booking.timeslot)
  bookings: Booking[];
}
