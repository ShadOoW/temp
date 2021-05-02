import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateSessionInput } from './dto/update-session.input';
import { SessionEntity } from './entities/session.entity';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { CreateSessionInput } from './dto/create-session.input copy';
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
    return (await this.repo.save(createdSession)).toDto();
  }

  // TODO WHERE & PAGE OPTIONS
  async findNotDue(
    pageOptionsDto: SessionsPageOptionsDto,
    status?: string,
    mentor?: string,
    mentee?: string,
  ) {
    const { order, take, page } = pageOptionsDto;
    const [sessions, sessionsCount] = await this.repo.findAndCount({
      where: {
        ...UtilsService.getOptions({ mentee, mentor, status }),
        startDate: MoreThanOrEqual(new Date()),
      },
      relations: ['mentee', 'mentor', 'mentee.profile', 'mentor.profile'],
      order: {
        createdAt: order,
      },
      take,
      skip: UtilsService.skip(page, take),
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
    const { order, take, page } = pageOptionsDto;
    const [sessions, sessionsCount] = await this.repo.findAndCount({
      where: UtilsService.getOptions({ mentee, mentor, status }),
      relations: ['mentee', 'mentor', 'mentee.profile', 'mentor.profile'],
      order: {
        createdAt: order,
      },
      take,
      skip: UtilsService.skip(page, take),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: sessionsCount,
    });
    return new SessionsPageDto(sessions.toDtos(), pageMetaDto);
  }

  async findOne(id: string) {
    const domain = await this.repo.findOneOrFail(id, {
      relations: ['mentee', 'mentor', 'mentee.profile', 'mentor.profile'],
    });
    return domain ? domain.toDto() : null;
  }

  async update(id: string, updateSessionInput: UpdateSessionInput) {
    const session = await this.repo.findOne({ id });
    if (!session) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdSession = await this.repo.create({
      id,
      ...updateSessionInput,
    });
    return (await this.repo.save(createdSession)).toDto();
  }

  async remove(id: string) {
    const sessionToDelete = await this.findOne(id);
    await this.repo.delete(id);
    return sessionToDelete.toDto();
  }
}
