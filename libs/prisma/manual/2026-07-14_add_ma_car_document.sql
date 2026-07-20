-- Additive only: new car detail columns + the two document tables.
-- Deliberately NOT using `prisma db push`, which wanted to drop 9 unrelated
-- orphaned tables (customer_*, ticket_history_logs) and add unique constraints
-- to master_product / order. None of that belongs to this feature.

BEGIN;

-- 1. ma_car: ทะเบียน + รายละเอียดรถ (ตามคอลัมน์ใน Excel ที่ใช้งานอยู่)
-- nullable ทั้งหมด เพราะ ma_car มีข้อมูลเดิมอยู่แล้ว
ALTER TABLE "ma_car"
  ADD COLUMN IF NOT EXISTS "license_plate" VARCHAR(20),
  ADD COLUMN IF NOT EXISTS "car_category"  VARCHAR(50),
  ADD COLUMN IF NOT EXISTS "brand"         VARCHAR(100),
  ADD COLUMN IF NOT EXISTS "model"         VARCHAR(100),
  ADD COLUMN IF NOT EXISTS "fuel_type"     VARCHAR(50),
  ADD COLUMN IF NOT EXISTS "owner_name"    VARCHAR(100);

-- 2. ma_car_document — เก็บทุกงวดปีของ ประกัน/พรบ./ภาษี
--    ต่ออายุ = insert แถวใหม่ ตัวปัจจุบัน = expireDate สูงสุดใน status = true
CREATE TABLE IF NOT EXISTS "ma_car_document" (
  "id"              SERIAL       NOT NULL,
  "document_id"     VARCHAR(50)  NOT NULL,
  "car_id"          VARCHAR(50)  NOT NULL,
  "car_name"        VARCHAR(150),
  "doc_type"        VARCHAR(20)  NOT NULL,
  "insurance_type"  VARCHAR(50),
  "vender"          VARCHAR(150),
  "policy_no"       VARCHAR(100),
  "cost"            DECIMAL(12,2),
  "start_date"      TIMESTAMPTZ(6) NOT NULL,
  "expire_date"     TIMESTAMPTZ(6) NOT NULL,
  "paid_date"       TIMESTAMPTZ(6),
  "remark"          TEXT,
  "status"          BOOLEAN      NOT NULL DEFAULT true,
  "created_at"      TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_by_id"   VARCHAR(50),
  "created_by_name" VARCHAR(255),
  "updated_at"      TIMESTAMPTZ(6),
  "updated_by_id"   VARCHAR(50),
  "updated_by_name" VARCHAR(255)
);

CREATE UNIQUE INDEX IF NOT EXISTS "ma_car_document_id_key"          ON "ma_car_document"("id");
CREATE UNIQUE INDEX IF NOT EXISTS "ma_car_document_document_id_key" ON "ma_car_document"("document_id");
CREATE INDEX IF NOT EXISTS "ma_car_document_car_id_doc_type_expire_date_idx" ON "ma_car_document"("car_id", "doc_type", "expire_date");
CREATE INDEX IF NOT EXISTS "ma_car_document_expire_date_idx"        ON "ma_car_document"("expire_date");

-- 3. ma_car_document_file — ไฟล์แนบของเอกสารแต่ละงวด
CREATE TABLE IF NOT EXISTS "ma_car_document_file" (
  "id"          SERIAL       NOT NULL,
  "name"        TEXT,
  "file_name"   VARCHAR(200),
  "file_type"   VARCHAR(200),
  "file_path"   TEXT,
  "created_at"  TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "document_id" VARCHAR(50)
);

CREATE UNIQUE INDEX IF NOT EXISTS "ma_car_document_file_id_key" ON "ma_car_document_file"("id");

-- 4. Foreign keys
ALTER TABLE "ma_car_document"
  DROP CONSTRAINT IF EXISTS "ma_car_document_car_id_fkey";
ALTER TABLE "ma_car_document"
  ADD CONSTRAINT "ma_car_document_car_id_fkey"
  FOREIGN KEY ("car_id") REFERENCES "ma_car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "ma_car_document_file"
  DROP CONSTRAINT IF EXISTS "ma_car_document_file_document_id_fkey";
ALTER TABLE "ma_car_document_file"
  ADD CONSTRAINT "ma_car_document_file_document_id_fkey"
  FOREIGN KEY ("document_id") REFERENCES "ma_car_document"("document_id") ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT;
