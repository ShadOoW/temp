import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateSessionInput } from './dto/update-session.input';
import { SessionEntity } from './entities/session.entity';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { CreateSessionInput } from './dto/create-session.input';
import { UtilsService } from '@src/providers/utils.service';
import { SessionDto } from './dto/session.dto';
import { SessionsPageOptionsDto } from './dto/sessions-page-options.dto';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { SessionsPageDto } from './dto/sessions-page.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly repo: Repository<SessionEntity>,
  ) {}

  async create(createSessionInput: CreateSessionInput): Promise<SessionDto> {
    const createdSession = await this.repo.create(createSessionInput);
    const savedSession = await this.repo.save(createdSession);
    return this.findOne(savedSession.id);
  }
  // TODO WHERE & PAGE OPTIONS
  async sessionCalcs(id) {
    const { count, sum } = await this.repo
      .createQueryBuilder('sessions')
      .innerJoinAndSelect('sessions.mentor', 'mentor')
      .innerJoinAndSelect('sessions.mentee', 'mentee')
      .where('sessions.status = :status', { status: 'done' })
      .andWhere('mentor.id = :id', { id })
      .orWhere('mentee.id = :id', { id })
      // .select('SUM(sessions.duration)', 'sum')
      .select(['COUNT(sessions.id)', 'SUM(sessions.duration)'])
      .getRawOne();
    return {
      count: count ? parseInt(count) : 0,
      durationTotal: sum ? parseInt(sum) : 0,
    };
  }

  async upcomingSession(mentor: string, mentee: string) {
    const upcoming = await this.repo.findOne({
      where: {
        ...UtilsService.getOptions({ mentee, mentor }),
        status: 'accepted',
        startDate: MoreThanOrEqual(new Date()),
      },
      relations: ['mentee', 'mentor', 'mentee.profile', 'mentor.profile'],
      order: {
        createdAt: 'DESC',
      },
    });
    return upcoming ? upcoming.toDto() : null;
  }

  // TODO WHERE & PAGE OPTIONS
  async findNotDue(
    pageOptionsDto: SessionsPageOptionsDto,
    status?: string,
    mentor?: string,
    mentee?: string,
  ) {
    const [sessions, sessionsCount] = await this.repo.findAndCount({
      where: {
        ...UtilsService.getOptions({ mentee, mentor, status }),
        startDate: MoreThanOrEqual(new Date()),
      },
      relations: ['mentee', 'mentor', 'mentee.profile', 'mentor.profile'],
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: sessionsCount,
    });
    return new SessionsPageDto(sessions.toDtos(), pageMetaDto);
  }

  // TODO WHERE & PAGE OPTIONS
  async findAll(
    pageOptionsDto: SessionsPageOptionsDto,
    status?: string,
    mentor?: string,
    mentee?: string,
  ) {
    const [sessions, sessionsCount] = await this.repo.findAndCount({
      where: UtilsService.getOptions({
        ...pageOptionsDto,
        mentee,
        mentor,
        status,
      }),
      relations: ['mentee', 'mentor', 'mentee.profile', 'mentor.profile'],
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: sessionsCount,
    });
    return new SessionsPageDto(sessions.toDtos(), pageMetaDto);
  }

  async findOne(id: string) {
    const session = await this.repo.findOneOrFail(id, {
      relations: ['mentee', 'mentor', 'mentee.profile', 'mentor.profile'],
    });
    return session ? session.toDto() : null;
  }

  async findActivated(id: string) {
    const session = await this.repo.find({
      where: [
        { mentee: id, status: 'activated' },
        { mentor: id, status: 'activated' },
      ],
      relations: ['mentee', 'mentor', 'mentee.profile', 'mentor.profile'],
    });
    return session ? session.toDtos() : null;
  }

  async update(id: string, updateSessionInput: UpdateSessionInput) {
    const session = await this.repo.findOne({ id });
    if (!session) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    let duration = session.duration;
    if (session.status === 'activated' && updateSessionInput.status === 'done')
      duration = UtilsService.getMinDiff(session.updatedAt);
    const createdSession = await this.repo.create({
      id,
      ...updateSessionInput,
      duration,
    });
    await this.repo.save(createdSession);
    return this.findOne(id);
  }

  async remove(id: string) {
    const sessionToDelete = await this.findOne(id);
    if (sessionToDelete) {
      await this.repo.delete(id);
      return sessionToDelete;
    }
  }
}
