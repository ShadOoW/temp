import { MigrationInterface, QueryRunner } from 'typeorm';

export class userRoleTable1615977198878 implements MigrationInterface {
  name = 'userRoleTable1615977198878';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "roleId" uuid`);
    await queryRunner.query(`COMMENT ON COLUMN "items"."createdAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "items"."updatedAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "items"."isPublished" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "items" ALTER COLUMN "isPublished" SET DEFAULT false`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "permissions"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "permissions"."updatedAt" IS NULL`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "users"."updatedAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "roles"."createdAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "roles"."updatedAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "roles"."updatedAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "roles"."createdAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "users"."updatedAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
    await queryRunner.query(
      `COMMENT ON COLUMN "permissions"."updatedAt" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "permissions"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ALTER COLUMN "isPublished" SET DEFAULT false`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "items"."isPublished" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "items"."updatedAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "items"."createdAt" IS NULL`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roleId"`);
  }
}
