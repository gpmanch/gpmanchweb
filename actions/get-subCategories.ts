import { db } from "@/lib/prisma";

export const getSubCategories = async (): Promise<{ id: string; name: string; categoryId: string | null; category: { name: string } | null }[]> => { // Allow category to be null
    try {
        const subCategories = await db.subCategory.findMany({
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                name: "asc",
            },
        });

        return subCategories.map(subCategory => ({
            id: subCategory.id,
            name: subCategory.name,
            category: subCategory.category,
            categoryId: subCategory.categoryId,
        }));
    } catch (error) {
        console.log("[GET_SUB_CATEGORIES: ", error);
        return [];
    }
};