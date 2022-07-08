import { Controller, Get } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('bookings')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('/')
  async findAll() {
    return {
      events: await this.eventService.findAllEventsWithBookingsAndBreaks(),
    };
  }
}
