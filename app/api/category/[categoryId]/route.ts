import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ categoryId: string }> }
) {
  try {
    const { categoryId } =  await context.params;

    const existingCategory = await db.category.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      return new NextResponse("Category does not exist!", { status: 400 });
    }

    const category = await db.category.delete({
      where: { id: categoryId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  context: { params: Promise<{ categoryId: string }> }
) {
  try {
    const { categoryId } = await context.params;

    if (!categoryId || !/^[a-fA-F0-9]{24}$/.test(categoryId)) {
      return new NextResponse("Invalid category id", { status: 400 });
    }

    const category = await db.category.findUnique({
      where: { id: categoryId },
      select: { id: true, name: true, heading: true, description: true },
    });

    if (!category) {
      return new NextResponse("Category does not exist!", { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_FETCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ categoryId: string }> }
) {
  try {
    const { categoryId } = await context.params;
    const {
      title,
      headingEn,
      headingHi,
      descriptionEn,
      descriptionHi,
    } = await req.json();

    const data: Record<string, unknown> = {};
    if (typeof title === "string" && title.length > 0) {
      data.name = title;
    }
    if (
      typeof headingEn === "string" && headingEn.length > 0 &&
      typeof headingHi === "string" && headingHi.length > 0
    ) {
      data.heading = { en: headingEn, hi: headingHi };
    }
    if (
      typeof descriptionEn === "string" && descriptionEn.length > 0 &&
      typeof descriptionHi === "string" && descriptionHi.length > 0
    ) {
      data.description = { en: descriptionEn, hi: descriptionHi };
    }

    if (Object.keys(data).length === 0) {
      return new NextResponse("No valid fields provided", { status: 400 });
    }

    const category = await db.category.update({
      where: { id: categoryId },
      data,
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}