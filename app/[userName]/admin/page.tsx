"use client";
import React, { useEffect, useState } from 'react'
import { Award, Clapperboard, Users, User2, UserStar, Volleyball } from 'lucide-react'
import axios from 'axios';
import { InfoCard } from './_components/info-card';

const CATEGORY_LABELS = [
  { name: 'Artists', icon: Clapperboard },
  { name: 'Award', icon: Award },
  { name: 'Gotr', icon: Users },
  { name: 'Politicians', icon: User2 },
  { name: 'Services', icon: UserStar },
  { name: 'Sports', icon: Volleyball },
];

const Page = () => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    axios.get('/api/category-counts').then(res => {
      setCounts(res.data || {});
    });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 pt-10">

      <div className="flex-1 flex flex-col overflow-hidden">

        <main className="flex-1 overflow-y-auto p-4">
          {/* Stats Cards */}
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
        </main>
      </div>
    </div>
  )
}

export default Page;