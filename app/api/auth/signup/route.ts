import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/prisma";
import { generateAccessToken, generateRefreshToken, TokenPayload } from "@/lib/jwt";

function slugifyEmail(email: string) {
  return email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function generateUniqueUserName(email: string) {
  const base = slugifyEmail(email);
  let userName = base;
  let i = 1;
  while (await db.user.findFirst({ where: { userName } })) {
    userName = `${base}${i}`;
    i++;
  }
  return userName;
}

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName } = await req.json();

    if (!email || !password || !firstName) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userName = await generateUniqueUserName(email);

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        userName,
        isVerified: true,
      },
    });

    // Generate tokens
    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      userName: user.userName || undefined,
      isAdmin: user.isAdmin,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Create response with access token
    const response = NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email,
          userName: user.userName
        },
        accessToken
      },
      { status: 201 }
    );

    // Set refresh token as httpOnly cookie
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return response;
  } catch (error) {
    console.error("[SIGNUP_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}