import { NextRequest, NextResponse } from 'next/server';
import { sendOtpEmail } from '@/lib/mailjet';
import { db } from '@/lib/prisma';

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const OTP_EXPIRY_MINUTES = 10;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ message: 'Invalid email.' }, { status: 400 });
    }

    // Remove any existing, unexpired OTPs for this email
    await db.otp.deleteMany({
      where: {
        email,
        used: false,
        expiresAt: { gt: new Date() },
      },
    });

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await db.otp.create({
      data: {
        email,
        otp,
        expiresAt,
      },
    });

    await sendOtpEmail(email, otp);
    return NextResponse.json({ message: 'OTP sent.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to send OTP.' }, { status: 500 });
  }
}
