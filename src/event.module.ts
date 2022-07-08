import { Module } from '@nestjs/common';
import { EventService } from './services/event.service';
import { EventBookingController } from './controllers/event-booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Event } from './entities/event.entity';
import { EventBreak } from './entities/event-break.entity';
import { Holiday } from './entities/holiday.entity';
import { ShopTime } from './entities/shop-time.entity';
import { Timeslot } from './entities/timeslot.entity';
import { TimeslotService } from './services/timeslot.service';
import { BookingService } from './services/booking.service';
import { EventController } from './controllers/events.controller';
import { ShopTimeService } from './services/shoptime.service';
import { HolidayService } from './services/holiday.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'barbar-shop-nest',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Booking,
      Event,
      EventBreak,
      Holiday,
      ShopTime,
      Timeslot,
    ]),
  ],
  controllers: [EventBookingController, EventController],
  providers: [
    EventService,
    TimeslotService,
    BookingService,
    ShopTimeService,
    HolidayService,
  ],
})
export class EventModule {}
