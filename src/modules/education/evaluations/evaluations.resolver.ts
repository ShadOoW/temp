import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationInput } from './dto/create-evaluation.input';
import { EvaluationDto } from './dto/evaluation.dto';
import { EvaluationsPageOptionsDto } from './dto/evaluations-page-options.dto';
import { EvaluationsPageDto } from './dto/evaluations-page.dto';

@Resolver(() => EvaluationDto)
export class EvaluationsResolver {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Mutation(() => EvaluationDto)
  createEvaluation(
    @Args('createEvaluationInput') createEvaluationInput: CreateEvaluationInput,
  ) {
    return this.evaluationsService.create(createEvaluationInput);
  }

  @Query(() => EvaluationsPageDto, { name: 'evaluations' })
  findAll(@Args() pageOptionsDto: EvaluationsPageOptionsDto) {
    return this.evaluationsService.findAll(pageOptionsDto);
  }

  @Query(() => EvaluationDto, { name: 'evaluation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.evaluationsService.findOne(id);
  }
}
