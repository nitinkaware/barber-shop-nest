import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Timeslot } from '../entities/timeslot.entity';
import * as moment from 'moment';
import { Event } from '../entities/event.entity';
import TimeslotGenerator from '../utils/timeslot-generator';
import { ShopTime } from '../entities/shop-time.entity';
import { Holiday } from '../entities/holiday.entity';

@Injectable()
export class TimeslotService {
  constructor(
    @InjectRepository(Timeslot)
    private readonly timeslotRepository: Repository<Timeslot>,

    @InjectRepository(ShopTime)
    private readonly shopTimeRepository: Repository<ShopTime>,

    @InjectRepository(Holiday)
    private readonly holidayRepository: Repository<Holiday>,
  ) {}

  async createOrUpdateTimeslot(bookingTime: string, event: Event) {
    let timeslot = await this.timeslotRepository.findOneBy({
      startsAt: moment(bookingTime).toDate(),
      endsAt: moment(bookingTime)
        .add(event.eventDurationMinutes, 'minutes')
        .toDate(),
      event: event,
    });

    if (!timeslot) {
      timeslot = await this.timeslotRepository.save({
        startsAt: moment(bookingTime).toDate(),
        endsAt: moment(bookingTime)
          .add(event.eventDurationMinutes, 'minutes')
          .toDate(),
        event: event,
      });
    } else {
      if (timeslot.totalConfirmedBookings >= 3) {
        throw new UnprocessableEntityException('Max booking limit reached');
      }

      timeslot.totalConfirmedBookings++;
      await this.timeslotRepository.save(timeslot);
    }

    return timeslot;
  }

  async abortIfInvalidTimeslot(event: Event, bookingTime: string) {
    const availableTimeslots = await new TimeslotGenerator(
      event,
      moment(bookingTime),
      this.shopTimeRepository,
      this.holidayRepository,
    ).generateTimeslots();

    const isValidTimeslotFound = availableTimeslots.find((timeslot) => {
      return bookingTime === timeslot;
    });

    if (!isValidTimeslotFound) {
      throw new UnprocessableEntityException('Invalid timeslot');
    }
  }
}
