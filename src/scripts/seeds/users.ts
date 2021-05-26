/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '@config/config.service';
import * as _ from 'lodash';
import * as faker from 'faker';
import { UserEntity } from '@users/users/entities/user.entity';
import { RoleEntity } from '@users/roles/entities/role.entity';
import { DomainEntity } from '@users/domains/entities/domain.entity';
import * as bcrypt from 'bcrypt';
import { ProfileEntity } from '@src/modules/users/profiles/entities/profile.entity';

async function genUser(username, type, role = null, domains = []) {
  const pw = await bcrypt.hash(`${username}123`, 10);
  const user = {
    username,
    email: `${username !== 'admin' ? username : 'adminos'}@email.com`,
    password: pw,
    provider: 'local',
    isAdmin: role ? false : true,
    active:
      username === 'admin' || username === 'mentee' || username === 'mentor'
        ? true
        : false,
    status: 'open',
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
          domainExpertise: ['domain A', 'domain B'],
          canOffer: faker.lorem.paragraph(),
          professionalBg: faker.lorem.paragraph(),
          hoursPerMonth: Math.floor(Math.random() * 20).toString(),
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
  const userService = connection.getRepository(UserEntity);
  const profileService = connection.getRepository(ProfileEntity);
  const roleService = connection.getRepository(RoleEntity);
  const domainService = connection.getRepository(DomainEntity);

  const roles = await roleService.find();
  const domains = await domainService.find();

  if (roles.length && domains.length) {
    const domainIndex = Math.floor(Math.random() * (domains.length - 2) + 2);
    const { id: mentorId } = roles.find((r) => r.name === 'mentor');
    const { id: menteeId } = roles.find((r) => r.name === 'mentee');
    const defaults = [
      await genUser('admin', 'admin'),
      await genUser(
        'mentee',
        'mentee',
        menteeId,
        domains.slice(domainIndex, domainIndex + 1),
      ),
      await genUser(
        'mentor',
        'mentor',
        mentorId,
        domains.slice(domainIndex, domainIndex + 2),
      ),
    ];
    const mentors = _.range(1, 3).map(async () => {
      const username = faker.internet.userName();
      const domainIndex = Math.floor(Math.random() * (domains.length - 2) + 2);

      return await genUser(
        username,
        'mentor',
        mentorId,
        domains.slice(domainIndex, domainIndex + 2),
      );
    });
    const mentees = _.range(1, 3).map(async () => {
      const username = faker.internet.userName();
      const domainIndex = Math.floor(Math.random() * (domains.length - 1) + 1);
      return await genUser(
        username,
        'mentee',
        menteeId,
        domains.slice(domainIndex, domainIndex + 1),
      );
    });
    const work = [
      ...defaults,
      ...(await Promise.all(mentors)),
      ...(await Promise.all(mentees)),
    ].map(async (user, index) => {
      //@ts-ignore
      const createdProfile = await profileService.save(user.profile);
      await userService
        //@ts-ignore
        .save({ ...user, profile: createdProfile })
        .then((r) => (console.log(`user ${index} done ->`, r.username), r))
        .catch((e) => console.log(`user ${index} error ->`, e));
    });

    await Promise.all(work);
    return await connection.close();
  }
}
