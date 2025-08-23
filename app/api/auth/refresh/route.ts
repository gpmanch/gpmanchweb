import { NextRequest, NextResponse } from "next/server";
import { verifyRefreshToken, generateAccessToken } from "@/lib/jwt";
import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json({ message: "Refresh token not found" }, { status: 401 });
    }

    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return NextResponse.json({ message: "Invalid refresh token" }, { status: 401 });
    }

    // Verify user still exists
    const user = await db.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    // Generate new access token
    const newAccessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      userName: user.userName || undefined,
      isAdmin: user.isAdmin,
    });

    return NextResponse.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("[REFRESH_ERROR]", error);
    return NextResponse.json({ message: "Token refresh failed" }, { status: 500 });
  }
}
