import {MigrationInterface, QueryRunner} from "typeorm";

export class tales1617730144890 implements MigrationInterface {
    name = 'tales1617730144890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "items"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "items"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "items"."isPublished" IS NULL`);
        await queryRunner.query(`ALTER TABLE "items" ALTER COLUMN "isPublished" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "permissions"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "permissions"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profiles"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profiles"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "roles"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "roles"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "subscriptions"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "subscriptions"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "sessions"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "sessions"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "requests"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "requests"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "requests"."description" IS NULL`);
        await queryRunner.query(`ALTER TYPE "public"."statusEnum" RENAME TO "statusEnum_old"`);
        await queryRunner.query(`CREATE TYPE "statusEnum" AS ENUM('created', 'updated', 'deleted', 'accepted', 'refused')`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "status" TYPE "statusEnum" USING "status"::"text"::"statusEnum"`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "status" SET DEFAULT 'created'`);
        await queryRunner.query(`DROP TYPE "statusEnum_old"`);
        await queryRunner.query(`COMMENT ON COLUMN "requests"."status" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "requests"."status" IS NULL`);
        await queryRunner.query(`CREATE TYPE "statusEnum_old" AS ENUM()`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "status" TYPE "statusEnum_old" USING "status"::"text"::"statusEnum_old"`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "status" SET DEFAULT 'created'`);
        await queryRunner.query(`DROP TYPE "requests_status_enum"`);
        await queryRunner.query(`ALTER TYPE "statusEnum_old" RENAME TO  "statusEnum"`);
        await queryRunner.query(`COMMENT ON COLUMN "requests"."description" IS NULL`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "requests"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "requests"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "sessions"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "sessions"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "subscriptions"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "subscriptions"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "roles"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "roles"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profiles"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profiles"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "permissions"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "permissions"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "items" ALTER COLUMN "isPublished" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "items"."isPublished" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "items"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "items"."createdAt" IS NULL`);
    }

}
