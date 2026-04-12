import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { prisma } from '../lib/pisma.js';

export const generate2FACode = async (id : string): Promise<{ qrCode: string }> => {
    const secret = speakeasy.generateSecret({
    name: `TechPulse (${id})`,
    otpauth_url: true
  });
  
  const qrCode = await QRCode.toDataURL(secret.otpauth_url);

  await prisma.user.update({
    where: { id },
    data: { twoFactorSecret: secret.base32 },
  });
  return { qrCode };
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
    } else {
        await prisma.user.update({
            where: { id },
            data: { isTwoFactorEnabled: true }
        });
    }

    return isValid;
}

export const disabled2FAService = async (id: string): Promise<void> => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: { twoFactorSecret: true, isTwoFactorEnabled: true}
    });

    if (!user || user.twoFactorSecret) {
        throw new Error("2FA non configuré");
    }

    if (!user.isTwoFactorEnabled) {
        throw new Error("2FA non active pour utilisateur");
    }

    await prisma.user.update({
        where: { id },
        data: {
            isTwoFactorEnabled: false, twoFactorSecret: null
        }
    })
}