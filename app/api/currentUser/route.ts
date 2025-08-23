import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { getCurrentUserFromHeaders } from "@/lib/auth";

export async function GET() {
  const currentUser = await getCurrentUserFromHeaders();

  if (!currentUser) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const userId = currentUser.userId;

  if (!userId) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      userName: true,
      email: true,
      isAdmin: true,
      createdAt: true,
    }
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}