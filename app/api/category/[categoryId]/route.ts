import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    context: { params: Promise<{ categoryId: string }> }
) {
    try {
        const { categoryId } = await context.params;

        await db.category.delete({
            where: {
                id: categoryId,
            },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[CATEGORY_DELETE]", error);
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
            name,
            headingEn,
            headingHi,
            descriptionEn,
            descriptionHi,
        } = await req.json();

        const data: Record<string, unknown> = {};
        if (typeof name === "string" && name.length > 0) {
            data.name = name;
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
        console.error("[CATEGORY_PATCH]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}