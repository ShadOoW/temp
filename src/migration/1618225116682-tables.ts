import {MigrationInterface, QueryRunner} from "typeorm";

export class tables1618225116682 implements MigrationInterface {
    name = 'tables1618225116682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "domains" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying(300) NOT NULL, "description" text, CONSTRAINT "PK_05a6b087662191c2ea7f7ddfc4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying(300) NOT NULL, "description" text, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "firstName" character varying(300) NOT NULL, "lastName" character varying(300), "picture" character varying(300), "phoneNumber" character varying(300), "city" character varying(300), "company" character varying(300), "website" character varying(300), "linkedin" character varying(300), "country" character varying(300), "yearsOfExperience" integer, "coachingType" character varying(300), "canOffer" text, "professionalBg" text, "hoursPerMonth" integer, "currentPost" character varying(300), "sector" character varying(300), "whyNeedCoaching" text, "selfDescription" text, "domainExpertiseId" uuid, "wantedDomainId" uuid, CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying(300) NOT NULL, "description" text, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "subscriberId" uuid, "subscribedToId" uuid, CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "title" character varying(300) NOT NULL, "description" text, "videoConference" boolean NOT NULL DEFAULT false, "menteeId" uuid, "mentorId" uuid, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "userStatusEnum" AS ENUM('open', 'close', 'away', 'busy')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "email" character varying(300) NOT NULL, "username" character varying(300), "password" character varying(300), "active" boolean NOT NULL DEFAULT false, "status" "userStatusEnum" NOT NULL DEFAULT 'close', "provider" character varying(300) NOT NULL DEFAULT 'local', "providerId" character varying(300), "isAdmin" boolean NOT NULL DEFAULT false, "roleId" uuid, "profileId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_b1bda35cdb9a2c1b777f5541d8" UNIQUE ("profileId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "statusEnum" AS ENUM('created', 'updated', 'accepted', 'refused')`);
        await queryRunner.query(`CREATE TABLE "requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "title" character varying(300) NOT NULL, "excerpt" text NOT NULL, "description" text, "status" "statusEnum" NOT NULL DEFAULT 'created', "toId" uuid, "fromId" uuid, CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profiles_coaching_domains_domains" ("profilesId" uuid NOT NULL, "domainsId" uuid NOT NULL, CONSTRAINT "PK_624be760065e3e1be60045c48d2" PRIMARY KEY ("profilesId", "domainsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9e3e60b64044f20a34389e83fc" ON "profiles_coaching_domains_domains" ("profilesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9e26ae7caabb0220ff90fab373" ON "profiles_coaching_domains_domains" ("domainsId") `);
        await queryRunner.query(`CREATE TABLE "roles_permissions_permissions" ("rolesId" uuid NOT NULL, "permissionsId" uuid NOT NULL, CONSTRAINT "PK_b2f4e3f7fbeb7e5b495dd819842" PRIMARY KEY ("rolesId", "permissionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dc2b9d46195bb3ed28abbf7c9e" ON "roles_permissions_permissions" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fd4d5d4c7f7ff16c57549b72c6" ON "roles_permissions_permissions" ("permissionsId") `);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_5bbb99f7c8f0281a931db8adb5a" FOREIGN KEY ("domainExpertiseId") REFERENCES "domains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_60489e3af3eae82e88657c36831" FOREIGN KEY ("wantedDomainId") REFERENCES "domains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_61d51ff73ec5afd7dc7c6c84309" FOREIGN KEY ("subscriberId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_3fe50bc4f9ee56dc43c5cd067a5" FOREIGN KEY ("subscribedToId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_1a09be7df392bc2ec36e85877cf" FOREIGN KEY ("menteeId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_76a16e188d03d5321aa0e0d60c3" FOREIGN KEY ("mentorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_204395543f86d4afa5793a0af4c" FOREIGN KEY ("toId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_1fa5d0e3dd094bfc0fab02dfe68" FOREIGN KEY ("fromId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles_coaching_domains_domains" ADD CONSTRAINT "FK_9e3e60b64044f20a34389e83fca" FOREIGN KEY ("profilesId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles_coaching_domains_domains" ADD CONSTRAINT "FK_9e26ae7caabb0220ff90fab373d" FOREIGN KEY ("domainsId") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_permissions_permissions" ADD CONSTRAINT "FK_dc2b9d46195bb3ed28abbf7c9e3" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_permissions_permissions" ADD CONSTRAINT "FK_fd4d5d4c7f7ff16c57549b72c6f" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles_permissions_permissions" DROP CONSTRAINT "FK_fd4d5d4c7f7ff16c57549b72c6f"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions_permissions" DROP CONSTRAINT "FK_dc2b9d46195bb3ed28abbf7c9e3"`);
        await queryRunner.query(`ALTER TABLE "profiles_coaching_domains_domains" DROP CONSTRAINT "FK_9e26ae7caabb0220ff90fab373d"`);
        await queryRunner.query(`ALTER TABLE "profiles_coaching_domains_domains" DROP CONSTRAINT "FK_9e3e60b64044f20a34389e83fca"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_1fa5d0e3dd094bfc0fab02dfe68"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_204395543f86d4afa5793a0af4c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_76a16e188d03d5321aa0e0d60c3"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_1a09be7df392bc2ec36e85877cf"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_3fe50bc4f9ee56dc43c5cd067a5"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_61d51ff73ec5afd7dc7c6c84309"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_60489e3af3eae82e88657c36831"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_5bbb99f7c8f0281a931db8adb5a"`);
        await queryRunner.query(`DROP INDEX "IDX_fd4d5d4c7f7ff16c57549b72c6"`);
        await queryRunner.query(`DROP INDEX "IDX_dc2b9d46195bb3ed28abbf7c9e"`);
        await queryRunner.query(`DROP TABLE "roles_permissions_permissions"`);
        await queryRunner.query(`DROP INDEX "IDX_9e26ae7caabb0220ff90fab373"`);
        await queryRunner.query(`DROP INDEX "IDX_9e3e60b64044f20a34389e83fc"`);
        await queryRunner.query(`DROP TABLE "profiles_coaching_domains_domains"`);
        await queryRunner.query(`DROP TABLE "requests"`);
        await queryRunner.query(`DROP TYPE "statusEnum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "userStatusEnum"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "subscriptions"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "domains"`);
    }

}
