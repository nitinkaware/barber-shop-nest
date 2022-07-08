import { Controller, Get } from '@nestjs/common';
import { EventService } from './event.service';
import { HolidayService } from './holiday.service';
import { ShopTimeService } from './shoptime.service';

@Controller('bookings')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly shopTimesService: ShopTimeService,
    private readonly holiDayService: HolidayService,
  ) {}

  @Get('/')
  async findAll() {
    return {
      events: await this.eventService.findAllEventsWithBookingsAndBreaks(),
      shopTimes: await this.shopTimesService.findAll(),
      holidays: await this.holiDayService.findAll(),
    };
  }
}
