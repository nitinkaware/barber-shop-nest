import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Booking } from './entities/booking.entity';
import { Event } from './entities/event.entity';
import { ShopTime } from './entities/shop-time.entity';
import { Timeslot } from './entities/timeslot.entity';
import TimeslotGenerator from './utils/timeslot-generator';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

    @InjectRepository(Timeslot)
    private readonly timeslotRepository: Repository<Timeslot>,

    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    @InjectRepository(ShopTime)
    private readonly shopTimeRepository: Repository<ShopTime>,
  ) {}

  async createBooking(id: number, createEventDto: CreateEventDto) {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['eventBreaks'],
    });

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    await this.abortIfInvalidTimeslot(event, createEventDto.bookingTime);

    let timeslot = await this.timeslotRepository.findOneBy({
      startsAt: moment(createEventDto.bookingTime).toDate(),
      endsAt: moment(createEventDto.bookingTime)
        .add(event.eventDurationMinutes, 'minutes')
        .toDate(),
      event: event,
    });

    if (!timeslot) {
      timeslot = await this.timeslotRepository.save({
        startsAt: moment(createEventDto.bookingTime).toDate(),
        endsAt: moment(createEventDto.bookingTime)
          .add(event.eventDurationMinutes, 'minutes')
          .toDate(),
        event: event,
      });
    } else {
      if (timeslot.totalConfirmedBookings >= 3) {
        throw new UnprocessableEntityException('Max booking limit reached');
      }

      timeslot.totalConfirmedBookings++;
      this.timeslotRepository.save(timeslot);
    }

    const booking = this.bookingRepository.save({
      email: createEventDto.email,
      firstName: createEventDto.firstName,
      lastName: createEventDto.lastName,
      timeslot,
    });

    return booking;
  }

  async abortIfInvalidTimeslot(event: Event, bookingTime: string) {
    const availableTimeslots = await new TimeslotGenerator(
      event,
      moment(bookingTime),
      this.shopTimeRepository,
    ).generateTimeslots();

    const isValidTimeslotFound = availableTimeslots.find((timeslot) => {
      return bookingTime === timeslot;
    });

    if (!isValidTimeslotFound) {
      throw new UnprocessableEntityException('Invalid timeslot');
    }
  }
}
