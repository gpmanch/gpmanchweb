import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ personId: string }> }
) {
  try {
    const body = await req.json();
    const { personId } = await context.params;

    const updated = await db.person.update({
      where: { id: personId },
      data: body,
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("[PERSON_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}