import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Domain } from '../entities/domain.entity';

@InputType()
export class CreateDomainInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  description: string;

  public static from(dto: Partial<CreateDomainInput>) {
    const it = new CreateDomainInput();
    it.name = dto.name;
    it.description = dto.description;
    return it;
  }

  public static fromEntity(entity: Domain) {
    return this.from({
      name: entity.name,
      description: entity.description,
    });
  }
}
