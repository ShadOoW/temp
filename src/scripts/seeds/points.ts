import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '@config/config.service';
import { Point } from '@gamification/points/entities/point.entity';

export async function pointsSeed() {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const pointService = connection.getRepository(Point);

  const work = [
    {
      action: 'first:login',
      number: 5,
      message: 'congratulation! your first Points',
      description: 'description of first:login',
      image: '5-image.png',
    },
    {
      action: 'first:request',
      number: 5,
      message: '+5 Points! your first Points',
      description: 'description of first:request',
      image: '5-image.png',
    },
    {
      action: 'recieve:request',
      number: 5,
      message: '+5 Points! your first Points',
      description: 'description of recieve:request',
      image: '5-image.png',
    },
    {
      action: 'first:session',
      number: 5,
      message: '+5 Points! your first Session',
      description: 'description of first:session',
      image: '5-image.png',
    },
    {
      action: 'first:message',
      number: 5,
      message: '+5 Points! your first Points',
      description: 'description of first:message',
      image: '5-image.png',
    },
  ].map((point, index) =>
    pointService
      .save(point)
      .then((r) => (console.log(`point ${index} done ->`, r.action), r))
      .catch(() => console.log(`point ${index} -> error`)),
  );

  await Promise.all(work);
  return await connection.close();
}
