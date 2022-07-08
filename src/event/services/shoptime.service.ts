import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopTime } from '../entities/shop-time.entity';

@Injectable()
export class ShopTimeService {
  constructor(
    @InjectRepository(ShopTime)
    private readonly shopTimeRepository: Repository<ShopTime>,
  ) {}

  async findAll() {
    return await this.shopTimeRepository.find();
  }
}
