import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, headingEn, headingHi, descriptionEn, descriptionHi } = await req.json();

    if (!title || !headingEn || !headingHi || !descriptionEn || !descriptionHi) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    const existingCategory = await db.category.findFirst({
      where: { name: title }
    });

    if (existingCategory) {
      return new NextResponse("Category already exists", { status: 400 });
    }

    const category = await db.category.create({
      data: {
        name: title,
        heading: { en: headingEn, hi: headingHi },
        description: { en: descriptionEn, hi: descriptionHi },
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("[CATEGORY_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const categories = await db.category.findMany({
      select: {
        id: true,
        name: true,
        heading: true,
        description: true,
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("[CATEGORY_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}