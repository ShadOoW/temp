import {MigrationInterface, QueryRunner} from "typeorm";

export class deletedAtUpdate1654037590259 implements MigrationInterface {
    name = 'deletedAtUpdate1654037590259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `permissions` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `roles` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `profiles` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `domains` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `requests` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `subscriptions` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `sessions` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `messages` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `rooms` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `events` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `badges` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `points` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `balances` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `quizSolutions` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `quizzes` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `objectifs` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `users` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `files` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `file_tags` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `languages` ADD `deletedAt` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `sessions` CHANGE `startDate` `startDate` timestamp NOT NULL");
        await queryRunner.query("ALTER TABLE `objectifs` CHANGE `dueDate` `dueDate` timestamp NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `objectifs` CHANGE `dueDate` `dueDate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'");
        await queryRunner.query("ALTER TABLE `sessions` CHANGE `startDate` `startDate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'");
        await queryRunner.query("ALTER TABLE `languages` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `file_tags` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `files` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `objectifs` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `quizzes` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `quizSolutions` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `balances` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `points` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `badges` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `events` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `rooms` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `messages` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `sessions` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `subscriptions` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `requests` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `domains` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `profiles` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `roles` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `permissions` DROP COLUMN `deletedAt`");
    }

}
