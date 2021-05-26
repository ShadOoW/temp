import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { UtilsService } from '@shared/providers/utils.service';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { UtilsService } from '@src/providers/utils.service';
import { Repository } from 'typeorm';
import { CreateEventInput } from './dto/create-event.input';
import { EventsPageOptionsDto } from './dto/events-page-options.dto';
import { EventsPageDto } from './dto/events-page.dto';
import { UpdateEventInput } from './dto/update-event.input';
import { EventEntity } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly repo: Repository<EventEntity>,
  ) {}

  async create(createEventInput: CreateEventInput) {
    const createdEvent = await this.repo.create(createEventInput);
    return (await this.repo.save(createdEvent)).toDto();
  }

  async update(id: string, updateEventInput: UpdateEventInput) {
    const updatedEvent = await this.repo.create({ id, ...updateEventInput });
    return (await this.repo.save(updatedEvent)).toDto();
  }

  async updateAllMessages(userId: string) {
    await this.repo
      .createQueryBuilder('events')
      .leftJoinAndSelect('events.to', 'to')
      .update(EventEntity)
      .set({ read: true })
      .where('to.id = :userId', { userId })
      .andWhere('read = :read', { read: false })
      .andWhere('module = :module', { module: 'message' })
      .execute();
    return true;
  }

  async findOne(id: string) {
    const event = await this.repo.findOne(id, {
      relations: ['to', 'from', 'to.profile', 'from.profile'],
    });
    return event.toDto();
  }

  // TODO WHERE and SKIP
  async findM2mActivities(pageOptionsDto: EventsPageOptionsDto) {
    const [events, eventsCount] = await this.repo.findAndCount({
      where: [
        {
          to: pageOptionsDto.to,
          from: pageOptionsDto.from,
          module: ['session', 'request'],
        },
        {
          from: pageOptionsDto.to,
          to: pageOptionsDto.from,
          module: ['session', 'request'],
        },
      ],
      relations: ['to', 'from', 'to.profile', 'from.profile'],
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: eventsCount,
    });
    return new EventsPageDto(events.toDtos(), pageMetaDto);
  }

  // TODO WHERE and SKIP
  async findAll(pageOptionsDto: EventsPageOptionsDto) {
    const [events, eventsCount] = await this.repo.findAndCount({
      where: UtilsService.getOptions(pageOptionsDto),
      relations: ['to', 'from', 'to.profile', 'from.profile'],
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: eventsCount,
    });
    return new EventsPageDto(events.toDtos(), pageMetaDto);
  }
}
