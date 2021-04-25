import { Injectable } from '@nestjs/common';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Actions } from '@shared/actions';
import { UserEntity } from '@users/users/entities/user.entity';
import { Permission } from '@users/permissions/entities/permission.entity';
import { Role } from '@users/roles/entities/role.entity';
import { Profile } from '@users/profiles/entities/profile.entity';
import { Request } from '@users/requests/entities/request.entity';

type Subjects =
  | InferSubjects<
      typeof UserEntity | typeof Permission | typeof Role | typeof Profile
    >
  | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: any, args: any = null) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Actions, Subjects]>
    >(Ability as AbilityClass<AppAbility>);
    if (user) {
      const { permissions, profile } = user;
      if (user.isAdmin) can(Actions.Manage, 'all');

      // authorize RUD by check userId
      if (args.id === user.id) can([Actions.Update], UserEntity);

      // authorize role management
      if (permissions.some((p) => p.name === 'manage:role'))
        can(Actions.Manage, Role);

      // authorize permission management
      if (permissions.some((p) => p.name === 'manage:permission'))
        can(Actions.Manage, Permission);

      // authorize profile management
      if (permissions.some((p) => p.name === 'manage:profile')) {
        can([Actions.Create, Actions.Read], Profile);
        if (profile === args.id) can(Actions.Update, Profile);
      } else if (permissions.some((p) => p.name === 'update:profile')) {
        if (profile === args.id) can(Actions.Update, Profile);
      }

      // authorize request management
      if (permissions.some((p) => p.name === 'manage:request')) {
        can(Actions.Manage, Request);
      }

      // permissions not authorized
      cannot(Actions.Delete, [UserEntity, Profile]);
      can([Actions.Read], UserEntity);
    } else {
      cannot(Actions.Manage, 'all');
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
