import { db } from "@/lib/prisma";

export const getPersonsBySubCategory = async (subCategoryId: string) => {
  try {
    const persons = await db.person.findMany({
      where: {
        subCategoryId,
        isApproved: true,
      },
      include: {
        subCategory: true,
        category: true,
      },
      orderBy: { order: "asc" },
    });

    return persons;
  } catch (error) {
    console.log("[GET_PERSONS_BY_SUBCATEGORY]", error);
    return [];
  }
};
