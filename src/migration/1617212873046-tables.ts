import { MigrationInterface, QueryRunner } from 'typeorm';

export class tables1617212873046 implements MigrationInterface {
  name = 'tables1617212873046';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "statusEnum" AS ENUM('created', 'updated', 'deleted', 'accepted', 'refused')`,
    );
    await queryRunner.query(
      `CREATE TABLE "requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "title" character varying(300) NOT NULL, "excerpt" text NOT NULL, "description" text NOT NULL, "status" "statusEnum" NOT NULL DEFAULT 'created', "toId" uuid, "fromId" uuid, CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "updatedBy"`);
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP COLUMN "createdBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP COLUMN "updatedBy"`,
    );
    await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "updatedBy"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedBy"`);
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
    await queryRunner.query(`COMMENT ON COLUMN "roles"."createdAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "roles"."updatedAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "users"."updatedAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_d633ba2c5aef5c3c6018af9e445" UNIQUE ("email", "username", "phone")`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_204395543f86d4afa5793a0af4c" FOREIGN KEY ("toId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_1fa5d0e3dd094bfc0fab02dfe68" FOREIGN KEY ("fromId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "FK_1fa5d0e3dd094bfc0fab02dfe68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "FK_204395543f86d4afa5793a0af4c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_d633ba2c5aef5c3c6018af9e445"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "users"."updatedAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "roles"."updatedAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "roles"."createdAt" IS NULL`);
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
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updatedBy" character varying(300)`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "createdBy" character varying(300)`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD "updatedBy" character varying(300)`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD "createdBy" character varying(300)`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD "updatedBy" character varying(300)`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD "createdBy" character varying(300)`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD "updatedBy" character varying(300)`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD "createdBy" character varying(300)`,
    );
    await queryRunner.query(`DROP TABLE "requests"`);
    await queryRunner.query(`DROP TYPE "statusEnum"`);
  }
}
