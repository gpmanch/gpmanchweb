import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    context: { params: Promise<{ categoryId: string }> }
) {
    try {
        const { categoryId } = await context.params;

        await db.subCategory.delete({
            where: {
                id: categoryId,
            },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[SUB_CATEGORY_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    context: { params: Promise<{ categoryId: string }> }
) {
    try {
        const { categoryId } = await context.params;
        const values = await req.json();

        const subCategory = await db.subCategory.update({
            where: {
                id: categoryId,
            },
            data: {
                ...values,
            }
        })

        return NextResponse.json(subCategory);
    } catch (error) {
        console.error("[SUB_CATEGORY_PATCH]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}