-- Additive only. Add วัตถุประสงค์ (objective) to car inspection (ma_car_wrapup).
BEGIN;

ALTER TABLE "ma_car_wrapup"
  ADD COLUMN IF NOT EXISTS "objective" TEXT;

COMMIT;
