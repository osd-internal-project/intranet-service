-- AlterTable
ALTER TABLE "users" ADD COLUMN     "ldap_query" TEXT;

-- CreateTable
CREATE TABLE "noti_action_logs" (
    "id" SERIAL NOT NULL,
    "send_user_id" VARCHAR(50),
    "send_user_name" VARCHAR(255),
    "to_user_id" VARCHAR(50),
    "to_user_name" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "ref_id" INTEGER NOT NULL,
    "type" VARCHAR(20),
    "action" VARCHAR(20),
    "noti_status" VARCHAR(20)
);

-- CreateIndex
CREATE UNIQUE INDEX "noti_action_logs_id_key" ON "noti_action_logs"("id");
