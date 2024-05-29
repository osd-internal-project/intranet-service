import * as qrcode from 'qrcode';

export async function generateQRCode(text: string) {
  try {
    const qrCode = await qrcode.toDataURL(text);
    return qrCode;
  } catch (error) {
    throw new Error('Failed to generate QR code');
  }
}
