import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QuizzesService } from './quizzes.service';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { QuizDto } from './dto/quiz.dto';
import { QuizzesPageDto } from './dto/quizzes-page.dto';
import { QuizzesPageOptionsDto } from './dto/quizzes-page-options.dto';
import { User as CurrentUser } from '@src/decorators/user.decorator';

@Resolver(() => QuizDto)
export class QuizzesResolver {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Mutation(() => QuizDto)
  createQuiz(
    @Args('createQuizInput') createQuizInput: CreateQuizInput,
    @CurrentUser() userId,
  ) {
    return this.quizzesService.create(createQuizInput, userId);
  }

  @Query(() => QuizzesPageDto, { name: 'quizzes' })
  findAll(
    @Args() pageOptionsDto: QuizzesPageOptionsDto,
    @Args('mentee', { type: () => String, nullable: true }) mentee: string,
    @Args('mentor', { type: () => String, nullable: true }) mentor: string,
  ) {
    return this.quizzesService.findAll({ ...pageOptionsDto, mentee, mentor });
  }

  @Query(() => QuizDto, { name: 'quiz' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.quizzesService.findOne(id);
  }

  @Mutation(() => QuizDto)
  updateQuiz(
    @Args('id', { type: () => String }) id: string,
    @Args('updateQuizInput') updateQuizInput: UpdateQuizInput,
  ) {
    return this.quizzesService.update(id, updateQuizInput);
  }

  @Mutation(() => QuizDto)
  removeQuiz(@Args('id', { type: () => String }) id: string) {
    return this.quizzesService.remove(id);
  }
}
