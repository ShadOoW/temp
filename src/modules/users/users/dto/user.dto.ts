import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractDto } from '@src/common/dto/Abstract.dto';
import { UserEntity } from '@users/users/entities/user.entity';
import { RoleDto } from '@users/roles/dto/role.dto';
import { ProfileDto } from '@users/profiles/dto/profile.dto';

@ObjectType()
export class UserDto extends AbstractDto {
  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => Boolean, { nullable: true })
  active: boolean;

  @Field(() => String)
  status: string;

  @Field(() => String)
  provider: string;

  @Field(() => String, { nullable: true })
  providerId: string;

  @Field(() => Boolean)
  isAdmin: boolean;

  @Field(() => RoleDto, { nullable: true })
  role: RoleDto;

  @Field(() => ProfileDto, { nullable: true })
  profile: ProfileDto;

  constructor(user: UserEntity) {
    super(user);
    this.email = user.email;
    this.username = user.username;
    this.active = user.active;
    this.status = user.status;
    this.provider = user.provider;
    this.providerId = user.providerId;
    this.isAdmin = user.isAdmin;
    this.role = user.role;
    this.profile = user.profile;
  }
}
