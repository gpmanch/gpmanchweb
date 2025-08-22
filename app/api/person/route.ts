import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newPerson = await db.person.create({
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
      },
    });

    return NextResponse.json(
      { message: "Person added successfully", person: newPerson },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("POST /api/person error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to add person" },
      { status: 400 }
    );
  }
}