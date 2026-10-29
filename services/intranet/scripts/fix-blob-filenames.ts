/**
 * สร้าง SQL ตั้งชื่อใหม่ให้ไฟล์ที่ถูกบันทึกเป็น "blob" (ชื่อเดิมหายไปแล้ว) โดยดูชนิดจาก magic bytes ใน MinIO
 * อ่านอย่างเดียว — พิมพ์ UPDATE ออก stdout ให้คนตรวจแล้วรันเอง ไม่เขียน DB/MinIO
 * รัน: cd services/intranet && npx ts-node --transpile-only scripts/fix-blob-filenames.ts > fix-blob.sql
 */
import { strict as assert } from 'assert';
import { PrismaClient } from '@prisma/client';
import { Client } from 'minio';

type Ext = 'jpg' | 'png' | 'pdf' | 'webp';

const detectExt = (buf: Buffer): Ext | null => {
  if (buf.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))) return 'jpg';
  if (buf.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]))) return 'png';
  if (buf.subarray(0, 4).toString('latin1') === '%PDF') return 'pdf';
  if (
    buf.subarray(0, 4).toString('latin1') === 'RIFF' &&
    buf.subarray(8, 12).toString('latin1') === 'WEBP'
  )
    return 'webp';
  return null;
};

assert.equal(detectExt(Buffer.from([0xff, 0xd8, 0xff, 0xe0])), 'jpg');
assert.equal(detectExt(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d])), 'png');
assert.equal(detectExt(Buffer.from('%PDF-1.7')), 'pdf');
assert.equal(detectExt(Buffer.from('RIFF\0\0\0\0WEBPVP8 ')), 'webp');
assert.equal(detectExt(Buffer.from('hello world!')), null);

const readHead = async (minio: Client, bucket: string, key: string) => {
  const stream = await minio.getPartialObject(bucket, key, 0, 12);
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(chunk as Buffer);
  return Buffer.concat(chunks);
};

const main = async () => {
  const dbUrl = new URL(process.env.DATABASE_URL ?? '');
  const bucket = process.env.MINIO_BUCKET ?? '';
  // แสดงเป้าหมายก่อนต่อ (ไม่มี credential) — ออก stderr เพื่อไม่ปนกับ SQL
  console.error(
    `DB ${dbUrl.hostname}:${dbUrl.port}${dbUrl.pathname} | MinIO ${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucket}`,
  );

  const prisma = new PrismaClient();
  const minio = new Client({
    endPoint: process.env.MINIO_ENDPOINT ?? '',
    port: Number(process.env.MINIO_PORT),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESSKEY ?? '',
    secretKey: process.env.MINIO_SECRETKEY ?? '',
  });

  try {
    const select = { id: true, filePath: true } as const;
    const tables = [
      { table: 'ma_car_document_file', rows: await prisma.maCarDocumentFile.findMany({ where: { name: 'blob' }, select }) },
      { table: 'ma_car_files', rows: await prisma.maCarFiles.findMany({ where: { name: 'blob' }, select }) },
    ];
    console.log('BEGIN;');
    for (const { table, rows } of tables) {
      for (const { id, filePath } of rows) {
        if (!filePath) {
          console.log(`-- ${table} id=${id}: ไม่มี file_path`);
          continue;
        }
        try {
          const ext = detectExt(await readHead(minio, bucket, filePath));
          console.log(
            ext
              ? `UPDATE ${table} SET name = 'เอกสาร-${id}.${ext}', file_type = '.${ext}' WHERE id = ${id} AND name = 'blob';`
              : `-- ${table} id=${id}: ไม่รู้จักชนิดไฟล์ (${filePath})`,
          );
        } catch (err) {
          console.log(`-- ${table} id=${id}: อ่าน MinIO ไม่ได้ (${filePath}) ${(err as Error).message}`);
        }
      }
    }
    console.log('-- COMMIT;  -- ตรวจแล้วค่อยเปิด');
  } finally {
    await prisma.$disconnect();
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
