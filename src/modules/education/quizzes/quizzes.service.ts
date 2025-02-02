import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { EmailsService } from '@src/modules/users/emails/emails.service';
import { UsersService } from '@src/modules/users/users/users.service';
import { UtilsService } from '@src/providers/utils.service';
import { SENDQUIZ_SUBJECT, SENDQUIZ_TEMPLATE } from '@src/shared/emails';
import { Repository } from 'typeorm';
import { CreateQuizInput } from './dto/create-quiz.input';
import { QuizzesPageOptionsDto } from './dto/quizzes-page-options.dto';
import { QuizzesPageDto } from './dto/quizzes-page.dto';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { QuizEntity } from './entities/quiz.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(QuizEntity) private readonly repo: Repository<QuizEntity>,
    private usersService: UsersService,
    private emailService: EmailsService,
  ) {}
  async create(createQuizInput: CreateQuizInput, userId) {
    const createdQuiz = await this.repo.create({
      ...createQuizInput,
      mentor: userId,
    });
    const sendEmailPromise = createQuizInput.mentees.map((sendTo) =>
      this.sendQuizEmail(userId, sendTo),
    );
    await Promise.all(sendEmailPromise);
    return (await this.repo.save(createdQuiz)).toDto();
  }

  async findAll(pageOptionsDto: QuizzesPageOptionsDto) {
    const mentee = pageOptionsDto.mentee;
    delete pageOptionsDto.mentee;
    const [quizzes, quizzesCount] = await this.repo.findAndCount({
      join: { alias: 'quizzes', innerJoin: { mentees: 'quizzes.mentees' } },
      where: mentee
        ? (qb) => {
            qb.where({
              ...UtilsService.getOptions(pageOptionsDto),
            }).andWhere('mentees.id = :id', { id: mentee });
          }
        : UtilsService.getOptions(pageOptionsDto),
      relations: ['mentor', 'mentees', 'mentor.profile', 'mentees.profile'],
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: quizzesCount,
    });
    return new QuizzesPageDto(quizzes.toDtos(), pageMetaDto);
  }

  async findOne(id: string) {
    const quiz = await this.repo.findOneOrFail(id, {
      relations: ['mentor', 'mentees', 'mentor.profile', 'mentees.profile'],
    });
    return quiz ? quiz.toDto() : null;
  }

  async update(id: string, updateQuizInput: UpdateQuizInput) {
    const quiz = await this.repo.findOne({ id });
    if (!quiz) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatedQuiz = await this.repo.create({ id, ...updateQuizInput });
    return (await this.repo.save(updatedQuiz)).toDto();
  }

  async remove(id: string) {
    const quizToDelete = await this.repo.findOne(id);
    await this.repo.delete(id);
    return quizToDelete.toDto();
  }

  async sendQuizEmail(createdById: any, sendToId: any) {
    const createdBy = await this.usersService.findOne(createdById);
    const sendTo = await this.usersService.findOne(sendToId);
    if (!createdBy && !sendTo) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (sendTo && createdBy) {
      await this.emailService.sendMail(
        SENDQUIZ_TEMPLATE,
        sendTo.email,
        SENDQUIZ_SUBJECT,
        {
          firstName: sendTo.profile?.firstName,
          lastName: sendTo.profile?.lastName,
        },
      );
    }
  }
}
