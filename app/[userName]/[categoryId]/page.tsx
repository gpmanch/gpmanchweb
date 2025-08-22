import { db } from "@/lib/prisma";
import React from "react";
import FilterGrid from "./_components/filter-grid";
import Gotr from "./_components/gotr";

interface PageProps {
  params: Promise<{ categoryId: string; userName: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { categoryId } = await params;

  // Fetch category data
  const category = await db.category.findUnique({
    where: { id: categoryId },
    select: {
      id: true,
      name: true,
      heading: true,
      description: true,
    },
  });

  if (!category) {
    return <div>Category not found</div>;
  }

  // Fetch sub-categories for this category
  const subCategories = await db.subCategory.findMany({
    where: { categoryId },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  // Fetch approved persons for this category
  const persons = await db.person.findMany({
    where: {
      categoryId,
      isApproved: true,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          heading: true,
          description: true,
        },
      },
      subCategory: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { order: "asc" },
  });

  // Transform persons to match expected interface
  const transformedPersons = persons.map(person => ({
    ...person,
    description: person.description as { hi: string | null; en: string | null } | undefined,
    category: {
      ...person.category,
      heading: person.category.heading as { hi?: string; en?: string },
      description: person.category.description as { hi?: string; en?: string },
    },
    subCategory: person.subCategory || undefined,
  }));

  // Fetch approved gotras
  const gotras = await db.gotr.findMany({
    where: { isApproved: true },
    select: { id: true, nameHi: true, nameEn: true },
    orderBy: { nameEn: "asc" },
  });

  // Prepare categories for modal (with sub-categories)
  const categoriesForModal = await db.category.findMany({
    select: {
      id: true,
      name: true,
      subCategory: {
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      },
    },
    orderBy: { name: "asc" },
  });

  // Transform categories to match expected interface
  const transformedCategories = categoriesForModal.map(cat => ({
    id: cat.id,
    name: cat.name,
    subCategories: cat.subCategory,
  }));

  return (
    <div className="mx-auto max-w-6xl px-5 mt-10 min-h-88">
      {category.name === "Gotr" ? (
        <Gotr gotras={gotras} />
      ) : (
        <FilterGrid
          persons={transformedPersons}
          subCategories={subCategories}
          categoriesForModal={transformedCategories}
        />
      )}
    </div>
  );
}