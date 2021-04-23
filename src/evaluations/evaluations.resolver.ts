import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EvaluationsService } from './evaluations.service';
import { Evaluation } from './entities/evaluation.entity';
import { CreateEvaluationInput } from './dto/create-evaluation.input';
import { GetEvaluations } from './dto/get-evaluations.dto';
import { PaginationArgs } from '../shared/pagination.args';

@Resolver(() => Evaluation)
export class EvaluationsResolver {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Mutation(() => Evaluation)
  createEvaluation(
    @Args('createEvaluationInput') createEvaluationInput: CreateEvaluationInput,
  ) {
    return this.evaluationsService.create(createEvaluationInput);
  }

  @Query(() => GetEvaluations, { name: 'evaluations' })
  findAll(@Args() paginationArgs: PaginationArgs) {
    return this.evaluationsService.findAll(paginationArgs);
  }

  @Query(() => Evaluation, { name: 'evaluation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.evaluationsService.findOne(id);
  }
}
