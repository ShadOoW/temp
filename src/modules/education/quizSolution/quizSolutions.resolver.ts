import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QuizSolutionsService } from './quizSolutions.service';
import { CreateQuizSolutionInput } from './dto/create-quizSolution.input';
import { UpdateQuizSolutionInput } from './dto/update-quizSolution.input';
import { QuizSolutionDto } from './dto/quizSolution.dto';
import { QuizSolutionsPageDto } from './dto/quizSolutions-page.dto';
import { QuizSolutionsPageOptionsDto } from './dto/quizSolutions-page-options.dto';
import { User as CurrentUser } from '@src/decorators/user.decorator';

@Resolver(() => QuizSolutionDto)
export class QuizSolutionsResolver {
  constructor(private readonly quizzesService: QuizSolutionsService) {}

  @Mutation(() => QuizSolutionDto)
  createQuizSolution(
    @Args('createQuizSolutionInput')
    createQuizSolutionInput: CreateQuizSolutionInput,
    @CurrentUser() userId,
  ) {
    return this.quizzesService.create(createQuizSolutionInput, userId);
  }

  @Query(() => QuizSolutionsPageDto, { name: 'quizSolutions' })
  findAll(
    @Args() pageOptionsDto: QuizSolutionsPageOptionsDto,
    @Args('mentee', { type: () => String, nullable: true }) mentee: string,
    @Args('mentor', { type: () => String, nullable: true }) mentor: string,
  ) {
    return this.quizzesService.findAll({ ...pageOptionsDto, mentee, mentor });
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
  ) {
    return this.quizzesService.update(id, updateQuizSolutionInput);
  }

  @Mutation(() => QuizSolutionDto)
  removeQuizSolution(@Args('id', { type: () => String }) id: string) {
    return this.quizzesService.remove(id);
  }
}
