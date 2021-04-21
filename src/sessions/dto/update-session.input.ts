import { IsString, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { Status } from '../../shared/interfaces/globalStatus';

@InputType()
export class UpdateSessionInput {
  @Field(() => String)
  @IsString()
  title?: string;

  @Field(() => String)
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => String, { nullable: true })
  status?: Status;
}
