import { db } from "@/lib/prisma";

export const getCategories = async () => {
  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
      heading: true,
      description: true,
      subCategory: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return categories;
};