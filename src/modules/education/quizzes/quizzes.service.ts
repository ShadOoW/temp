import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { UtilsService } from '@src/providers/utils.service';
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
  ) {}
  async create(createQuizInput: CreateQuizInput) {
    const createdQuiz = await this.repo.create(createQuizInput);
    return (await this.repo.save(createdQuiz)).toDto();
  }

  async findAll(pageOptionsDto: QuizzesPageOptionsDto) {
    const [quizzes, quizzesCount] = await this.repo.findAndCount({
      where: UtilsService.getOptions(pageOptionsDto),
      relations: ['user', 'questions'],
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
      relations: ['user', 'questions'],
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
}
