import 'reflect-metadata';
import { Prisma, PrismaClient } from '@prisma/client';
import { decodeUploadFilename } from '@inventory/share';

const prisma = new PrismaClient();

/**
 * สคริปต์ซ่อมชื่อไฟล์ภาษาไทยที่เพี้ยน (mojibake) ของโมดูล macar ที่บันทึกไว้ก่อนแก้บั๊ก
 *
 * ก่อนแก้บั๊ก อัปโหลดจะเก็บ file.originalname ดิบ ซึ่ง multer decode มาเป็น latin1
 * ทำให้ชื่อไทยกลายเป็นตัวอักษรเพี้ยน สคริปต์นี้แปลงกลับด้วย decodeUploadFilename
 * ซึ่ง idempotent — รันซ้ำได้ แถวที่ถูกต้องอยู่แล้วจะไม่ถูกแตะ
 *
 * วิธีใช้ (จาก intranet-service/services/intranet):
 *   yarn fix:macar-filenames           # dry-run แสดงผลอย่างเดียว
 *   yarn fix:macar-filenames --apply   # เขียนลง DB จริง
 */

/** จำนวนแถวสูงสุดที่พิมพ์ตัวอย่าง before → after ต่อหนึ่งตาราง */
const PREVIEW_LIMIT = 20;

interface RowChange {
  readonly id: number;
  readonly before: string;
  readonly after: string;
}

interface TableResult {
  readonly table: string;
  readonly scanned: number;
  readonly changes: readonly RowChange[];
}

/**
 * สแกนตารางหนึ่ง หาแถวที่ชื่อไฟล์ต้องแก้ แล้ว (ถ้า apply) อัปเดตในทรานแซกชันเดียว
 * @param table ชื่อตารางไว้แสดงผล
 * @param rows แถวทั้งหมด รูปแบบ { id, value } โดย value คือชื่อไฟล์ปัจจุบัน
 * @param update ฟังก์ชันสร้าง PrismaPromise สำหรับอัปเดตหนึ่งแถว (lazy — ยิงจริงตอน $transaction)
 * @param apply true = เขียนจริง, false = dry-run
 * @returns สรุปจำนวนที่สแกนและรายการที่เปลี่ยน
 */
async function processTable(
  table: string,
  rows: readonly { id: number; value: string | null }[],
  update: (id: number, next: string) => Prisma.PrismaPromise<unknown>,
  apply: boolean,
): Promise<TableResult> {
  const changes: RowChange[] = [];
  for (const row of rows) {
    if (!row.value) continue;
    const next = decodeUploadFilename(row.value);
    if (next !== row.value) {
      changes.push({ id: row.id, before: row.value, after: next });
    }
  }

  if (apply && changes.length) {
    // ทรานแซกชันเดียวต่อตาราง — ถ้าพังกลางทางจะ rollback ทั้งชุด ไม่เหลือข้อมูลครึ่ง ๆ
    await prisma.$transaction(changes.map((c) => update(c.id, c.after)));
  }

  return { table, scanned: rows.length, changes };
}

/** พิมพ์สรุปผลของตารางหนึ่งลง console */
function printResult(result: TableResult): void {
  console.log(
    `\n[${result.table}] scanned=${result.scanned} to-fix=${result.changes.length}`,
  );
  for (const change of result.changes.slice(0, PREVIEW_LIMIT)) {
    console.log(`  #${change.id}  ${change.before}  →  ${change.after}`);
  }
  if (result.changes.length > PREVIEW_LIMIT) {
    console.log(`  ... อีก ${result.changes.length - PREVIEW_LIMIT} แถว`);
  }
}

async function main(): Promise<void> {
  const apply = process.argv.includes('--apply');
  console.log(
    apply
      ? '=== APPLY MODE — จะเขียนลงฐานข้อมูลจริง ==='
      : '=== DRY RUN — ไม่เขียนอะไรลงฐานข้อมูล (ใส่ --apply เพื่อเขียนจริง) ===',
  );

  const results: TableResult[] = [];

  // maCarFiles.name — ไฟล์แนบของรถ
  const carFiles = await prisma.maCarFiles.findMany({
    select: { id: true, name: true },
  });
  results.push(
    await processTable(
      'ma_car_files.name',
      carFiles.map((r) => ({ id: r.id, value: r.name })),
      (id, next) => prisma.maCarFiles.update({ where: { id }, data: { name: next } }),
      apply,
    ),
  );

  // maCarDocumentFile.name — ไฟล์แนบเอกสารรถ (ประกัน/พรบ./ภาษี)
  const documentFiles = await prisma.maCarDocumentFile.findMany({
    select: { id: true, name: true },
  });
  results.push(
    await processTable(
      'ma_car_document_file.name',
      documentFiles.map((r) => ({ id: r.id, value: r.name })),
      (id, next) =>
        prisma.maCarDocumentFile.update({ where: { id }, data: { name: next } }),
      apply,
    ),
  );

  // maCarWrapupImage.fileName — รูปตรวจสภาพ
  const wrapupImages = await prisma.maCarWrapupImage.findMany({
    select: { idwarpupImage: true, fileName: true },
  });
  results.push(
    await processTable(
      'ma_car_wrapup_image.file_name',
      wrapupImages.map((r) => ({ id: r.idwarpupImage, value: r.fileName })),
      (id, next) =>
        prisma.maCarWrapupImage.update({
          where: { idwarpupImage: id },
          data: { fileName: next },
        }),
      apply,
    ),
  );

  // maCarBookImage.fileName — รูปรับ-คืนรถ
  const bookingImages = await prisma.maCarBookImage.findMany({
    select: { idCarBookImage: true, fileName: true },
  });
  results.push(
    await processTable(
      'ma_car_booking_image.file_name',
      bookingImages.map((r) => ({ id: r.idCarBookImage, value: r.fileName })),
      (id, next) =>
        prisma.maCarBookImage.update({
          where: { idCarBookImage: id },
          data: { fileName: next },
        }),
      apply,
    ),
  );

  results.forEach(printResult);

  const total = results.reduce((sum, r) => sum + r.changes.length, 0);
  console.log(
    `\nรวมทั้งหมด ${total} แถว${apply ? ' — อัปเดตเรียบร้อย' : ' (ยังไม่ได้เขียน)'}`,
  );
}

main()
  .catch((error) => {
    console.error('fix-macar-filenames ล้มเหลว:', error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
