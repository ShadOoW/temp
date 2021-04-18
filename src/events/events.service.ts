import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventInput } from './dto/create-event.input';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private readonly repo: Repository<Event>,
  ) {}
  create(createEventInput: CreateEventInput) {
    return this.repo.save(createEventInput);
  }

  async findAll(args = null) {
    const { take, skip } = args;
    delete args.take;
    delete args.skip;
    const [events, totalCount] = await this.repo.findAndCount({
      // where: this.getOptions(args),
      relations: ['to', 'from', 'to.profile', 'from.profile'],
      order: {
        createdAt: 'DESC',
      },
      skip,
      take,
    });
    return { events, totalCount };
  }
}
