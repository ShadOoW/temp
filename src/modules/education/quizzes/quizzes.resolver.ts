import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QuizzesService } from './quizzes.service';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { QuizDto } from './dto/quiz.dto';
import { QuizzesPageDto } from './dto/quizzes-page.dto';
import { QuizzesPageOptionsDto } from './dto/quizzes-page-options.dto';
import { User as CurrentUser } from '@src/decorators/user.decorator';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Resolver(() => QuizDto)
export class QuizzesResolver {
  constructor(
    private readonly quizzesService: QuizzesService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Mutation(() => QuizDto)
  createQuiz(
    @Args('createQuizInput') createQuizInput: CreateQuizInput,
    @CurrentUser() userId,
  ) {
    return this.quizzesService.create(createQuizInput, userId).then((event) => {
      this.eventEmitter.emit('quiz.created', { ...event, userId });
      return event;
    });
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
    @CurrentUser() userId,
  ) {
    return this.quizzesService.update(id, updateQuizInput).then((event) => {
      this.eventEmitter.emit('quiz.updated', { ...event, userId });
      return event;
    });
  }

  @Mutation(() => QuizDto)
  removeQuiz(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() userId,
  ) {
    return this.quizzesService.remove(id);
  }
}
