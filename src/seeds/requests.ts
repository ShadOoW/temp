import * as _ from 'lodash';
import * as faker from 'faker';
import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../config/config.service';
import { RequestsService } from '../requests/requests.service';
import { Request } from '../requests/entities/request.entity';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { UsersService } from '../users/users.service';
import { ProfilesService } from '../profiles/profiles.service';
import { Profile } from '../profiles/entities/profile.entity';
import { User } from '../users/entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/entities/role.entity';

async function genRequest(
  subcriptionService,
  from,
  to,
  accepted = false,
  callback,
) {
  let request: any = {
    title: faker.lorem.sentence(),
    excerpt: faker.lorem.paragraph(),
    from,
    to,
  };
  if (accepted) {
    request = { ...request, status: 'accepted' };
    await subcriptionService.create({
      subscriber: from,
      subscribedTo: to,
    });
  }
  callback();
  return request;
}

export async function requestsSeed() {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const subcriptionService = new SubscriptionsService(
    connection.getRepository(Subscription),
  );
  const requestService = new RequestsService(
    connection.getRepository(Request),
    subcriptionService,
  );
  const userService = new UsersService(
    connection.getRepository(User),
    new ProfilesService(connection.getRepository(Profile)),
  );
  const roleService = new RolesService(connection.getRepository(Role));

  const { roles } = await roleService.findAll();
  const mentees = await userService.findByRole(
    roles.find((r) => r.name === 'mentee').id,
  );
  const mentors = await userService.findByRole(
    roles.find((r) => r.name === 'mentor').id,
  );
  const m2mLength = mentees.length + mentors.length;

  if (m2mLength > 5) {
    const acceptedRequests = _.range(
      0,
      m2mLength > 15 ? 10 : m2mLength - 3,
    ).map(async () => {
      const menteeIndex = Math.floor(Math.random() * mentees.length);
      const mentorIndex = Math.floor(Math.random() * mentors.length);
      return await genRequest(
        subcriptionService,
        mentees[menteeIndex],
        mentors[mentorIndex],
        true,
        () => {
          mentees.splice(menteeIndex, 1);
          mentors.splice(mentorIndex, 1);
        },
      );
    });
    const defautRequests = _.range(0, m2mLength > 15 ? 5 : 3).map(async () => {
      const menteeIndex = Math.floor(Math.random() * mentees.length);
      const mentorIndex = Math.floor(Math.random() * mentors.length);
      return await genRequest(
        subcriptionService,
        mentees[menteeIndex],
        mentors[mentorIndex],
        false,
        () => {
          mentees.splice(menteeIndex, 1);
          mentors.splice(mentorIndex, 1);
        },
      );
    });
    const work = [...acceptedRequests, ...defautRequests].map(
      async (request, index) =>
        requestService
          .create(await request)
          .then((r) => (console.log(`request ${index} done ->`, r.title), r))
          .catch(() => console.log(`request ${index} -> error`)),
    );

    await Promise.all(work);
    return await connection.close();
  }
}
