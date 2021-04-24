import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { PaginationArgs } from '../../shared/pagination.args';
import { GetQuizzes } from './dto/get-quizzes.dto';

@Resolver(() => Quiz)
export class QuizzesResolver {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Mutation(() => Quiz)
  createQuiz(@Args('createQuizInput') createQuizInput: CreateQuizInput) {
    return this.quizzesService.create(createQuizInput);
  }

  @Query(() => GetQuizzes, { name: 'quizzes' })
  findAll(@Args() paginationArgs: PaginationArgs) {
    return this.quizzesService.findAll(paginationArgs);
  }

  @Query(() => Quiz, { name: 'quiz' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.quizzesService.findOne(id);
  }

  @Mutation(() => Quiz)
  updateQuiz(
    @Args('id', { type: () => String }) id: string,
    @Args('updateQuizInput') updateQuizInput: UpdateQuizInput,
  ) {
    return this.quizzesService.update(id, updateQuizInput);
  }

  @Mutation(() => Quiz)
  removeQuiz(@Args('id', { type: () => String }) id: string) {
    return this.quizzesService.remove(id);
  }
}
