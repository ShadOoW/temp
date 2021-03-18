import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { ItemDto } from './dto/item.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly repo: Repository<Item>,
  ) {}

  public async getAll(): Promise<ItemDto[]> {
    return await this.repo
      .find()
      .then((items) => items.map((e) => ItemDto.fromEntity(e)));
  }

  public async create(dto: ItemDto, user: User): Promise<ItemDto> {
    return this.repo.save(dto).then((e) => ItemDto.fromEntity(e));
  }
}
