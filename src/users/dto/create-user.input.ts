import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUUID, IsEmail, IsBoolean } from 'class-validator';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../../roles/entities/role.entity';

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: true })
  @IsUUID()
  id: string;

  @Field(() => String)
  @IsString()
  firstName: string;

  @Field(() => String)
  @IsString()
  lastName: string;

  @Field(() => String)
  @IsString()
  username: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  phone: string;

  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => String)
  @IsString()
  picture: string;

  @Field(() => String)
  @IsString()
  provider: string;

  @Field(() => String)
  @IsString()
  providerId: string;

  @Field(() => Boolean)
  @IsBoolean()
  isAdmin: boolean;

  @Field(() => String)
  @IsString()
  role: Role;

  @Field(() => String)
  @IsString()
  access_token: string;

  public static from(dto: Partial<CreateUserInput>) {
    const it = new CreateUserInput();
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
    it.access_token = dto.access_token;
    return it;
  }

  public static fromEntity(entity: User) {
    return this.from({
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      username: entity.username,
      email: entity.email,
      phone: entity.phone,
      picture: entity.picture,
      provider: entity.provider,
      providerId: entity.providerId,
      role: entity.role,
    });
  }

  public async toEntity() {
    const it = new User();
    const hash = this.password ? await bcrypt.hash(this.password, 10) : '';
    it.id = this.id;
    it.firstName = this.firstName;
    it.lastName = this.lastName;
    it.username = this.username;
    it.email = this.email;
    it.phone = this.phone;
    it.picture = this.picture;
    it.provider = this.provider;
    it.providerId = this.providerId;
    it.role = this.role;
    it.password = hash;
    it.createdBy = 'dpdp';
    it.updatedBy = 'aaaa';
    return it;
  }
}
