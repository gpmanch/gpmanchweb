import { db } from "@/lib/prisma";

export const getSubCategories = async () => {
  try {
    const subCategories = await db.subCategory.findMany({
      select: {
        id: true,
        name: true,
        category: {
          select: {
            name: true,
          },
        }
      },
      orderBy: {
        name: "asc",
      },
    });

    return subCategories;
  } catch (error) {
    console.error("[GET_SUB_CATEGORIES]", error);
    return [];
  }
};