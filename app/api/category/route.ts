import { db } from "@/lib/prisma";
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
) {
    try {
        // const { userId } = auth();
        const { title, headingEn, headingHi, descriptionEn, descriptionHi } = await req.json()

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

        const categoryData = {
            name: title,
            heading: { en: headingEn, hi: headingHi },
            description: { en: descriptionEn, hi: descriptionHi },
        };

        const category = await db.category.create({
            data: categoryData
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log("[CATEGORY]", error);
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
            orderBy: {
                name: "asc"
            }
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.log("[GET_CATEGORIES]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}