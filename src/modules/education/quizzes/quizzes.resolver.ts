import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QuizzesService } from './quizzes.service';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { QuizDto } from './dto/quiz.dto';
import { QuizzesPageDto } from './dto/quizzes-page.dto';
import { QuizzesPageOptionsDto } from './dto/quizzes-page-options.dto';

@Resolver(() => QuizDto)
export class QuizzesResolver {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Mutation(() => QuizDto)
  createQuiz(@Args('createQuizInput') createQuizInput: CreateQuizInput) {
    return this.quizzesService.create(createQuizInput);
  }

  @Query(() => QuizzesPageDto, { name: 'quizzes' })
  findAll(@Args() pageOptionsDto: QuizzesPageOptionsDto) {
    return this.quizzesService.findAll(pageOptionsDto);
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
