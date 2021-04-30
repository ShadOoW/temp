import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { Repository } from 'typeorm';
import { CreateQuestionInput } from './dto/create-question.input';
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

  async findAll(args = null) {
    const { take, skip } = args;
    delete args.take;
    delete args.skip;
    const [questions, totalCount] = await this.repo.findAndCount({
      where: args,
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
      skip,
      take,
    });
    return { questions, totalCount };
  }

  async findOne(id: string) {
    return await this.repo.findOneOrFail(id, { relations: ['user'] });
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
