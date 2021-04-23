import { User } from '../entities/user.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from '../../roles/entities/role.entity';
import { Request } from '../../requests/entities/request.entity';
import { Profile } from '../../profiles/entities/profile.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { Session } from '../../sessions/entities/session.entity';
import { UserStatus } from '../interfaces/user';

@ObjectType()
export class GetUserDto {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => Boolean, { nullable: true })
  active?: boolean;

  @Field(() => String, { nullable: true })
  status?: UserStatus;

  @Field(() => String, { nullable: true })
  provider?: string;

  @Field(() => String, { nullable: true })
  providerId?: string;

  @Field(() => Boolean, { nullable: true })
  isAdmin?: boolean;

  @Field(() => Role, { nullable: true })
  role?: Role;

  @Field(() => Profile, { nullable: true })
  profile?: Profile;

  @Field(() => [Request], { nullable: true })
  requestsTo?: Request[];

  @Field(() => [Request], { nullable: true })
  requestsFrom?: Request[];

  @Field(() => [Subscription], { nullable: true })
  subscriptions?: Subscription[];

  @Field(() => [Subscription], { nullable: true })
  subscribers?: Subscription[];

  @Field(() => [Session], { nullable: true })
  menteeSessions?: Session[];

  @Field(() => [Session], { nullable: true })
  mentorSessions?: Session[];

  public static getUserRequests(userEntity: any): any {
    return {
      id: userEntity.id,
      requestsTo: [
        ...(userEntity.requestsTo || []).map((request) => ({
          id: request.id,
          title: request.title,
          excerpt: request.excerpt,
          status: request.status,
        })),
      ],
      requestsFrom: [
        ...(userEntity.requestsFrom || []).map((request) => ({
          id: request.id,
          title: request.title,
          excerpt: request.excerpt,
          status: request.status,
        })),
      ],
    };
  }

  public static getUser(userEntity: User): any {
    return {
      id: userEntity.id,
      username: userEntity.username,
      email: userEntity.email,
      active: userEntity.active,
      isAdmin: userEntity.isAdmin,
      role: {
        id: userEntity.role?.id,
        name: userEntity.role?.name,
        permissions: [
          ...(userEntity.role?.permissions || []).map((permission) => ({
            id: permission.id,
            name: permission.name,
          })),
        ],
      },
      profile: {
        ...userEntity.profile,
        coachingDomains: [
          ...(userEntity.profile?.coachingDomains || []).map(
            (domain) => domain.name,
          ),
        ],
        wantedDomain: userEntity.profile?.wantedDomain?.name,
      },
      createdAt: userEntity.createdAt,
    };
  }

  public static getUserAuthInfo(userEntity: User): any {
    return {
      id: userEntity.id,
      isAdmin: userEntity.isAdmin,
      profile: userEntity.profile.id,
      role: userEntity.role?.name,
      permissions: [
        ...(userEntity.role?.permissions || []).map((permission) => ({
          name: permission.name,
        })),
      ],
    };
  }
}
