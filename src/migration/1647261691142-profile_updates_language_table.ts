import { MigrationInterface, QueryRunner } from 'typeorm';

export class profileUpdatesLanguageTable1647261691142
  implements MigrationInterface {
  name = 'profileUpdatesLanguageTable1647261691142';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `profiles` DROP FOREIGN KEY `FK_60489e3af3eae82e88657c36831`',
    );
    await queryRunner.query(
      'CREATE TABLE `languages` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(300) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `profiles_domain_expertise_domains` (`profilesId` varchar(36) NOT NULL, `domainsId` varchar(36) NOT NULL, INDEX `IDX_561147f9b066fe14bf73e9d6ca` (`profilesId`), INDEX `IDX_b5d05e1959da01bd19f6df296b` (`domainsId`), PRIMARY KEY (`profilesId`, `domainsId`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `profiles_wanted_domains_domains` (`profilesId` varchar(36) NOT NULL, `domainsId` varchar(36) NOT NULL, INDEX `IDX_6bb0264477e3fe86ef7a7ca282` (`profilesId`), INDEX `IDX_5420bef3808cfd5267c27e8d48` (`domainsId`), PRIMARY KEY (`profilesId`, `domainsId`)) ENGINE=InnoDB',
    );
    await queryRunner.query('ALTER TABLE `domains` DROP COLUMN `description`');
    await queryRunner.query(
      'ALTER TABLE `profiles` DROP COLUMN `domainExpertise`',
    );
    await queryRunner.query('ALTER TABLE `profiles` DROP COLUMN `sector`');
    await queryRunner.query(
      'ALTER TABLE `profiles` DROP COLUMN `wantedDomainId`',
    );
    await queryRunner.query(
      'ALTER TABLE `domains` ADD `type` varchar(300) NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `domains` ADD `parent` varchar(300) NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles` ADD `geoZone` varchar(300) NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles` ADD `projectType` varchar(300) NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles` ADD `spokenLanguages` text NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles` ADD `sectorId` varchar(36) NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `sessions` CHANGE `startDate` `startDate` timestamp NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `objectifs` CHANGE `dueDate` `dueDate` timestamp NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles` ADD CONSTRAINT `FK_9b15f29bb0cc798de5f1fb98d3c` FOREIGN KEY (`sectorId`) REFERENCES `domains`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles_domain_expertise_domains` ADD CONSTRAINT `FK_561147f9b066fe14bf73e9d6ca6` FOREIGN KEY (`profilesId`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles_domain_expertise_domains` ADD CONSTRAINT `FK_b5d05e1959da01bd19f6df296b1` FOREIGN KEY (`domainsId`) REFERENCES `domains`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles_wanted_domains_domains` ADD CONSTRAINT `FK_6bb0264477e3fe86ef7a7ca2822` FOREIGN KEY (`profilesId`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles_wanted_domains_domains` ADD CONSTRAINT `FK_5420bef3808cfd5267c27e8d48a` FOREIGN KEY (`domainsId`) REFERENCES `domains`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `profiles_wanted_domains_domains` DROP FOREIGN KEY `FK_5420bef3808cfd5267c27e8d48a`',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles_wanted_domains_domains` DROP FOREIGN KEY `FK_6bb0264477e3fe86ef7a7ca2822`',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles_domain_expertise_domains` DROP FOREIGN KEY `FK_b5d05e1959da01bd19f6df296b1`',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles_domain_expertise_domains` DROP FOREIGN KEY `FK_561147f9b066fe14bf73e9d6ca6`',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles` DROP FOREIGN KEY `FK_9b15f29bb0cc798de5f1fb98d3c`',
    );
    await queryRunner.query(
      "ALTER TABLE `objectifs` CHANGE `dueDate` `dueDate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'",
    );
    await queryRunner.query(
      "ALTER TABLE `sessions` CHANGE `startDate` `startDate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'",
    );
    await queryRunner.query('ALTER TABLE `profiles` DROP COLUMN `sectorId`');
    await queryRunner.query(
      'ALTER TABLE `profiles` DROP COLUMN `spokenLanguages`',
    );
    await queryRunner.query('ALTER TABLE `profiles` DROP COLUMN `projectType`');
    await queryRunner.query('ALTER TABLE `profiles` DROP COLUMN `geoZone`');
    await queryRunner.query('ALTER TABLE `domains` DROP COLUMN `parent`');
    await queryRunner.query('ALTER TABLE `domains` DROP COLUMN `type`');
    await queryRunner.query(
      'ALTER TABLE `profiles` ADD `wantedDomainId` varchar(36) NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles` ADD `sector` varchar(300) NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `profiles` ADD `domainExpertise` text NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `domains` ADD `description` text NULL',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_5420bef3808cfd5267c27e8d48` ON `profiles_wanted_domains_domains`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_6bb0264477e3fe86ef7a7ca282` ON `profiles_wanted_domains_domains`',
    );
    await queryRunner.query('DROP TABLE `profiles_wanted_domains_domains`');
    await queryRunner.query(
      'DROP INDEX `IDX_b5d05e1959da01bd19f6df296b` ON `profiles_domain_expertise_domains`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_561147f9b066fe14bf73e9d6ca` ON `profiles_domain_expertise_domains`',
    );
    await queryRunner.query('DROP TABLE `profiles_domain_expertise_domains`');
    await queryRunner.query('DROP TABLE `languages`');
    await queryRunner.query(
      'ALTER TABLE `profiles` ADD CONSTRAINT `FK_60489e3af3eae82e88657c36831` FOREIGN KEY (`wantedDomainId`) REFERENCES `domains`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
