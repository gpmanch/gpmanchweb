import { db } from "@/lib/prisma";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCategories = async (): Promise<{ id: string; name: string; heading: any; description: any }[]> => {
    try {
        const categories = await db.category.findMany({
            select: {
                name: true,
                id: true,
                heading: true,
                description: true,
            },
            orderBy: {
                name: "asc"
            }
        })

        return categories;
    } catch (error) {
        console.log("[GET_CATEGORIES: ", error);
        return [];
    }
}