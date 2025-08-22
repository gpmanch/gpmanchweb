import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function POST(
    req: NextRequest,
) {
    try {
        // const { userId } = auth();
        const { title, categoryId } = await req.json()

        // if(!userId || !isTeacher(userId)) {
        //     return new NextResponse("Unauthorized request", { status: 401 })
        // }

        const existingCategory = await db.subCategory.findFirst({
            where: {
                name: title
            }
        });

        if (existingCategory) {
            return new NextResponse("Sub-Category already exists", { status: 400 });
        }

        const category = await db.subCategory.create({
            data: {
                name: title,
                categoryId: categoryId,
            }
        })

        return NextResponse.json(category)
    } catch (error) {
        console.error("[SUB_CATEGORY]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}