import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRequest1618823535659 implements MigrationInterface {
    name = 'updateRequest1618823535659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "read" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "permissions"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "permissions"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "roles"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "roles"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "requests"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "requests"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "requests"."title" IS NULL`);
        await queryRunner.query(`ALTER TYPE "public"."statusEnum" RENAME TO "statusEnum_old"`);
        await queryRunner.query(`CREATE TYPE "statusEnum" AS ENUM('created', 'updated', 'accepted', 'refused')`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "status" TYPE "statusEnum" USING "status"::"text"::"statusEnum"`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "status" SET DEFAULT 'created'`);
        await queryRunner.query(`DROP TYPE "statusEnum_old"`);
        await queryRunner.query(`COMMENT ON COLUMN "requests"."status" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "domains"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "domains"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profiles"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profiles"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "subscriptions"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "subscriptions"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "sessions"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "sessions"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "rooms"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "rooms"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "events"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "events"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TYPE "public"."userStatusEnum" RENAME TO "userStatusEnum_old"`);
        await queryRunner.query(`CREATE TYPE "userStatusEnum" AS ENUM('open', 'close', 'away', 'busy')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" TYPE "userStatusEnum" USING "status"::"text"::"userStatusEnum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'close'`);
        await queryRunner.query(`DROP TYPE "userStatusEnum_old"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."status" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "messages"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "messages"."updatedAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "messages"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "messages"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."status" IS NULL`);
        await queryRunner.query(`CREATE TYPE "userStatusEnum_old" AS ENUM()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" TYPE "userStatusEnum_old" USING "status"::"text"::"userStatusEnum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'close'`);
        await queryRunner.query(`DROP TYPE "users_status_enum"`);
        await queryRunner.query(`ALTER TYPE "userStatusEnum_old" RENAME TO  "userStatusEnum"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "events"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "events"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "rooms"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "rooms"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "sessions"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "sessions"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "subscriptions"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "subscriptions"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profiles"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profiles"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "domains"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "domains"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "requests"."status" IS NULL`);
        await queryRunner.query(`CREATE TYPE "statusEnum_old" AS ENUM()`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "status" TYPE "statusEnum_old" USING "status"::"text"::"statusEnum_old"`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "status" SET DEFAULT 'created'`);
        await queryRunner.query(`DROP TYPE "requests_status_enum"`);
        await queryRunner.query(`ALTER TYPE "statusEnum_old" RENAME TO  "statusEnum"`);
        await queryRunner.query(`COMMENT ON COLUMN "requests"."title" IS NULL`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "requests"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "requests"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "roles"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "roles"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "permissions"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "permissions"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "read"`);
    }

}
