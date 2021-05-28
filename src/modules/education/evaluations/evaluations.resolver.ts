import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationInput } from './dto/create-evaluation.input';
import { UpdateEvaluationInput } from './dto/update-evaluation.input';
import { EvaluationDto } from './dto/evaluation.dto';
import { EvaluationsPageDto } from './dto/evaluations-page.dto';
import { EvaluationsPageOptionsDto } from './dto/evaluations-page-options.dto';
import { User as CurrentUser } from '@src/decorators/user.decorator';

@Resolver(() => EvaluationDto)
export class EvaluationsResolver {
  constructor(private readonly quizzesService: EvaluationsService) {}

  @Mutation(() => EvaluationDto)
  createEvaluation(
    @Args('createEvaluationInput') createEvaluationInput: CreateEvaluationInput,
    @CurrentUser() userId,
  ) {
    return this.quizzesService.create(createEvaluationInput, userId);
  }

  @Query(() => EvaluationsPageDto, { name: 'evaluations' })
  findAll(
    @Args() pageOptionsDto: EvaluationsPageOptionsDto,
    @Args('mentee', { type: () => String, nullable: true }) mentee: string,
    @Args('mentor', { type: () => String, nullable: true }) mentor: string,
  ) {
    return this.quizzesService.findAll({ ...pageOptionsDto, mentee, mentor });
  }

  @Query(() => EvaluationDto, { name: 'evaluation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.quizzesService.findOne(id);
  }

  @Mutation(() => EvaluationDto)
  updateEvaluation(
    @Args('id', { type: () => String }) id: string,
    @Args('updateEvaluationInput') updateEvaluationInput: UpdateEvaluationInput,
  ) {
    return this.quizzesService.update(id, updateEvaluationInput);
  }

  @Mutation(() => EvaluationDto)
  removeEvaluation(@Args('id', { type: () => String }) id: string) {
    return this.quizzesService.remove(id);
  }
}
