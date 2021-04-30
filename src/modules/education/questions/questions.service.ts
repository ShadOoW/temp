import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { Repository } from 'typeorm';
import { CreateQuestionInput } from './dto/create-question.input';
import { QuestionsPageOptionsDto } from './dto/questions-page-options.dto';
import { QuestionsPageDto } from './dto/questions-page.dto';
import { UpdateQuestionInput } from './dto/update-question.input';
import { QuestionEntity } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly repo: Repository<QuestionEntity>,
  ) {}
  async create(createQuestionInput: CreateQuestionInput) {
    const createdQuestion = await this.repo.create(createQuestionInput);
    return (await this.repo.save(createdQuestion)).toDto();
  }

  async findAll(pageOptionsDto: QuestionsPageOptionsDto) {
    const { order, take } = pageOptionsDto;
    const [questions, questionsCount] = await this.repo.findAndCount({
      relations: ['user'],
      order: {
        createdAt: order,
      },
      take,
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: questionsCount,
    });
    return new QuestionsPageDto(questions.toDtos(), pageMetaDto);
  }

  async findOne(id: string) {
    const question = await this.repo.findOneOrFail(id, { relations: ['user'] });
    return question ? question.toDto() : null;
  }

  async update(id: string, updateQuestionInput: UpdateQuestionInput) {
    const question = await this.repo.findOne({ id });
    if (!question) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatedQuestion = await this.repo.save({
      id,
      ...updateQuestionInput,
    });
    return (await this.repo.save(updatedQuestion)).toDto();
  }

  async remove(id: string) {
    const questionToDelete = await this.repo.findOne(id);
    await this.repo.delete(id);
    return questionToDelete.toDto();
  }
}
