import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EvaluationsService } from './evaluations.service';
import { Evaluation } from './entities/evaluation.entity';
import { CreateEvaluationInput } from './dto/create-evaluation.input';

@Resolver(() => Evaluation)
export class EvaluationsResolver {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Mutation(() => Evaluation)
  createEvaluation(
    @Args('createEvaluationInput') createEvaluationInput: CreateEvaluationInput,
  ) {
    return this.evaluationsService.create(createEvaluationInput);
  }

  @Query(() => [Evaluation], { name: 'evaluations' })
  findAll() {
    return this.evaluationsService.findAll();
  }

  @Query(() => Evaluation, { name: 'evaluation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.evaluationsService.findOne(id);
  }
}
