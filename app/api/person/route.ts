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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("POST /api/person error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add person" },
      { status: 400 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    const persons = await db.person.findMany({
      where: {
        isApproved: true,
        ...(categoryId ? { categoryId } : {}),
      },
      include: {
        category: true,
        subCategory: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(persons, { status: 200 });
  } catch (error: unknown) {
    console.error("GET /api/person error:", error);
    return NextResponse.json(
      { error: "Failed to fetch persons" },
      { status: 500 }
    );
  }
}