-- Additive only. Round 5: new maCar descriptive fields + ma_vehicle_type master.
-- Do NOT use `prisma db push` (it wants to drop unrelated orphaned tables).

BEGIN;

-- 1. ma_car: ประเภทรถ (master-backed) + เลขตัวถัง / สี / ปีรุ่น
--    car_type แยกจาก car_category (ลักษณะ/ตัวถัง) เดิม
ALTER TABLE "ma_car"
  ADD COLUMN IF NOT EXISTS "car_type"       VARCHAR(50),
  ADD COLUMN IF NOT EXISTS "chassis_number" VARCHAR(50),
  ADD COLUMN IF NOT EXISTS "color"          VARCHAR(50),
  ADD COLUMN IF NOT EXISTS "model_year"     VARCHAR(10);

-- 2. ma_vehicle_type — master "ประเภทรถ" (รถ 4 ล้อ / 2 ล้อ ฯลฯ)
CREATE TABLE IF NOT EXISTS "ma_vehicle_type" (
  "id"              SERIAL       NOT NULL,
  "type_name"       VARCHAR(150) NOT NULL,
  "detail"          VARCHAR(150),
  "status"          BOOLEAN      NOT NULL DEFAULT true,
  "created_at"      TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_by_id"   VARCHAR(50),
  "created_by_name" VARCHAR(255)
);

CREATE UNIQUE INDEX IF NOT EXISTS "ma_vehicle_type_id_key" ON "ma_vehicle_type"("id");

COMMIT;
