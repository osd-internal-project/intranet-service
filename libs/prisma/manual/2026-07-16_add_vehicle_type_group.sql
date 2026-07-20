-- Additive only. กลุ่มประเภทรถ (ma_vehicle_type_group) + FK บน ma_vehicle_type.
BEGIN;

-- 1. ตารางกลุ่มประเภทรถ
CREATE TABLE IF NOT EXISTS "ma_vehicle_type_group" (
  "id"              SERIAL       NOT NULL,
  "group_name"      VARCHAR(150) NOT NULL,
  "detail"          VARCHAR(150),
  "status"          BOOLEAN      NOT NULL DEFAULT true,
  "created_at"      TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_by_id"   VARCHAR(50),
  "created_by_name" VARCHAR(255)
);

CREATE UNIQUE INDEX IF NOT EXISTS "ma_vehicle_type_group_id_key" ON "ma_vehicle_type_group"("id");

-- 2. FK บน ma_vehicle_type (nullable — แถวเดิมไม่มีกลุ่มได้)
ALTER TABLE "ma_vehicle_type"
  ADD COLUMN IF NOT EXISTS "ma_vehicle_type_group_id" INTEGER;

ALTER TABLE "ma_vehicle_type"
  DROP CONSTRAINT IF EXISTS "ma_vehicle_type_ma_vehicle_type_group_id_fkey";
ALTER TABLE "ma_vehicle_type"
  ADD CONSTRAINT "ma_vehicle_type_ma_vehicle_type_group_id_fkey"
  FOREIGN KEY ("ma_vehicle_type_group_id")
  REFERENCES "ma_vehicle_type_group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT;
