import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class EventBreak {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  startsAt: string;

  @Column()
  endsAt: string;

  @ManyToOne(() => Event, (event) => event.eventBreaks)
  event: Event;
}
