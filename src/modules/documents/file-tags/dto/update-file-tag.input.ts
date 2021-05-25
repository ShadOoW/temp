import { CreateFileTagInput } from './create-file-tag.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFileTagInput extends PartialType(CreateFileTagInput) {
  @Field(() => String)
  name: string;
}
