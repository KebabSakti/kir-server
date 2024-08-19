/*
  Warnings:

  - Made the column `created` on table `admin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated` on table `admin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created` on table `kir` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated` on table `kir` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created` on table `pdf` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated` on table `pdf` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `admin` MODIFY `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `kir` MODIFY `expiryDate` DATETIME(3) NULL,
    MODIFY `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `deleted` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `pdf` MODIFY `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `deleted` DATETIME(3) NULL;
