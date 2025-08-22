import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ personId: string }> }
) {
  try {
    const {
      nameHi,
      nameEn,
      descHi,
      descEn,
      imageUrl,
      categoryId,
      subCategoryId,
      award,
      cadre,
      post,
      sport,
      profession
    } = await req.json();
    const { personId } = await context.params;

    const updated = await db.person.update({
      where: { id: personId },
      data: {
        nameHi: nameHi,
        nameEn: nameEn,
        description: {
          en: descEn,
          hi: descHi
        },
        imageUrl: imageUrl,
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        award: award,
        cadre: cadre,
        post: post,
        sport: sport,
        profession: profession,
        isApproved: true
      }
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("[PERSON_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}