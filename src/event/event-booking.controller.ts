import { Controller, Post, Body, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('event')
export class EventBookingController {
  constructor(private readonly eventService: EventService) {}

  @Post('/:eventId/bookings')
  async create(
    @Param('eventId') eventId: number,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.eventService.createBooking(eventId, createEventDto);
  }
}
