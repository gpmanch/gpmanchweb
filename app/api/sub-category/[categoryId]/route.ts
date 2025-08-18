import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    context : { params: Promise<{ categoryId: string }> }
) {
    try {
        // const { userId } = auth();
        const { categoryId } =  await context.params;

        // if(!userId || !isTeacher(userId)) {
        //     return new NextResponse("Unauthorized Request", { status: 401 })
        // }

        const existingCategory = await db.subCategory.findUnique({
            where: {
                id: categoryId
            }
        })

        if (!existingCategory) {
            return new NextResponse("Category does not exist!", { status: 400 });
        }

        const category = await db.subCategory.delete({
            where: {
                id: categoryId
            }
        });

        return NextResponse.json(category)
    } catch (error) {
        console.log("[SUB_CATEGORY_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function GET(
    req: NextRequest,
    context : { params: Promise<{ categoryId: string }> }
) {
    try {
        // const { userId } = auth();
        const { categoryId } = await context.params;

        // if(!userId || !isTeacher(userId)) {
        //     return new NextResponse("Unauthorized Request", { status: 401 })
        // }

        const existingCategory = await db.subCategory.findUnique({
            where: {
                id: categoryId
            }
        })

        if (!existingCategory) {
            return new NextResponse("Category does not exist!", { status: 400 });
        }

        const category = await db.subCategory.findUnique({
            where: {
                id: categoryId
            }
        });

        return NextResponse.json(category)
    } catch (error) {
        console.log("[SUB_CATEGORY_FETCH]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    context : { params: Promise<{ categoryId: string }> }
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

        return NextResponse.json(subCategory)
    } catch (error) {
        console.log("[SUB_CATEGORY_ID]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}