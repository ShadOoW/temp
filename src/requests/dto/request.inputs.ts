import { InputType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { User } from '../../users/entities/user.entity';

@InputType()
export class CreateRequestUserInput {
  @Field(() => String)
  @IsUUID()
  id: string;
}
