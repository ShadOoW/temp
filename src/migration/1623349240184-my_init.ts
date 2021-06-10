import {MigrationInterface, QueryRunner} from "typeorm";

export class myInit1623349240184 implements MigrationInterface {
    name = 'myInit1623349240184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `permissions` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(300) NOT NULL, `description` text NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `roles` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(300) NOT NULL, `description` text NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `domains` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(300) NOT NULL, `description` text NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `profiles` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `firstName` varchar(300) NOT NULL, `lastName` varchar(300) NULL, `picture` varchar(300) NULL, `phoneNumber` varchar(300) NULL, `city` varchar(300) NULL, `company` varchar(300) NULL, `website` varchar(300) NULL, `linkedin` varchar(300) NULL, `facebook` varchar(300) NULL, `twitter` varchar(300) NULL, `country` varchar(300) NULL, `yearsOfExperience` int NULL, `domainExpertise` text NULL, `coachingType` varchar(300) NULL, `canOffer` text NULL, `professionalBg` text NULL, `hoursPerMonth` varchar(300) NULL, `currentPost` varchar(300) NULL, `sector` varchar(300) NULL, `whyNeedCoaching` text NULL, `selfDescription` text NULL, `wantedDomainId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `requests` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `title` varchar(255) NULL, `excerpt` text NULL, `description` text NULL, `proposition` tinyint NULL DEFAULT 0, `status` enum ('created', 'updated', 'accepted', 'refused') NOT NULL DEFAULT 'created', `toId` varchar(36) NULL, `fromId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `subscriptions` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `subscriberId` varchar(36) NULL, `subscribedToId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sessions` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `startDate` timestamp NOT NULL, `title` varchar(300) NOT NULL, `description` text NULL, `isVideoCall` tinyint NOT NULL DEFAULT 0, `isFromMentor` tinyint NOT NULL DEFAULT 0, `status` enum ('created', 'updated', 'accepted', 'refused', 'activated', 'done') NOT NULL DEFAULT 'created', `duration` int NOT NULL DEFAULT '0', `menteeId` varchar(36) NULL, `mentorId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `messages` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `text` varchar(255) NULL, `senderId` varchar(36) NULL, `roomId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `rooms` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `isPrivate` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `events` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `module` varchar(300) NOT NULL, `command` varchar(300) NOT NULL, `sourceId` varchar(300) NOT NULL, `payload` text NULL, `read` tinyint NOT NULL DEFAULT 0, `fromId` varchar(36) NULL, `toId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `badges` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(300) NOT NULL, `message` text NULL, `description` text NULL, `image` varchar(300) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `points` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `number` int NOT NULL, `action` varchar(300) NOT NULL, `message` text NULL, `description` text NULL, `image` varchar(300) NULL, `balanceId` varchar(36) NULL, `badgeId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `balances` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `score` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `quizSolutions` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `title` varchar(300) NULL, `answers` text NULL, `quizId` varchar(36) NULL, `mentorId` varchar(36) NULL, `menteeId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `quizzes` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `title` varchar(300) NOT NULL, `questions` text NULL, `mentorId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `objectifs` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `dueDate` timestamp NOT NULL, `title` varchar(300) NOT NULL, `type` varchar(300) NOT NULL, `progression` int NULL DEFAULT '0', `menteeId` varchar(36) NULL, `mentorId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `email` varchar(300) NOT NULL, `username` varchar(300) NULL, `password` varchar(300) NULL, `active` tinyint NOT NULL DEFAULT 0, `status` enum ('open', 'close', 'away', 'busy') NOT NULL DEFAULT 'open', `provider` varchar(300) NOT NULL DEFAULT 'local', `providerId` varchar(300) NULL, `isAdmin` tinyint NOT NULL DEFAULT 0, `roleId` varchar(36) NULL, `profileId` varchar(36) NULL, `balanceId` varchar(36) NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), UNIQUE INDEX `REL_b1bda35cdb9a2c1b777f5541d8` (`profileId`), UNIQUE INDEX `REL_ee0e324a6ec4891a73f04f5f77` (`balanceId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `files` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(300) NOT NULL, `type` varchar(300) NOT NULL, `link` varchar(300) NOT NULL, `status` enum ('created', 'updated', 'deleted', 'shared') NOT NULL DEFAULT 'created', `userId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `file_tags` (`id` varchar(36) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(300) NOT NULL, `color` varchar(300) NOT NULL DEFAULT '#333333', `userId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `roles_permissions_permissions` (`rolesId` varchar(36) NOT NULL, `permissionsId` varchar(36) NOT NULL, INDEX `IDX_dc2b9d46195bb3ed28abbf7c9e` (`rolesId`), INDEX `IDX_fd4d5d4c7f7ff16c57549b72c6` (`permissionsId`), PRIMARY KEY (`rolesId`, `permissionsId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `profiles_coaching_domains_domains` (`profilesId` varchar(36) NOT NULL, `domainsId` varchar(36) NOT NULL, INDEX `IDX_9e3e60b64044f20a34389e83fc` (`profilesId`), INDEX `IDX_9e26ae7caabb0220ff90fab373` (`domainsId`), PRIMARY KEY (`profilesId`, `domainsId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `rooms_members_users` (`roomsId` varchar(36) NOT NULL, `usersId` varchar(36) NOT NULL, INDEX `IDX_ec1ad921c3649b96b68c057f8b` (`roomsId`), INDEX `IDX_910ad55fed2e6464ed209c53d4` (`usersId`), PRIMARY KEY (`roomsId`, `usersId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `quizzes_mentees_users` (`quizzesId` varchar(36) NOT NULL, `usersId` varchar(36) NOT NULL, INDEX `IDX_75ba190821305b3a57c6149958` (`quizzesId`), INDEX `IDX_fdb536ceaece13e7abaea702ae` (`usersId`), PRIMARY KEY (`quizzesId`, `usersId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `files_tags_file_tags` (`filesId` varchar(36) NOT NULL, `fileTagsId` varchar(36) NOT NULL, INDEX `IDX_c37b741a156f3d36c3345db17a` (`filesId`), INDEX `IDX_fd411266a536255fb55c552655` (`fileTagsId`), PRIMARY KEY (`filesId`, `fileTagsId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `files_shared_with_users` (`filesId` varchar(36) NOT NULL, `usersId` varchar(36) NOT NULL, INDEX `IDX_b4b62af6d21040c78af564bf03` (`filesId`), INDEX `IDX_e569e060bab13393c0cde4237e` (`usersId`), PRIMARY KEY (`filesId`, `usersId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `profiles` ADD CONSTRAINT `FK_60489e3af3eae82e88657c36831` FOREIGN KEY (`wantedDomainId`) REFERENCES `domains`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `requests` ADD CONSTRAINT `FK_204395543f86d4afa5793a0af4c` FOREIGN KEY (`toId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `requests` ADD CONSTRAINT `FK_1fa5d0e3dd094bfc0fab02dfe68` FOREIGN KEY (`fromId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `subscriptions` ADD CONSTRAINT `FK_61d51ff73ec5afd7dc7c6c84309` FOREIGN KEY (`subscriberId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `subscriptions` ADD CONSTRAINT `FK_3fe50bc4f9ee56dc43c5cd067a5` FOREIGN KEY (`subscribedToId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `sessions` ADD CONSTRAINT `FK_1a09be7df392bc2ec36e85877cf` FOREIGN KEY (`menteeId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `sessions` ADD CONSTRAINT `FK_76a16e188d03d5321aa0e0d60c3` FOREIGN KEY (`mentorId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `messages` ADD CONSTRAINT `FK_2db9cf2b3ca111742793f6c37ce` FOREIGN KEY (`senderId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `messages` ADD CONSTRAINT `FK_aaa8a6effc7bd20a1172d3a3bc8` FOREIGN KEY (`roomId`) REFERENCES `rooms`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `events` ADD CONSTRAINT `FK_40840aa42c843f02dfe91cf01d7` FOREIGN KEY (`fromId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `events` ADD CONSTRAINT `FK_e94e3646540cf678e49ad37d6a0` FOREIGN KEY (`toId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `points` ADD CONSTRAINT `FK_b14f0969d4e56dff5dac6a58cdf` FOREIGN KEY (`balanceId`) REFERENCES `balances`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `points` ADD CONSTRAINT `FK_278396d738790d67859eb457f76` FOREIGN KEY (`badgeId`) REFERENCES `badges`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `quizSolutions` ADD CONSTRAINT `FK_dd157383578b50a710364f75e05` FOREIGN KEY (`quizId`) REFERENCES `quizzes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `quizSolutions` ADD CONSTRAINT `FK_147ecf27e37222ea2efd02ee571` FOREIGN KEY (`mentorId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `quizSolutions` ADD CONSTRAINT `FK_7e79755e31b19b855ca0dd086f4` FOREIGN KEY (`menteeId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `quizzes` ADD CONSTRAINT `FK_0f4df28a4d98ad3ce55054b0fde` FOREIGN KEY (`mentorId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `objectifs` ADD CONSTRAINT `FK_0080e03e9e5e34bdc9ae1cf9cac` FOREIGN KEY (`menteeId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `objectifs` ADD CONSTRAINT `FK_7eeae9b017a7dcf33108ebbaf4f` FOREIGN KEY (`mentorId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_368e146b785b574f42ae9e53d5e` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_b1bda35cdb9a2c1b777f5541d87` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_ee0e324a6ec4891a73f04f5f77c` FOREIGN KEY (`balanceId`) REFERENCES `balances`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `files` ADD CONSTRAINT `FK_7e7425b17f9e707331e9a6c7335` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `file_tags` ADD CONSTRAINT `FK_bf15a7dac3ee71348fd630d7823` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `roles_permissions_permissions` ADD CONSTRAINT `FK_dc2b9d46195bb3ed28abbf7c9e3` FOREIGN KEY (`rolesId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `roles_permissions_permissions` ADD CONSTRAINT `FK_fd4d5d4c7f7ff16c57549b72c6f` FOREIGN KEY (`permissionsId`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `profiles_coaching_domains_domains` ADD CONSTRAINT `FK_9e3e60b64044f20a34389e83fca` FOREIGN KEY (`profilesId`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `profiles_coaching_domains_domains` ADD CONSTRAINT `FK_9e26ae7caabb0220ff90fab373d` FOREIGN KEY (`domainsId`) REFERENCES `domains`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `rooms_members_users` ADD CONSTRAINT `FK_ec1ad921c3649b96b68c057f8be` FOREIGN KEY (`roomsId`) REFERENCES `rooms`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `rooms_members_users` ADD CONSTRAINT `FK_910ad55fed2e6464ed209c53d40` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `quizzes_mentees_users` ADD CONSTRAINT `FK_75ba190821305b3a57c61499585` FOREIGN KEY (`quizzesId`) REFERENCES `quizzes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `quizzes_mentees_users` ADD CONSTRAINT `FK_fdb536ceaece13e7abaea702aec` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `files_tags_file_tags` ADD CONSTRAINT `FK_c37b741a156f3d36c3345db17a8` FOREIGN KEY (`filesId`) REFERENCES `files`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `files_tags_file_tags` ADD CONSTRAINT `FK_fd411266a536255fb55c5526553` FOREIGN KEY (`fileTagsId`) REFERENCES `file_tags`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `files_shared_with_users` ADD CONSTRAINT `FK_b4b62af6d21040c78af564bf03f` FOREIGN KEY (`filesId`) REFERENCES `files`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `files_shared_with_users` ADD CONSTRAINT `FK_e569e060bab13393c0cde4237e0` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `files_shared_with_users` DROP FOREIGN KEY `FK_e569e060bab13393c0cde4237e0`");
        await queryRunner.query("ALTER TABLE `files_shared_with_users` DROP FOREIGN KEY `FK_b4b62af6d21040c78af564bf03f`");
        await queryRunner.query("ALTER TABLE `files_tags_file_tags` DROP FOREIGN KEY `FK_fd411266a536255fb55c5526553`");
        await queryRunner.query("ALTER TABLE `files_tags_file_tags` DROP FOREIGN KEY `FK_c37b741a156f3d36c3345db17a8`");
        await queryRunner.query("ALTER TABLE `quizzes_mentees_users` DROP FOREIGN KEY `FK_fdb536ceaece13e7abaea702aec`");
        await queryRunner.query("ALTER TABLE `quizzes_mentees_users` DROP FOREIGN KEY `FK_75ba190821305b3a57c61499585`");
        await queryRunner.query("ALTER TABLE `rooms_members_users` DROP FOREIGN KEY `FK_910ad55fed2e6464ed209c53d40`");
        await queryRunner.query("ALTER TABLE `rooms_members_users` DROP FOREIGN KEY `FK_ec1ad921c3649b96b68c057f8be`");
        await queryRunner.query("ALTER TABLE `profiles_coaching_domains_domains` DROP FOREIGN KEY `FK_9e26ae7caabb0220ff90fab373d`");
        await queryRunner.query("ALTER TABLE `profiles_coaching_domains_domains` DROP FOREIGN KEY `FK_9e3e60b64044f20a34389e83fca`");
        await queryRunner.query("ALTER TABLE `roles_permissions_permissions` DROP FOREIGN KEY `FK_fd4d5d4c7f7ff16c57549b72c6f`");
        await queryRunner.query("ALTER TABLE `roles_permissions_permissions` DROP FOREIGN KEY `FK_dc2b9d46195bb3ed28abbf7c9e3`");
        await queryRunner.query("ALTER TABLE `file_tags` DROP FOREIGN KEY `FK_bf15a7dac3ee71348fd630d7823`");
        await queryRunner.query("ALTER TABLE `files` DROP FOREIGN KEY `FK_7e7425b17f9e707331e9a6c7335`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_ee0e324a6ec4891a73f04f5f77c`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_b1bda35cdb9a2c1b777f5541d87`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_368e146b785b574f42ae9e53d5e`");
        await queryRunner.query("ALTER TABLE `objectifs` DROP FOREIGN KEY `FK_7eeae9b017a7dcf33108ebbaf4f`");
        await queryRunner.query("ALTER TABLE `objectifs` DROP FOREIGN KEY `FK_0080e03e9e5e34bdc9ae1cf9cac`");
        await queryRunner.query("ALTER TABLE `quizzes` DROP FOREIGN KEY `FK_0f4df28a4d98ad3ce55054b0fde`");
        await queryRunner.query("ALTER TABLE `quizSolutions` DROP FOREIGN KEY `FK_7e79755e31b19b855ca0dd086f4`");
        await queryRunner.query("ALTER TABLE `quizSolutions` DROP FOREIGN KEY `FK_147ecf27e37222ea2efd02ee571`");
        await queryRunner.query("ALTER TABLE `quizSolutions` DROP FOREIGN KEY `FK_dd157383578b50a710364f75e05`");
        await queryRunner.query("ALTER TABLE `points` DROP FOREIGN KEY `FK_278396d738790d67859eb457f76`");
        await queryRunner.query("ALTER TABLE `points` DROP FOREIGN KEY `FK_b14f0969d4e56dff5dac6a58cdf`");
        await queryRunner.query("ALTER TABLE `events` DROP FOREIGN KEY `FK_e94e3646540cf678e49ad37d6a0`");
        await queryRunner.query("ALTER TABLE `events` DROP FOREIGN KEY `FK_40840aa42c843f02dfe91cf01d7`");
        await queryRunner.query("ALTER TABLE `messages` DROP FOREIGN KEY `FK_aaa8a6effc7bd20a1172d3a3bc8`");
        await queryRunner.query("ALTER TABLE `messages` DROP FOREIGN KEY `FK_2db9cf2b3ca111742793f6c37ce`");
        await queryRunner.query("ALTER TABLE `sessions` DROP FOREIGN KEY `FK_76a16e188d03d5321aa0e0d60c3`");
        await queryRunner.query("ALTER TABLE `sessions` DROP FOREIGN KEY `FK_1a09be7df392bc2ec36e85877cf`");
        await queryRunner.query("ALTER TABLE `subscriptions` DROP FOREIGN KEY `FK_3fe50bc4f9ee56dc43c5cd067a5`");
        await queryRunner.query("ALTER TABLE `subscriptions` DROP FOREIGN KEY `FK_61d51ff73ec5afd7dc7c6c84309`");
        await queryRunner.query("ALTER TABLE `requests` DROP FOREIGN KEY `FK_1fa5d0e3dd094bfc0fab02dfe68`");
        await queryRunner.query("ALTER TABLE `requests` DROP FOREIGN KEY `FK_204395543f86d4afa5793a0af4c`");
        await queryRunner.query("ALTER TABLE `profiles` DROP FOREIGN KEY `FK_60489e3af3eae82e88657c36831`");
        await queryRunner.query("DROP INDEX `IDX_e569e060bab13393c0cde4237e` ON `files_shared_with_users`");
        await queryRunner.query("DROP INDEX `IDX_b4b62af6d21040c78af564bf03` ON `files_shared_with_users`");
        await queryRunner.query("DROP TABLE `files_shared_with_users`");
        await queryRunner.query("DROP INDEX `IDX_fd411266a536255fb55c552655` ON `files_tags_file_tags`");
        await queryRunner.query("DROP INDEX `IDX_c37b741a156f3d36c3345db17a` ON `files_tags_file_tags`");
        await queryRunner.query("DROP TABLE `files_tags_file_tags`");
        await queryRunner.query("DROP INDEX `IDX_fdb536ceaece13e7abaea702ae` ON `quizzes_mentees_users`");
        await queryRunner.query("DROP INDEX `IDX_75ba190821305b3a57c6149958` ON `quizzes_mentees_users`");
        await queryRunner.query("DROP TABLE `quizzes_mentees_users`");
        await queryRunner.query("DROP INDEX `IDX_910ad55fed2e6464ed209c53d4` ON `rooms_members_users`");
        await queryRunner.query("DROP INDEX `IDX_ec1ad921c3649b96b68c057f8b` ON `rooms_members_users`");
        await queryRunner.query("DROP TABLE `rooms_members_users`");
        await queryRunner.query("DROP INDEX `IDX_9e26ae7caabb0220ff90fab373` ON `profiles_coaching_domains_domains`");
        await queryRunner.query("DROP INDEX `IDX_9e3e60b64044f20a34389e83fc` ON `profiles_coaching_domains_domains`");
        await queryRunner.query("DROP TABLE `profiles_coaching_domains_domains`");
        await queryRunner.query("DROP INDEX `IDX_fd4d5d4c7f7ff16c57549b72c6` ON `roles_permissions_permissions`");
        await queryRunner.query("DROP INDEX `IDX_dc2b9d46195bb3ed28abbf7c9e` ON `roles_permissions_permissions`");
        await queryRunner.query("DROP TABLE `roles_permissions_permissions`");
        await queryRunner.query("DROP TABLE `file_tags`");
        await queryRunner.query("DROP TABLE `files`");
        await queryRunner.query("DROP INDEX `REL_ee0e324a6ec4891a73f04f5f77` ON `users`");
        await queryRunner.query("DROP INDEX `REL_b1bda35cdb9a2c1b777f5541d8` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `objectifs`");
        await queryRunner.query("DROP TABLE `quizzes`");
        await queryRunner.query("DROP TABLE `quizSolutions`");
        await queryRunner.query("DROP TABLE `balances`");
        await queryRunner.query("DROP TABLE `points`");
        await queryRunner.query("DROP TABLE `badges`");
        await queryRunner.query("DROP TABLE `events`");
        await queryRunner.query("DROP TABLE `rooms`");
        await queryRunner.query("DROP TABLE `messages`");
        await queryRunner.query("DROP TABLE `sessions`");
        await queryRunner.query("DROP TABLE `subscriptions`");
        await queryRunner.query("DROP TABLE `requests`");
        await queryRunner.query("DROP TABLE `profiles`");
        await queryRunner.query("DROP TABLE `domains`");
        await queryRunner.query("DROP TABLE `roles`");
        await queryRunner.query("DROP TABLE `permissions`");
    }

}
