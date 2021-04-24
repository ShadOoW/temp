import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../../config/config.service';
import * as _ from 'lodash';
import * as faker from 'faker';
import { UsersService } from '../../users-service/users/users.service';
import { User } from '../../users-service/users/entities/user.entity';
import { Profile } from '../../users-service/profiles/entities/profile.entity';
import { ProfilesService } from '../../users-service/profiles/profiles.service';
import { RolesService } from '../../users-service/roles/roles.service';
import { Role } from '../../users-service/roles/entities/role.entity';
import { DomainsService } from '../../users-service/domains/domains.service';
import { Domain } from '../../users-service/domains/entities/domain.entity';

function genUser(username, type, role = null, domains = []) {
  const user = {
    username,
    email: `${username !== 'admin' ? username : 'adminos'}@email.com`,
    password: `${username}123`,
    provider: 'local',
    isAdmin: role ? false : true,
    active:
      username === 'admin' || username === 'mentee' || username === 'mentor'
        ? true
        : false,
    status: 'close',
    role,
    profile: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phoneNumber: faker.phone.phoneNumber(),
      city: faker.address.city(),
    },
  };
  const m2mProfile = {
    company: faker.company.companyName(),
    website: faker.internet.url(),
    linkedin: `www.linkedin.com/${username}`,
    country: 'Maroc',
    domainExpertise: 'Domain A',
    yearsOfExperience: Math.floor(Math.random() * 11),
  };
  switch (type) {
    case 'mentor':
      return {
        ...user,
        profile: {
          ...user.profile,
          ...m2mProfile,
          coachingType: 'Type A',
          coachingDomains: domains,
          canOffer: faker.lorem.paragraph(),
          professionalBg: faker.lorem.paragraph(),
          hoursPerMonth: Math.floor(Math.random() * 20),
        },
      };
    case 'mentee':
      return {
        ...user,
        profile: {
          ...user.profile,
          ...m2mProfile,
          currentPost: faker.name.jobDescriptor(),
          sector: faker.name.jobArea(),
          wantedDomain: domains[0],
          whyNeedCoaching: faker.lorem.paragraph(),
          selfDescription: faker.lorem.paragraph(),
        },
      };
    default:
      return user;
  }
}
export async function usersSeed() {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const userService = new UsersService(
    connection.getRepository(User),
    new ProfilesService(connection.getRepository(Profile)),
  );
  const roleService = new RolesService(connection.getRepository(Role));
  const domainService = new DomainsService(connection.getRepository(Domain));

  const { roles } = await roleService.findAll();
  const { domains } = await domainService.findAll();

  if (roles.length && domains.length) {
    const domainIndex = Math.floor(Math.random() * (domains.length - 2) + 2);
    const { id: mentorId } = roles.find((r) => r.name === 'mentor');
    const { id: menteeId } = roles.find((r) => r.name === 'mentee');
    const defaults = [
      genUser('admin', 'admin'),
      genUser(
        'mentee',
        'mentee',
        menteeId,
        domains.slice(domainIndex, domainIndex + 1),
      ),
      genUser(
        'mentor',
        'mentor',
        mentorId,
        domains.slice(domainIndex, domainIndex + 2),
      ),
    ];
    const mentors = _.range(1, 5).map(() => {
      const username = faker.internet.userName();
      const domainIndex = Math.floor(Math.random() * (domains.length - 2) + 2);

      return genUser(
        username,
        'mentor',
        mentorId,
        domains.slice(domainIndex, domainIndex + 2),
      );
    });
    const mentees = _.range(1, 5).map(() => {
      const username = faker.internet.userName();
      const domainIndex = Math.floor(Math.random() * (domains.length - 1) + 1);
      return genUser(
        username,
        'mentee',
        menteeId,
        domains.slice(domainIndex, domainIndex + 1),
      );
    });
    const work = [...defaults, ...mentors, ...mentees].map((user, index) =>
      userService
        .create(user)
        .then((r) => (console.log(`user ${index} done ->`, r.username), r))
        .catch((e) => console.log(`user ${index} error ->`, e)),
    );

    await Promise.all(work);
    return await connection.close();
  }
}
