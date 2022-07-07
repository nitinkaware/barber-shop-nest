import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Event } from './entities/event.entity';
import { EventBreak } from './entities/event-break.entity';
import { Holiday } from './entities/holiday.entity';
import { ShopTime } from './entities/shop-time.entity';
import { Timeslot } from './entities/timeslot.entity';
import { TimeslotService } from './timeslot.service';
import { BookingService } from './booking.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Booking,
      Event,
      EventBreak,
      Holiday,
      ShopTime,
      Timeslot,
    ]),
  ],
  controllers: [EventController],
  providers: [EventService, TimeslotService, BookingService],
})
export class EventModule {}
