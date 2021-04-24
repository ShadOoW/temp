import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '@config/config.service';
import { BadgesService } from '@gamification/badges/badges.service';
import { Badge } from '@gamification/badges/entities/badge.entity';
import { PointsService } from '@gamification/points/points.service';
import { Point } from '@gamification/points/entities/point.entity';

export async function badgesSeed() {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const badgeService = new BadgesService(connection.getRepository(Badge));
  const pointService = new PointsService(connection.getRepository(Point));
  const { points } = await pointService.findAll({});
  if (points.length && points.length > 4) {
    const work = [
      {
        name: 'Rocket Lanch',
        description: 'Your first Mentee',
        points: points.slice(0, 2),
      },
      {
        name: 'Nice Start',
        description: 'inscription and send first messages',
        points: points.slice(2, 4),
      },
      {
        name: 'Campfire',
        description: 'Session over 2 hours',
        points: points.slice(0, 1),
      },
      {
        name: 'World Citizen',
        description: 'connect from 3 different countries',
        points: points.slice(1, 3),
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
}
