import { db } from "@/lib/prisma";
import { InfoCard } from "./_components/info-card";
import { Award, Clapperboard, Users, User2, UserStar, Volleyball } from 'lucide-react';
import React from "react";

const CATEGORY_LABELS = [
  { name: 'Artists', icon: Clapperboard },
  { name: 'Award', icon: Award },
  { name: 'Gotr', icon: Users },
  { name: 'Politicians', icon: User2 },
  { name: 'Services', icon: UserStar },
  { name: 'Sports', icon: Volleyball },
];

async function getCategoryCounts() {
  const categories = await db.category.findMany({
    select: { id: true, name: true },
  });
  const nameToId = Object.fromEntries(categories.map((c) => [c.name, c.id]));
  const counts: Record<string, number> = {};
  for (const { name } of CATEGORY_LABELS) {
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
  return counts;
}

const InfoCards = ({ counts }: { counts: Record<string, number> }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    {CATEGORY_LABELS.map(({ name, icon }) => (
      <InfoCard
        key={name}
        title={name}
        value={counts[name]?.toString() ?? '0'}
        change=""
        icon={icon}
      />
    ))}
  </div>
);

export default async function Page() {
  const counts = await getCategoryCounts();
  return (
    <div className="flex h-screen bg-gray-100 pt-10">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4">
          {/* Stats Cards */}
          <InfoCards counts={counts} />
        </main>
      </div>
    </div>
  );
}