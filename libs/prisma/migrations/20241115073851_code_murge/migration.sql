/*
  Warnings:

  - You are about to drop the column `mafile_name` on the `ma_car_wrapup_image` table. All the data in the column will be lost.
  - You are about to drop the column `mafile_name_image` on the `ma_car_wrapup_image` table. All the data in the column will be lost.
  - You are about to drop the column `mafile_part` on the `ma_car_wrapup_image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ma_car_wrapup_image" DROP COLUMN "mafile_name",
DROP COLUMN "mafile_name_image",
DROP COLUMN "mafile_part",
ADD COLUMN     "file_name" VARCHAR(150),
ADD COLUMN     "file_path" VARCHAR(150),
ADD COLUMN     "file_type" VARCHAR(150);
