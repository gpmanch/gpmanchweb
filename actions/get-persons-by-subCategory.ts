import { db } from "@/lib/prisma";

export const getPersonsBySubCategory = async (subCategoryId: string) => {
  try {
    const persons = await db.person.findMany({
      where: {
        subCategoryId: subCategoryId,
        isApproved: true,
      },
      select: {
        id: true,
        nameHi: true,
        nameEn: true,
        description: true,
        imageUrl: true,
        order: true,
      },
      orderBy: {
        order: "asc",
      },
    });

    return persons;
  } catch (error) {
    console.error("[GET_PERSONS_BY_SUB_CATEGORY]", error);
    return [];
  }
};
