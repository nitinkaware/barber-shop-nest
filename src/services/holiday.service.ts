import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Holiday } from '../entities/holiday.entity';

@Injectable()
export class HolidayService {
  constructor(
    @InjectRepository(Holiday)
    private readonly holidayRepository: Repository<Holiday>,
  ) {}

  async findAll() {
    return await this.holidayRepository.find();
  }
}
