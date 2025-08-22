import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context: { params: Promise<{ gotrId: string }> }) {
  const { gotrId } = await context.params;
  try {
    const { nameHi, nameEn } = await req.json();
    const gotr = await db.gotr.update({
      where: { id: gotrId },
      data: {
        nameHi,
        nameEn,
        isApproved: true
      },
    });
    return NextResponse.json(gotr);
  } catch (error) {
    console.error("[GOTR_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
