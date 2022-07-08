import { Controller, Get } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('bookings')
export class BookingController {
  constructor(private readonly eventService: EventService) {}

  @Get('/')
  async findAll() {
    //return this.eventService.createBooking(eventId, createEventDto);
  }
}
