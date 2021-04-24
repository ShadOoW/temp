import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBalanceInput } from './dto/create-balance.input';
import { UpdateBalanceInput } from './dto/update-balance.input';
import { Balance } from './entities/balance.entity';

@Injectable()
export class BalancesService {
  constructor(
    @InjectRepository(Balance) private readonly repo: Repository<Balance>,
  ) {}
  create(createBalanceInput: CreateBalanceInput) {
    return this.repo.save(createBalanceInput);
  }

  update(id: string, updateBalanceInput: UpdateBalanceInput) {
    return this.repo.save({ id, ...updateBalanceInput });
  }
}
