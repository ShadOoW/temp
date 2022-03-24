import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '@config/config.service';
import { LanguageEntity } from '@users/languages/entities/language.entity';

export async function languagesSeed() {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const languageService = connection.getRepository(LanguageEntity);

  const work = [
    { name: 'Français' },
    { name: 'Anglais' },
    { name: 'Arabe' },
    { name: 'Allemand' },
    { name: 'Espagnol' },
  ].map((language, index) =>
    languageService
      .save(language)
      .then((r) => (console.log(`language ${index} done ->`, r.name), r))
      .catch(() => console.log(`language ${index} -> error`)),
  );

  await Promise.all(work);
  return await connection.close();
}
