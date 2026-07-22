export default () => ({
  env: process.env.NODE_ENV ?? 'local',
  port: process.env.PORT || 4010,
  id24Url: process.env.ID24_URL || 'http://192.168.59.191:8815',
  id24TokenPublicKey: process.env.ID24_TOKEN_PUBLIC_KEY,
  // SMTP (คงค่าเดิมของระบบไว้เพื่อความต่อเนื่อง — ย้ายไป env ภายหลังได้ที่ไฟล์เดียว)
  smtpHost: process.env.SMTP_HOST || 'smtp.office365.com',
  smtpPort: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
  smtpUser: process.env.SMTP_USER || 'internalsupport@osd.co.th',
  smtpPass: process.env.SMTP_PASS || 'Internal-support@osd1234.',
  smtpFrom:
    process.env.SMTP_FROM || '"admin Intranet" <internalsupport@osd.co.th>',
  // ลิงก์ฐานของ frontend สำหรับปุ่มในอีเมล
  consoleBaseUrl: process.env.CONSOLE_BASE_URL || 'https://intranet.osd.co.th',
});
