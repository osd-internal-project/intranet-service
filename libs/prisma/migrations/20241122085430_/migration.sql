/*
  Warnings:

  - You are about to drop the column `to_user_id` on the `noti_action_logs` table. All the data in the column will be lost.
  - You are about to drop the column `to_user_name` on the `noti_action_logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "noti_action_logs" DROP COLUMN "to_user_id",
DROP COLUMN "to_user_name",
ADD COLUMN     "to_group_ids" VARCHAR(50);

-- AlterTable
ALTER TABLE "user_group_map_header" ADD COLUMN     "header_group_Id" TEXT[],
ADD COLUMN     "header_user_Id" TEXT[],
ADD COLUMN     "type" VARCHAR(20);
