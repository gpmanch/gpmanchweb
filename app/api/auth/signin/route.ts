import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { isPasswordCorrect, generateAccessToken, generateRefreshToken } from "@/lib/userService";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Find user in database
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid email" }, { status: 401 });
    }

    // Use helper to check password
    const valid = await isPasswordCorrect(user.id, password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Generate JWTs
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Persist refresh token
    await db.user.update({ where: { id: user.id }, data: { refreshToken } });

    // Prepare response with httpOnly cookies
    const res = NextResponse.json({
      message: "Sign-in successful",
      user: { id: user.id, email: user.email, userName: user.userName },
    });

    const isProd = process.env.NODE_ENV === "production";
    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15, // 15 minutes
    });
    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
