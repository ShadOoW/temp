import { MigrationInterface, QueryRunner } from 'typeorm';

export class rolesTable1615897807666 implements MigrationInterface {
  name = 'rolesTable1615897807666';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedBy" character varying(300), "name" character varying(300) NOT NULL, "description" text, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles_permissions_permissions" ("rolesId" uuid NOT NULL, "permissionsId" uuid NOT NULL, CONSTRAINT "PK_b2f4e3f7fbeb7e5b495dd819842" PRIMARY KEY ("rolesId", "permissionsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dc2b9d46195bb3ed28abbf7c9e" ON "roles_permissions_permissions" ("rolesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fd4d5d4c7f7ff16c57549b72c6" ON "roles_permissions_permissions" ("permissionsId") `,
    );
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
    await queryRunner.query(
      `ALTER TABLE "roles_permissions_permissions" ADD CONSTRAINT "FK_dc2b9d46195bb3ed28abbf7c9e3" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_permissions_permissions" ADD CONSTRAINT "FK_fd4d5d4c7f7ff16c57549b72c6f" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles_permissions_permissions" DROP CONSTRAINT "FK_fd4d5d4c7f7ff16c57549b72c6f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_permissions_permissions" DROP CONSTRAINT "FK_dc2b9d46195bb3ed28abbf7c9e3"`,
    );
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
    await queryRunner.query(`DROP INDEX "IDX_fd4d5d4c7f7ff16c57549b72c6"`);
    await queryRunner.query(`DROP INDEX "IDX_dc2b9d46195bb3ed28abbf7c9e"`);
    await queryRunner.query(`DROP TABLE "roles_permissions_permissions"`);
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}
