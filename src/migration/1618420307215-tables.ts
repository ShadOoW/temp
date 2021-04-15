import {MigrationInterface, QueryRunner} from "typeorm";

export class tables1618420307215 implements MigrationInterface {
    name = 'tables1618420307215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, "isPrivate" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "text" character varying, "senderId" uuid, "roomId" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms_members_users" ("roomsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_d34b71a644632124e85c1f7ef99" PRIMARY KEY ("roomsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ec1ad921c3649b96b68c057f8b" ON "rooms_members_users" ("roomsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_910ad55fed2e6464ed209c53d4" ON "rooms_members_users" ("usersId") `);
        await queryRunner.query(`COMMENT ON COLUMN "permissions"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "permissions"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "roles"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "roles"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "requests"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "requests"."updatedAt" IS NULL`);
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
        await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TYPE "public"."userStatusEnum" RENAME TO "userStatusEnum_old"`);
        await queryRunner.query(`CREATE TYPE "userStatusEnum" AS ENUM('open', 'close', 'away', 'busy')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" TYPE "userStatusEnum" USING "status"::"text"::"userStatusEnum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'close'`);
        await queryRunner.query(`DROP TYPE "userStatusEnum_old"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."status" IS NULL`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_aaa8a6effc7bd20a1172d3a3bc8" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooms_members_users" ADD CONSTRAINT "FK_ec1ad921c3649b96b68c057f8be" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooms_members_users" ADD CONSTRAINT "FK_910ad55fed2e6464ed209c53d40" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms_members_users" DROP CONSTRAINT "FK_910ad55fed2e6464ed209c53d40"`);
        await queryRunner.query(`ALTER TABLE "rooms_members_users" DROP CONSTRAINT "FK_ec1ad921c3649b96b68c057f8be"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_aaa8a6effc7bd20a1172d3a3bc8"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."status" IS NULL`);
        await queryRunner.query(`CREATE TYPE "userStatusEnum_old" AS ENUM()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" TYPE "userStatusEnum_old" USING "status"::"text"::"userStatusEnum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'close'`);
        await queryRunner.query(`DROP TYPE "users_status_enum"`);
        await queryRunner.query(`ALTER TYPE "userStatusEnum_old" RENAME TO  "userStatusEnum"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
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
        await queryRunner.query(`COMMENT ON COLUMN "requests"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "requests"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "roles"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "roles"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "permissions"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "permissions"."createdAt" IS NULL`);
        await queryRunner.query(`DROP INDEX "IDX_910ad55fed2e6464ed209c53d4"`);
        await queryRunner.query(`DROP INDEX "IDX_ec1ad921c3649b96b68c057f8b"`);
        await queryRunner.query(`DROP TABLE "rooms_members_users"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
    }

}
