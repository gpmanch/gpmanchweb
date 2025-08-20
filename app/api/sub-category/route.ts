import { db } from "@/lib/prisma";
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
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
        console.log("[SUB_CATEGORY]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function GET() {
    try {
      // Example fetch from DB
      const subs = await db.subCategory.findMany();
      return NextResponse.json(subs);
    } catch (error) {
      console.error("Error fetching sub-categories:", error);
      return NextResponse.json({ error: "Failed to fetch sub-categories" }, { status: 500 });
    }
  }