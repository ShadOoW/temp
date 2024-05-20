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
import { UsersService } from '@src/modules/users/users/users.service';
import { EmailsService } from '@src/modules/users/emails/emails.service';
import {
  SESSION_ACCEPTED_SUBJECT,
  SESSION_ACCEPTED_TEMPLATE,
  SESSION_SUBJECT,
  SESSION_TEMPLATE,
} from '@src/shared/emails';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly repo: Repository<SessionEntity>,
    private usersService: UsersService,
    private emailService: EmailsService,
  ) {}

  async create(
    createSessionInput: CreateSessionInput,
    role: string,
  ): Promise<SessionDto> {
    const createdSession = await this.repo.create(createSessionInput);
    const savedSession = await this.repo.save(createdSession);
    if (role == 'mentee') {
      await this.sendSessionEmail(createSessionInput.mentor);
    } else if (role == 'mentor') {
      await this.sendSessionEmail(createSessionInput.mentee);
    }

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

  async update(
    id: string,
    role: string,
    updateSessionInput: UpdateSessionInput,
  ) {
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
    const updatedSessionToAccepted = await this.repo.save(createdSession);

    if (updatedSessionToAccepted.status === 'accepted') {
      const users = await this.repo.findOne(id, {
        relations: ['mentee', 'mentor', 'mentee.profile', 'mentor.profile'],
      });
      if (role == 'mentee') {
        await this.sendSessionEmailAccepted(users.mentor.id);
      } else if (role == 'mentor') {
        await this.sendSessionEmailAccepted(users.mentee.id);
      }
    }
    return this.findOne(id); 
  }

  async remove(id: string) {
    const sessionToDelete = await this.findOne(id);
    if (sessionToDelete) {
      await this.repo.delete(id);
      return sessionToDelete;
    }
  }

  async sendSessionEmail(Id: any) {
    const user = await this.usersService.findOne(Id);
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.emailService.sendMail(
      SESSION_TEMPLATE,
      user?.email,
      SESSION_SUBJECT,
      {
        firstName: user.profile?.firstName,
        lastName: user.profile?.lastName,
      },
    );
  }
  async sendSessionEmailAccepted(Id: any) {
    const user = await this.usersService.findOne(Id);
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.emailService.sendMail(
      SESSION_ACCEPTED_TEMPLATE,
      user?.email,
      SESSION_ACCEPTED_SUBJECT,
      {
        firstName: user.profile?.firstName,
        lastName: user.profile?.lastName,
      },
    );
  }
}

