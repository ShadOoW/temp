import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUUID, IsEmail, IsBoolean } from 'class-validator';
import { User } from '../entities/user.entity';
import { Role } from '../../roles/entities/role.entity';
import { IUser } from '../interfaces/user';

@InputType()
export class UserDto {
  @Field(() => String, { nullable: true })
  @IsUUID()
  id: string;

  @Field(() => String, { nullable: true })
  @IsString()
  firstName: string;

  @Field(() => String, { nullable: true })
  @IsString()
  lastName: string;

  @Field(() => String)
  @IsString()
  username: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  @IsString()
  phone: string;

  @Field(() => String, { nullable: true })
  @IsString()
  password: string;

  @Field(() => String, { nullable: true })
  @IsString()
  picture: string;

  @Field(() => String)
  @IsString()
  provider: string;

  @Field(() => String, { nullable: true })
  @IsString()
  providerId: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  isAdmin: boolean;

  @Field(() => String, { nullable: true })
  @IsString()
  role: Role;

  public static from(dto: Partial<UserDto>) {
    const it = new UserDto();
    it.id = dto.id;
    it.firstName = dto.firstName;
    it.lastName = dto.lastName;
    it.username = dto.username;
    it.phone = dto.phone;
    it.picture = dto.picture;
    it.email = dto.email;
    it.password = dto.password;
    it.provider = dto.provider;
    it.providerId = dto.providerId;
    it.role = dto.role;
    return it;
  }

  public static fromEntity(entity: User): IUser {
    return this.from({
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      username: entity.username,
      email: entity.email,
      phone: entity.phone,
      picture: entity.picture,
      role: entity.role,
    });
  }

  public static toEntity(inputs: Partial<UserDto>) {
    const it = new User();
    it.id = inputs.id;
    it.firstName = inputs.firstName;
    it.lastName = inputs.lastName;
    it.username = inputs.username;
    it.email = inputs.email;
    it.phone = inputs.phone;
    it.picture = inputs.picture;
    it.provider = inputs.provider;
    it.providerId = inputs.providerId;
    it.role = inputs.role;
    it.password = inputs.password;
    return it;
  }
}
