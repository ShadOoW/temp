import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilsService } from '@shared/providers/utils.service';
import { Repository } from 'typeorm';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private readonly repo: Repository<Event>,
  ) {}

  create(createEventInput: CreateEventInput) {
    return this.repo.save(createEventInput);
  }

  update(id: string, updateEventInput: UpdateEventInput) {
    return this.repo.save({ id, ...updateEventInput });
  }

  async findAll(args = null) {
    const { take, skip } = args;
    delete args.take;
    delete args.skip;
    const [events, totalCount] = await this.repo.findAndCount({
      where: UtilsService.getOptions(args),
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
