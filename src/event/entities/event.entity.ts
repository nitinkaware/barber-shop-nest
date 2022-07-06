import moment from 'moment';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventBreak } from './event-break.entity';
import { Timeslot } from './timeslot.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public eventDurationMinutes: number;

  @Column()
  public cleaningDurationMinutes: number;

  @Column()
  public advanceBookingAllowedDays: number;

  @Column()
  public minMinutesBeforeBookingCanBeMade: number;

  @Column()
  public maxBookingPerSlot: number;

  @OneToMany(() => Timeslot, (timeslot) => timeslot.event)
  timeslots: Timeslot[];

  @OneToMany(() => EventBreak, (eventBreak) => eventBreak.event)
  eventBreaks: EventBreak[];
}
