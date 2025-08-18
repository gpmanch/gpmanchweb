import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params } : { params: { categoryId: string } }
) {
    try {
        // const { userId } = auth();
        const { categoryId } = await params;

        // if(!userId || !isTeacher(userId)) {
        //     return new NextResponse("Unauthorized request", { status: 401 })
        // }

        const existingCategory = await db.category.findUnique({
            where: {
                id: categoryId
            }
        })

        if (!existingCategory) {
            return new NextResponse("Category does not exist!", { status: 400 });
        }

        const category = await db.category.delete({
            where: {
                id: categoryId
            }
        });

        return NextResponse.json(category)
    } catch (error) {
        console.log("[CATEGORY_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params } : { params: { categoryId: string } }
) {
    try {
        // const { userId } = auth();
        const { categoryId } = params;

        // if(!userId || !isTeacher(userId)) {
        //     return new NextResponse("Unauthorized request", { status: 401 })
        // }

        const existingCategory = await db.category.findUnique({
            where: {
                id: categoryId
            }
        })

        if (!existingCategory) {
            return new NextResponse("Category does not exist!", { status: 400 });
        }

        const category = await db.category.findUnique({
            where: {
                id: categoryId
            }
        });

        return NextResponse.json(category)
    } catch (error) {
        console.log("[CATEGORY_FETCH]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


export async function PATCH(
    req: Request,
    { params } : { params: { categoryId: string } }
) {
    try {
        // const { userId } = auth();
        const { categoryId } = params;
        const { title } = await req.json()

        // if(!userId || !isTeacher(userId)) {
        //     return new NextResponse("Unauthorized request", { status: 401 })
        // }

        const category = await db.category.update({
            where: {
                id: categoryId
            },
            data: {
                name: title
            }
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log("[CATEGORY_ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}