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

type Subjects = InferSubjects<User | typeof User> | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Actions, Subjects]>
    >(Ability as AbilityClass<AppAbility>);
    if (user.isAdmin) {
      can(Actions.Manage, 'all');
    }

    can(Actions.Update, User, { id: user.id });
    // cannot(Actions.Delete, Item, { isPublished: true });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
