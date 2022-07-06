import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { ShopTime } from '../entities/shop-time.entity';

@Injectable()
export default class TimeslotGenerator {
  constructor(
    private readonly event: Event,
    private readonly staratsAt: moment.Moment,
    private readonly shopTimeRepository: Repository<ShopTime>,
  ) {}

  public async generateTimeslots() {
    const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

    const date = this.staratsAt.format('YYYY-MM-DD');

    const shopTime = await this.shopTimeRepository.findOneBy({
      day: this.staratsAt.format('dddd'),
    });

    const eventBreaks = this.event.eventBreaks.map((eventBreak) => {
      const startsAt = moment(
        `${date} ${eventBreak.startsAt}:00`,
        dateTimeFormat,
      );

      const endsAt = moment(`${date} ${eventBreak.endsAt}:00`, dateTimeFormat);

      return {
        title: eventBreak.title,
        startsAt,
        endsAt,
      };
    });

    let shopOpensAt = moment(`${date} ${shopTime.opensAt}:00`, dateTimeFormat);

    const shopClosesAt = moment(
      `${date} ${shopTime.closesAt}:00`,
      dateTimeFormat,
    );

    const timeslots = [];

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
}
