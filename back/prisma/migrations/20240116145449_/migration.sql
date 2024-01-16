-- CreateTable
CREATE TABLE `Event` (
    `id` VARCHAR(191) NOT NULL,
    `debut` VARCHAR(20) NOT NULL,
    `fin` VARCHAR(20) NOT NULL,
    `discipline` VARCHAR(50) NOT NULL,
    `niveau` VARCHAR(100) NOT NULL,
    `horaires` MEDIUMTEXT NOT NULL,
    `lienWinJump` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Partner` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(100) NOT NULL,
    `logo` VARCHAR(100) NOT NULL,
    `informations` MEDIUMTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stable` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(100) NOT NULL,
    `url` VARCHAR(100) NOT NULL,
    `informations` MEDIUMTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Images` (
    `url` VARCHAR(191) NOT NULL,
    `stableId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`url`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_stableId_fkey` FOREIGN KEY (`stableId`) REFERENCES `Stable`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
