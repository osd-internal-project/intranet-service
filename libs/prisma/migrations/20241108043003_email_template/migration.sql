-- AlterTable
ALTER TABLE "email_template" ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "email_template_type" ADD COLUMN     "template_used_id" VARCHAR(100);

-- AlterTable
ALTER TABLE "master_typeleave" ALTER COLUMN "type_id" DROP NOT NULL;
