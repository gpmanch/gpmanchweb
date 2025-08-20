import { db } from "@/lib/prisma";
import { SubCategory } from "@prisma/client";

export const getSubCategories = async (): Promise<(SubCategory & { category: { name: string } | null })[]> => { // Allow category to be null
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
            ...subCategory,
            category: subCategory.category,
        }));
    } catch (error) {
        console.log("[GET_SUB_CATEGORIES: ", error);
        return [];
    }
};