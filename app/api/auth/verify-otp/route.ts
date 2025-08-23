import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp || typeof email !== 'string' || typeof otp !== 'string') {
      return NextResponse.json({ message: 'Invalid input.' }, { status: 400 });
    }

    const otpRecord = await db.otp.findFirst({
      where: {
        email,
        otp,
        used: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (!otpRecord) {
      return NextResponse.json({ message: 'Invalid or expired OTP.' }, { status: 400 });
    }

    await db.otp.update({
      where: { id: otpRecord.id },
      data: { used: true },
    });

    return NextResponse.json({ message: 'OTP verified.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'OTP verification failed.' }, { status: 500 });
  }
}
