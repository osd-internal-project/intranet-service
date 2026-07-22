import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * แคตตาล็อกตั้งต้น (สำเนาย่อจาก libs/share/src/notification/notification-catalog.ts)
 * ให้ตรงกับ ensureDefaults() — seed ไว้เพื่อให้มีข้อมูลทันทีหลัง db push
 */
const CATALOG: {
  key: string;
  target: 'REQUESTER' | 'APPROVER' | 'FIXED_LIST';
  moduleCode?: string;
  expiry?: boolean;
}[] = [
  { key: 'insurance-expiry', target: 'FIXED_LIST', expiry: true },
  { key: 'ma-due', target: 'FIXED_LIST', expiry: true },
  { key: 'leave-request', target: 'APPROVER', moduleCode: 'intranet:approveleave' },
  { key: 'leave-result', target: 'REQUESTER' },
  { key: 'car-request', target: 'APPROVER', moduleCode: 'intranet:approvebookingcar' },
  { key: 'car-return', target: 'APPROVER', moduleCode: 'intranet:approvebookingcar' },
  { key: 'car-result', target: 'REQUESTER' },
  { key: 'room-request', target: 'APPROVER', moduleCode: 'intranet:approvebookingroom' },
  { key: 'room-result', target: 'REQUESTER' },
  { key: 'ot-request', target: 'APPROVER', moduleCode: 'intranet:approveleave' },
  { key: 'ot-result', target: 'REQUESTER' },
];

/**
 * ผู้รับเดิม (ย้ายมาจาก cron เก่าใน ma-car-wrapup.service.ts ที่ hardcoded ไว้) — alertType = null (global)
 * หมายเหตุ: userId ใช้อีเมลเป็น placeholder — จึงได้เฉพาะ "อีเมล" การแจ้งบนเว็บต้องเพิ่มใหม่ผ่านหน้าตั้งค่า
 */
const LEGACY_RECIPIENTS = [
  { userId: 'wasmeej@osd.co.th', email: 'wasmeej@osd.co.th', name: 'วัสมี จาหลง' },
  { userId: 'jakkitt@osd.co.th', email: 'jakkitt@osd.co.th', name: 'จักรกฤษณ์ ทิพันธ์' },
];

/** seed ข้อมูลตั้งต้นของระบบแจ้งเตือน — idempotent (รันซ้ำได้) */
async function main() {
  for (const def of CATALOG) {
    await prisma.notificationSetting.upsert({
      where: { alertType: def.key },
      update: {},
      create: {
        alertType: def.key,
        enabled: true,
        emailEnabled: true,
        webEnabled: true,
        targetStrategy: def.target,
        moduleCode: def.moduleCode ?? null,
        thresholds: def.expiry ? [60, 30] : [],
        notifyWhenExpiredDaily: def.expiry ? true : false,
      },
    });
  }
  console.log(`✅ seeded notificationSetting (${CATALOG.length} rows)`);

  for (const r of LEGACY_RECIPIENTS) {
    // unique = (userId, alertType); alertType = null → เช็คเองแล้วค่อยสร้าง (null ใน compound unique upsert ไม่ชัวร์)
    const existing = await prisma.notificationRecipient.findFirst({
      where: { userId: r.userId, alertType: null },
    });
    if (existing) {
      await prisma.notificationRecipient.update({
        where: { id: existing.id },
        data: { email: r.email, name: r.name },
      });
    } else {
      await prisma.notificationRecipient.create({ data: { ...r, alertType: null } });
    }
  }
  console.log(
    `✅ seeded notificationRecipient (${LEGACY_RECIPIENTS.length} legacy rows)`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
