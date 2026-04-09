import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { prisma } from '../lib/pisma.js';

export const generate2FACode = async (id : string): Promise<{ secret: string; qrCode: string }> => {
    const secret = speakeasy.generateSecret({
    name: "TechPulse (2FA)",
  });
  
  const qrCode = await QRCode.toDataURL(secret.otpauth_url);

  await prisma.user.update({
    where: { id },
    data: { twoFactorSecret: secret.base32 },
  });
  return { secret: secret.base32, qrCode };
}

export const verify2FACode = async (id: string, token: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: { twoFactorSecret: true }
    });

    if (!user || !user.twoFactorSecret) {
        throw new Error("2FA n'est pas configuré pour cet utilisateur.");
    }

    const isValid = speakeasy.totp({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token,
        window: 1
    });

    if (!isValid) {
        throw new Error("Code 2FA invalide.");
    }

    return prisma.user.update({
        where: { id },
        data: { twoFactorSecret: null }
    }).then(() => true);
}