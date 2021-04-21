import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateSessionInput } from './dto/update-session.input';
import { Session } from './entities/session.entity';
import { ERROR_MESSAGES } from '../shared/ERROR_MESSAGES';
import { CreateSessionInput } from './dto/create-session.input copy';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session) private readonly repo: Repository<Session>,
  ) {}

  create(createSessionInput: CreateSessionInput) {
    return this.repo.save(createSessionInput);
  }

  async findNotDue(args = null) {
    const { take, skip } = args;
    delete args.take;
    delete args.skip;
    const [sessions, totalCount] = await this.repo.findAndCount({
      where: { startDate: MoreThanOrEqual(new Date()) },
      relations: ['mentee', 'mentor', 'mentee.profile', 'mentor.profile'],
      order: {
        createdAt: 'DESC',
      },
      skip,
      take,
    });
    return { sessions, totalCount };
  }

  async findAll(args = null) {
    const { take, skip } = args;
    delete args.take;
    delete args.skip;
    const [sessions, totalCount] = await this.repo.findAndCount({
      where: args,
      relations: ['mentee', 'mentor', 'mentee.profile', 'mentor.profile'],
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
      .findOneOrFail(id, {
        relations: ['mentee', 'mentor', 'mentee.profile', 'mentor.profile'],
      })
      .then((session) => session);
  }

  async update(id: string, updateSessionInput: UpdateSessionInput) {
    const session = await this.repo.findOne({ id });
    if (!session) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.repo.save({ id, ...updateSessionInput });
  }

  async remove(id: string) {
    const sessionToDelete = await this.findOne(id);
    await this.repo.delete(id);
    return sessionToDelete;
  }
}
