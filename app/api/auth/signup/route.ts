import { db } from "@/lib/prisma";
import { generateAccessToken, generateRefreshToken, createUser } from "@/lib/userService";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    try {
        const { firstName, lastName, email, password } = await req.json();

        if([firstName, lastName, email, password].some( (field) =>
          field === undefined || field?.trim() === "" )
        ) {
          return new NextResponse("All fields are required!", { status: 400 })
        }

        const existing = await db.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ message: "Email already in use" }, { status: 409 });
        }

        const user = await createUser({ firstName, lastName, email, password });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        await db.user.update({
          where: { id: user.id },
          data: { refreshToken },
        });

        const res = NextResponse.json({
          user: {
            id: user.id,
            userName: user.userName,
            email: user.email,
          },
        });

        const isProd = process.env.NODE_ENV === "production";
        res.cookies.set("accessToken", accessToken, {
          httpOnly: true,
          secure: isProd,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 15,
        });
        res.cookies.set("refreshToken", refreshToken, {
          httpOnly: true,
          secure: isProd,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });

        return res;
    } catch (error) {
        if (error instanceof Error && error.message === "EMAIL_IN_USE") {
            return NextResponse.json({ message: "Email already in use" }, { status: 409 });
        }
        console.log(error);
        return NextResponse.json({ message: "Signup failed" }, { status: 400 });
    }
}