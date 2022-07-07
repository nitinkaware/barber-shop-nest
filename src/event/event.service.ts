import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingService } from './booking.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
import { TimeslotService } from './timeslot.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

    private readonly timeslotService: TimeslotService,

    private readonly bookingService: BookingService,
  ) {}

  async createBooking(id: number, createEventDto: CreateEventDto) {
    const event = await this.firstOrFail(id);

    await this.timeslotService.abortIfInvalidTimeslot(
      event,
      createEventDto.bookingTime,
    );

    const timeslot = await this.timeslotService.createOrUpdateTimeslot(
      createEventDto.bookingTime,
      event,
    );

    await this.bookingService.create(createEventDto, timeslot);

    return { message: 'Booking created' };
  }

  async firstOrFail(id: number) {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['eventBreaks'],
    });

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return event;
  }
}
