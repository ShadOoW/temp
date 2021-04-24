import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '@config/config.service';
import { DomainsService } from '@users/domains/domains.service';
import { Domain } from '@users/domains/entities/domain.entity';

export async function domainsSeed() {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const domainService = new DomainsService(connection.getRepository(Domain));

  const work = [
    // Domain domains
    {
      name: 'Social media manager',
      description: 'Social media manager description',
    },
    {
      name: 'Public relations manager',
      description: 'Public relations manager description',
    },
    {
      name: 'Appraiser',
      description: 'Appraiser description',
    },
    {
      name: 'Financial advisor',
      description: 'Financial advisor description',
    },
    {
      name: 'Marketing manager',
      description: 'Marketing manager description',
    },
    // Role domains
    {
      name: 'Web developer',
      description: 'Web developer description',
    },
    {
      name: 'Sales manager',
      description: 'Sales manager description',
    },
    {
      name: 'Systems analyst',
      description: 'Systems analyst description',
    },
    {
      name: 'Management analyst',
      description: 'Management analyst description',
    },
  ].map((domain, index) =>
    domainService
      .create(domain)
      .then((r) => (console.log(`domain ${index} done ->`, r.name), r))
      .catch(() => console.log(`domain ${index} -> error`)),
  );

  await Promise.all(work);
  return await connection.close();
}
