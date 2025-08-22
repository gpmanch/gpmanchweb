import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { nameHi, nameEn } = await req.json();

    if (typeof nameHi !== "string" || typeof nameEn !== "string" || !nameHi.trim() || !nameEn.trim()) {
      return new NextResponse("Both Hindi and English names are required", { status: 400 });
    }

    const gotr = await db.gotr.create({
      data: {
        nameHi: nameHi.trim(),
        nameEn: nameEn.trim(),
      },
    });

    return NextResponse.json({ message: "Gotr added successfully", gotr });
  } catch (error) {
    console.error("[GOTR_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}