import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

const MAIN_CATEGORIES = [
  "Artists",
  "Award",
  "Gotr",
  "Politicians",
  "Services",
  "Sports",
];

export async function GET() {
  try {
    // Get all categories
    const categories = await db.category.findMany({
      select: { id: true, name: true },
    });

    // Map category name to id
    const nameToId = Object.fromEntries(categories.map((c) => [c.name, c.id]));

    // Count persons for each category except Gotr
    const counts: Record<string, number> = {};
    for (const name of MAIN_CATEGORIES) {
      if (name === "Gotr") {
        counts["Gotr"] = await db.gotr.count();
      } else {
        const categoryId = nameToId[name];
        if (categoryId) {
          counts[name] = await db.person.count({ where: { categoryId } });
        } else {
          counts[name] = 0;
        }
      }
    }
    return NextResponse.json(counts);
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
