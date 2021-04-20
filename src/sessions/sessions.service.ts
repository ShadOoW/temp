import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateSessionInput } from './dto/create-session.input';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session) private readonly repo: Repository<Session>,
  ) {}

  create(createSessionInput: CreateSessionInput) {
    return this.repo.save(createSessionInput);
  }

  async findAll(args = null) {
    const { take, skip } = args;
    delete args.take;
    delete args.skip;
    const [sessions, totalCount] = await this.repo.findAndCount({
      where: args,
      relations: ['mentee', 'mentor'],
      order: {
        createdAt: 'DESC',
      },
      skip,
      take,
    });
    return { sessions, totalCount };
  }

  async findOne(id: string) {
    return await this.repo
      .findOne(id, { relations: ['mentee', 'mentor'] })
      .then((session) => session);
  }

  async remove(id: string) {
    const sessionToDelete = await this.findOne(id);
    await this.repo.delete(sessionToDelete);
    return sessionToDelete;
  }
}
