import { Injectable } from '@nestjs/common';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Actions } from '../shared/actions';
import { User } from '../users/entities/user.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { Role } from '../roles/entities/role.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { Request } from '../requests/entities/request.entity';

type Subjects =
  | InferSubjects<
      typeof User | typeof Permission | typeof Role | typeof Profile
    >
  | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: any, args: any = null) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Actions, Subjects]>
    >(Ability as AbilityClass<AppAbility>);
    const { permissions, profile } = user;
    if (user.isAdmin) can(Actions.Manage, 'all');

    // authorize RUD by check userId
    if (args.id === user.id) can([Actions.Read, Actions.Update], User);

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
    cannot(Actions.Delete, [User, Profile]);
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
