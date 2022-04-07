import { MigrationInterface, QueryRunner } from 'typeorm';

export class profileUpdates1649301746386 implements MigrationInterface {
  name = 'profileUpdates1649301746386';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `profiles` ADD `projectCountry` varchar(300) NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles` ADD `projectRegion` varchar(300) NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles` ADD `projectCity` varchar(300) NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `profiles` DROP COLUMN `projectCity`');
    await queryRunner.query(
      'ALTER TABLE `profiles` DROP COLUMN `projectRegion`',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles` DROP COLUMN `projectCountry`',
    );
  }
}
