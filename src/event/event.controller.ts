import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/:eventId/bookings')
  create(
    @Param('eventId') eventId: number,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.eventService.createBooking(eventId, createEventDto);
  }
}
