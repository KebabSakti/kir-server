-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` TEXT NOT NULL,
    `password` TEXT NOT NULL,
    `created` TIMESTAMP(0) NULL,
    `updated` TIMESTAMP(0) NULL,

    INDEX `email`(`email`(768)),
    INDEX `password`(`password`(768)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kir` (
    `id` VARCHAR(191) NOT NULL,
    `certificateNumber` TEXT NULL,
    `director` TEXT NULL,
    `directorLevel` TEXT NULL,
    `directorNip` TEXT NULL,
    `directorStamp` TEXT NULL,
    `directorSignature` TEXT NULL,
    `owner` TEXT NULL,
    `address` TEXT NULL,
    `cardNumber` TEXT NULL,
    `rfid` TEXT NULL,
    `registrationDate` TEXT NULL,
    `registrationNumber` TEXT NULL,
    `chasisNumber` TEXT NULL,
    `engineNumber` TEXT NULL,
    `inspectionNumber` TEXT NULL,
    `frontPic` TEXT NULL,
    `backPic` TEXT NULL,
    `rightPic` TEXT NULL,
    `leftPic` TEXT NULL,
    `vehicleType` TEXT NULL,
    `vehicleBrand` TEXT NULL,
    `yearManufacture` TEXT NULL,
    `fuel` TEXT NULL,
    `engineCapacity` TEXT NULL,
    `enginePower` TEXT NULL,
    `tyreSize` TEXT NULL,
    `axleConfiguration` TEXT NULL,
    `curbWeight` TEXT NULL,
    `length` TEXT NULL,
    `width` TEXT NULL,
    `height` TEXT NULL,
    `front` TEXT NULL,
    `back` TEXT NULL,
    `sumbu1` TEXT NULL,
    `sumbu2` TEXT NULL,
    `sumbu3` TEXT NULL,
    `dimension` TEXT NULL,
    `jbbJbkb` TEXT NULL,
    `jbiJbki` TEXT NULL,
    `payload` TEXT NULL,
    `classPermit` TEXT NULL,
    `mst` TEXT NULL,
    `brake1` TEXT NULL,
    `brake2` TEXT NULL,
    `brake3` TEXT NULL,
    `brake4` TEXT NULL,
    `brake5` TEXT NULL,
    `headLamp1` TEXT NULL,
    `headLamp2` TEXT NULL,
    `headLamp3` TEXT NULL,
    `headLamp4` TEXT NULL,
    `coEmision` TEXT NULL,
    `hcEmision` TEXT NULL,
    `smokeDensity` TEXT NULL,
    `inspectionResult` TEXT NULL,
    `inspector` TEXT NULL,
    `inspectorLevel` TEXT NULL,
    `inspectorNumber` TEXT NULL,
    `inspectorStamp` TEXT NULL,
    `inspectorSignature` TEXT NULL,
    `inspectionUnit` TEXT NULL,
    `region` TEXT NULL,
    `origin` TEXT NULL,
    `agency` TEXT NULL,
    `agencyLevel` TEXT NULL,
    `agencyNumber` TEXT NULL,
    `agencyStamp` TEXT NULL,
    `agencySignature` TEXT NULL,
    `qr` TEXT NULL,
    `expiryDate` TIMESTAMP(0) NULL,
    `created` TIMESTAMP(0) NULL,
    `updated` TIMESTAMP(0) NULL,
    `deleted` TIMESTAMP(0) NULL,

    INDEX `certificateNumber`(`certificateNumber`(768)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pdf` (
    `id` VARCHAR(191) NOT NULL,
    `name` TEXT NULL,
    `level` TEXT NULL,
    `number` TEXT NULL,
    `stamp` TEXT NULL,
    `signature` TEXT NULL,
    `created` TIMESTAMP(0) NULL,
    `updated` TIMESTAMP(0) NULL,
    `deleted` TIMESTAMP(0) NULL,

    INDEX `name`(`name`(768)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
