import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { UtilsService } from '@src/providers/utils.service';
import { Repository } from 'typeorm';
import { CreateQuizSolutionInput } from './dto/create-quizSolution.input';
import { QuizSolutionsPageOptionsDto } from './dto/quizSolutions-page-options.dto';
import { QuizSolutionsPageDto } from './dto/quizSolutions-page.dto';
import { UpdateQuizSolutionInput } from './dto/update-quizSolution.input';
import { QuizSolutionEntity } from './entities/quizSolution.entity';

@Injectable()
export class QuizSolutionsService {
  constructor(
    @InjectRepository(QuizSolutionEntity)
    private readonly repo: Repository<QuizSolutionEntity>,
  ) {}
  async create(createQuizSolutionInput: CreateQuizSolutionInput, userId) {
    const createdQuizSolution = await this.repo.create({
      ...createQuizSolutionInput,
      mentee: userId,
    });
    return (await this.repo.save(createdQuizSolution)).toDto();
  }

  async findAll(pageOptionsDto: QuizSolutionsPageOptionsDto) {
    const [quizSolutions, quizzesCount] = await this.repo.findAndCount({
      where: UtilsService.getOptions(pageOptionsDto),
      relations: ['mentee', 'mentor', 'quiz'],
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: quizzesCount,
    });
    return new QuizSolutionsPageDto(quizSolutions.toDtos(), pageMetaDto);
  }

  async findOne(id: string) {
    const quizSolution = await this.repo.findOneOrFail(id, {
      relations: ['mentee', 'mentor'],
    });
    return quizSolution ? quizSolution.toDto() : null;
  }

  async update(id: string, updateQuizSolutionInput: UpdateQuizSolutionInput) {
    const quizSolution = await this.repo.findOne({ id });
    if (!quizSolution) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatedQuizSolution = await this.repo.create({
      id,
      ...updateQuizSolutionInput,
    });
    return (await this.repo.save(updatedQuizSolution)).toDto();
  }

  async remove(id: string) {
    const quizToDelete = await this.repo.findOne(id);
    await this.repo.delete(id);
    return quizToDelete.toDto();
  }
}
