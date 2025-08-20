import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ personId: string }> }
) {
  try {
    const body = await req.json();
    const { personId } = await context.params;

    const updatedPerson = await db.person.update({
      where: { id: personId },
      data: {
        nameHi: body.nameHi,
        nameEn: body.nameEn,
        description: {
          hi: body.descHi || "",
          en: body.descEn || "",
        },
        imageUrl: body.imageUrl,
        categoryId: body.categoryId,
        subCategoryId: body.subCategoryId,
        award: body.award,
        cadre: body.cadre,
        post: body.post,
        sport: body.sport,
        profession: body.profession,
        isApproved: true,
      },
    });

    return NextResponse.json(updatedPerson);
  } catch (error) {
    console.error("PATCH /api/person/[personId] error:", error);
    return NextResponse.json(
      { error: "Failed to update person" },
      { status: 500 }
    );
  }
}
