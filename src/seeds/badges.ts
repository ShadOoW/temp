import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../config/config.service';
import { BadgesService } from '../badges/badges.service';
import { Badge } from '../badges/entities/badge.entity';

export async function badgesSeed() {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const badgeService = new BadgesService(connection.getRepository(Badge));

  const work = [
    {
      name: 'Rocket Lanch',
      points: 70,
      description: 'Your first Mentee',
    },
    {
      name: 'Nice Start',
      points: 10,
      description: 'inscription and send first messages',
    },
    {
      name: 'Campfire',
      points: 50,
      description: 'Session over 2 hours',
    },
    {
      name: 'World Citizen',
      points: 100,
      description: 'connect from 3 different countries',
    },
  ].map((badge, index) =>
    badgeService
      .create(badge)
      .then((r) => (console.log(`badge ${index} done ->`, r.name), r))
      .catch(() => console.log(`badge ${index} -> error`)),
  );

  await Promise.all(work);
  return await connection.close();
}
