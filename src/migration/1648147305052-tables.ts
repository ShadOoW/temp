import {MigrationInterface, QueryRunner} from "typeorm";

export class tables1648147305052 implements MigrationInterface {
    name = 'tables1648147305052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `sessions` CHANGE `startDate` `startDate` timestamp NOT NULL");
        await queryRunner.query("ALTER TABLE `objectifs` CHANGE `dueDate` `dueDate` timestamp NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `objectifs` CHANGE `dueDate` `dueDate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'");
        await queryRunner.query("ALTER TABLE `sessions` CHANGE `startDate` `startDate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'");
    }

}
