import { db } from "@/lib/prisma";
import React from "react";
import VerifyPageClient from "./_components/verify-page-client";

export default async function VerifyPage() {
  // Fetch categories (excluding Gotr)
  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
      subCategory: { select: { id: true, name: true } },
    },
    orderBy: { name: "asc" },
  });

  // Fetch unapproved persons with pagination (first 50 for initial load)
  const persons = await db.person.findMany({
    where: { isApproved: false },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  // Fetch unapproved gotras with pagination (first 50 for initial load)
  const gotrs = await db.gotr.findMany({
    where: { isApproved: false },
    select: { id: true, nameHi: true, nameEn: true, isApproved: true },
    orderBy: { nameEn: "asc" },
    take: 50,
  });

  return <VerifyPageClient categories={categories} persons={persons} gotrs={gotrs} />;
}