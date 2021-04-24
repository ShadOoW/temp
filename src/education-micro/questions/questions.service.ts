import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from '../../shared/ERROR_MESSAGES';
import { Repository } from 'typeorm';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question) private readonly repo: Repository<Question>,
  ) {}
  create(createQuestionInput: CreateQuestionInput) {
    return this.repo.save(createQuestionInput);
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
    return await this.repo.save({ id, ...updateQuestionInput });
  }

  async remove(id: string) {
    const questionToDelete = await this.findOne(id);
    await this.repo.delete(id);
    return questionToDelete;
  }
}
