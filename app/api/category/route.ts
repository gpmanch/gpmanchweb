import { db } from "@/lib/prisma";
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
) {
    try {
        // const { userId } = auth();
        const { title } = await req.json()

        // if(!userId || !isTeacher(userId)) {
        //     return new NextResponse("Unauthorized request", { status: 401 })
        // }

        const existingCategory = await db.category.findFirst({
            where: {
                name: title
            }
        });

        if (existingCategory) {
            return new NextResponse("Category already exists", { status: 400 });
        }

        const category = await db.category.create({
            data: {
                name: title,
            }
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log("[CATEGORY]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}