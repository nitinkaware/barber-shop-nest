import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from '../dto/create-event.dto';

import { Booking } from '../entities/booking.entity';
import { Timeslot } from '../entities/timeslot.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(createEventDto: CreateEventDto, timeslot: Timeslot) {
    await this.bookingRepository.save({
      email: createEventDto.email,
      firstName: createEventDto.firstName,
      lastName: createEventDto.lastName,
      timeslot,
    });
  }
}
