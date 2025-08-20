// /api/person/unapproved/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET() {
  try {
    const persons = await db.person.findMany({
      where: { isApproved: false },
      include: {
        category: true,
        subCategory: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(persons, { status: 200 });
  } catch (error) {
    console.error("GET /api/person/unapproved error:", error);
    return NextResponse.json(
      { error: "Failed to fetch unapproved persons" },
      { status: 500 }
    );
  }
}
