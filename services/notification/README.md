# notification-be

Standalone service สำหรับแจ้งเตือนเอกสารรถหมดอายุ (ประกัน/พ.ร.บ./ภาษี) และครบกำหนดตรวจสภาพรถ
ส่ง 2 ช่องทาง: ฟีดบนเว็บ (กระดิ่ง) + อีเมล. cron รันทุกวัน 09:00 (Asia/Bangkok) ที่ `notification.cron.ts`.

## รันแบบ Local (ยังไม่ deploy)

ทำจาก root ของ `intranet-service`:

1. **ตั้ง DATABASE_URL ให้ชี้ DB local** — แก้ `libs/prisma/.env`
   (ค่าเริ่มต้นชี้เซิร์ฟเวอร์รวม `192.168.31.140` อย่าเผลอ push ทับ)

2. **สร้างตาราง** (อย่าใช้ `migrate dev` — migrations ค้างตั้งแต่ พ.ย. 2024):
   ```bash
   npx prisma db push --schema libs/prisma/schema.prisma
   npx prisma generate --schema libs/prisma/schema.prisma
   ```

3. **Seed ค่าตั้งต้น** (2 แถว notificationSetting + ผู้รับเดิม wasmeej@/jakkitt@):
   ```bash
   yarn workspace @inventory/prisma db:seed
   ```

4. **รัน service** (พอร์ต 4010):
   ```bash
   yarn workspace notification-be dev
   ```
   Swagger: http://localhost:4010/api

5. **ตั้ง env ฝั่ง frontend** (`intranet-console`) — ต้องลงท้าย `/api`:
   ```
   NEXT_PUBLIC_API_BASE_URL_NOTIFICATION=http://localhost:4010/api
   ```

6. **เปิดหน้า** `/page/setting/notification` (แอดมิน) → ตั้งค่าถูกโหลด/สร้างอัตโนมัติ
   → เพิ่ม **ตัวเอง** เป็นผู้รับ (user picker) เพื่อให้แจ้งเตือนบนเว็บส่งถึง
   → กดปุ่ม **"ทดสอบส่งแจ้งเตือน (ยิงทันที)"**

## ทดสอบยิงเอง (ไม่รอ 09:00)

```bash
# ยิงทุกรายการปัจจุบัน (บังคับ, ไม่สน threshold, ไม่ติด dedup)
curl -X POST "http://localhost:4010/api/notification/run-now?force=true"

# ยิงตามเกณฑ์จริง (เฉพาะที่เหลือ 60/30 วัน หรือเลยกำหนด)
curl -X POST "http://localhost:4010/api/notification/run-now"
```
คืน `{ created, emailed }`. ถ้า `created:0` แปลว่าไม่มีผู้รับ หรือไม่มีเอกสาร/งานตรวจสภาพที่เข้าเกณฑ์.

## Deploy note

- Route service เข้า gateway/nginx และตั้ง `NEXT_PUBLIC_API_BASE_URL_NOTIFICATION` เป็น URL จริง (+`/api`)
- ผู้รับที่ seed ไว้ (wasmeej@/jakkitt@) ใช้ **อีเมลเป็น userId placeholder** → ได้เฉพาะอีเมล
  ถ้าต้องการแจ้งบนเว็บด้วย ให้ลบแล้วเพิ่มใหม่ผ่าน user picker (จะได้ userId จริง)
- SMTP ใช้ค่าเดิมของระบบใน `src/configs/index.ts` — ย้ายไป env ได้ที่ไฟล์เดียว
