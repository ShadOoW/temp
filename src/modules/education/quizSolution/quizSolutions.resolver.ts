import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QuizSolutionsService } from './quizSolutions.service';
import { CreateQuizSolutionInput } from './dto/create-quizSolution.input';
import { UpdateQuizSolutionInput } from './dto/update-quizSolution.input';
import { QuizSolutionDto } from './dto/quizSolution.dto';
import { QuizSolutionsPageDto } from './dto/quizSolutions-page.dto';
import { QuizSolutionsPageOptionsDto } from './dto/quizSolutions-page-options.dto';
import { User as CurrentUser } from '@src/decorators/user.decorator';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Resolver(() => QuizSolutionDto)
export class QuizSolutionsResolver {
  constructor(
    private readonly quizzesService: QuizSolutionsService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Mutation(() => QuizSolutionDto)
  createQuizSolution(
    @Args('createQuizSolutionInput')
    createQuizSolutionInput: CreateQuizSolutionInput,
    @CurrentUser() user,
  ) {
    return this.quizzesService
      .create(createQuizSolutionInput, user.id)
      .then((event) => {
        this.eventEmitter.emit('quizSolution.created', {
          ...event,
          userId: user.id,
        });
        return event;
      });
  }

  @Query(() => QuizSolutionsPageDto, { name: 'quizSolutions' })
  findAll(
    @Args() pageOptionsDto: QuizSolutionsPageOptionsDto,
    @Args('mentee', { type: () => String, nullable: true }) mentee: string,
    @Args('mentor', { type: () => String, nullable: true }) mentor: string,
    @Args('quiz', { type: () => String, nullable: true }) quiz: string,
  ) {
    return this.quizzesService.findAll({
      ...pageOptionsDto,
      mentee,
      mentor,
      quiz,
    });
  }

  @Query(() => QuizSolutionDto, { name: 'quizSolution' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.quizzesService.findOne(id);
  }

  @Mutation(() => QuizSolutionDto)
  updateQuizSolution(
    @Args('id', { type: () => String }) id: string,
    @Args('updateQuizSolutionInput')
    updateQuizSolutionInput: UpdateQuizSolutionInput,
    @CurrentUser() user,
  ) {
    return this.quizzesService
      .update(id, updateQuizSolutionInput)
      .then((event) => {
        this.eventEmitter.emit('quizSolution.updated', {
          ...event,
          userId: user.id,
        });
        return event;
      });
  }

  @Mutation(() => QuizSolutionDto)
  removeQuizSolution(@Args('id', { type: () => String }) id: string) {
    return this.quizzesService.remove(id);
  }
}
