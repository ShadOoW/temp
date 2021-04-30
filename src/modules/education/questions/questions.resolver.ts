import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QuestionsService } from './questions.service';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { QuestionDto } from './dto/question.dto';
import { QuestionsPageOptionsDto } from './dto/questions-page-options.dto';
import { QuestionsPageDto } from './dto/questions-page.dto';

@Resolver(() => QuestionDto)
export class QuestionsResolver {
  constructor(private readonly questionsService: QuestionsService) {}

  @Mutation(() => QuestionDto)
  createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
  ) {
    return this.questionsService.create(createQuestionInput);
  }

  @Query(() => QuestionsPageDto, { name: 'questions' })
  findAll(@Args() pageOptionsDto: QuestionsPageOptionsDto) {
    return this.questionsService.findAll(pageOptionsDto);
  }

  @Query(() => QuestionDto, { name: 'question' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.questionsService.findOne(id);
  }

  @Mutation(() => QuestionDto)
  updateQuestion(
    @Args('id', { type: () => String }) id: string,
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ) {
    return this.questionsService.update(id, updateQuestionInput);
  }

  @Mutation(() => QuestionDto)
  removeQuestion(@Args('id', { type: () => String }) id: string) {
    return this.questionsService.remove(id);
  }
}
