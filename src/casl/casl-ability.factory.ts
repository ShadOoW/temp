import { Injectable } from '@nestjs/common';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Actions } from '../shared/actions';
import { Item } from '../item/entities/item.entity';
import { User } from '../users/entities/user.entity';

type Subjects = InferSubjects<Item | typeof Item | typeof User> | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Actions, Subjects]>
    >(Ability as AbilityClass<AppAbility>);
    console.log('CaslAbilityFactory ==>', user);
    if (user) {
      can(Actions.Manage, 'all'); // read-write access to everything
    } else {
      can(Actions.Read, 'all'); // read-only access to everything
    }

    can(Actions.Update, Item, { authorId: user.id });
    cannot(Actions.Delete, Item, { isPublished: true });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
