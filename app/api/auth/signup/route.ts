import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName, userName } = await req.json();

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

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        userName,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user: { id: user.id, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("[SIGNUP_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}