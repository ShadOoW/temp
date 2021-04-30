import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBalanceInput } from './dto/update-balance.input';
import { BalanceEntity } from './entities/balance.entity';

@Injectable()
export class BalancesService {
  constructor(
    @InjectRepository(BalanceEntity)
    private readonly repo: Repository<BalanceEntity>,
  ) {}
  update(id: string, updateBalanceInput: UpdateBalanceInput) {
    return this.repo.save({ id, ...updateBalanceInput });
  }
}
