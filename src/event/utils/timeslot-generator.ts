import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { ShopTime } from '../entities/shop-time.entity';
import { Event } from '../entities/event.entity';
import { Holiday } from '../entities/holiday.entity';

@Injectable()
export default class TimeslotGenerator {
  constructor(
    private readonly event: Event,
    private readonly staratsAt: moment.Moment,
    private readonly shopTimeRepository: Repository<ShopTime>,
    private readonly holidayRepository: Repository<Holiday>,
  ) {}

  public async generateTimeslots() {
    const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

    const bookingDate = this.staratsAt.format('YYYY-MM-DD');

    const shopTime = await this.shopTimeRepository.findOneBy({
      day: this.staratsAt.format('dddd'),
    });

    const eventBreaks = this.getEventBreaks(bookingDate, dateTimeFormat);

    let shopOpensAt = moment(
      `${bookingDate} ${shopTime.opensAt}:00`,
      dateTimeFormat,
    );

    const shopClosesAt = moment(
      `${bookingDate} ${shopTime.closesAt}:00`,
      dateTimeFormat,
    );

    const timeslots = [];

    await this.abortIfBookingIsOnHoliday(bookingDate);

    while (shopOpensAt.isBefore(shopClosesAt)) {
      const breakTime = eventBreaks.find((eventBreak) => {
        return shopOpensAt.isBetween(eventBreak.startsAt, eventBreak.endsAt);
      });

      if (breakTime) {
        shopOpensAt = breakTime.endsAt;

        continue;
      }

      timeslots.push(shopOpensAt.format(dateTimeFormat));

      shopOpensAt = shopOpensAt.add(
        this.event.eventDurationMinutes + this.event.cleaningDurationMinutes,
        'minutes',
      );

      if (shopOpensAt.isAfter(shopClosesAt)) {
        break;
      }
    }

    return timeslots;
  }

  private getEventBreaks(bookingDate: string, dateTimeFormat: string) {
    return this.event.eventBreaks.map((eventBreak) => {
      const startsAt = moment(
        `${bookingDate} ${eventBreak.startsAt}:00`,
        dateTimeFormat,
      );

      const endsAt = moment(
        `${bookingDate} ${eventBreak.endsAt}:00`,
        dateTimeFormat,
      );

      return {
        title: eventBreak.title,
        startsAt,
        endsAt,
      };
    });
  }

  async abortIfBookingIsOnHoliday(bookingDate: string) {
    const holidays = (await this.holidayRepository.find()).map((holiday) => {
      return {
        title: holiday.title,
        date: moment(holiday.date, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      };
    });

    const isHoliday = holidays.find((holiday) => {
      return bookingDate === holiday.date;
    });

    if (isHoliday) {
      throw new UnprocessableEntityException('Booking on holiday');
    }
  }
}
