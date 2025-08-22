"use client";
import React from "react";
import { useLanguage } from "@/components/language";
import { NewPersonModal } from "@/components/modals/newPersonModal.modal";
import { Button } from "@/components/ui/button";
import PersonCard from "./person-card";

interface SubCategory {
  id: string;
  name: string;
  categoryId?: string | null;
}

interface Person {
  id: string;
  nameHi: string | null;
  nameEn: string | null;
  description?: { hi: string | null; en: string | null };
  imageUrl?: string | null;
  categoryId: string;
  subCategoryId?: string | null;
  award?: string | null;
  cadre?: string | null;
  post?: string | null;
  sport?: string | null;
  profession?: string | null;
  order: number;
  isApproved: boolean;
  category?: {
    id: string;
    name: string;
    heading: { hi?: string; en?: string };
    description: { hi?: string; en?: string };
  };
  subCategory?: {
    id: string;
    name: string;
  };
}

interface FilterGridProps {
  persons: Person[];
  subCategories: SubCategory[];
  categoriesForModal: { id: string; name: string; subCategories: SubCategory[] }[];
}

const FilterGrid: React.FC<FilterGridProps> = ({ persons, subCategories, categoriesForModal }) => {
  const { isHindi } = useLanguage();
  const [filter, setFilter] = React.useState<string>("all");
  const filtered = React.useMemo(
    () =>
      filter === "all"
        ? persons
        : persons.filter((p) => p.subCategoryId === filter),
    [filter, persons]
  );
  const counts: Record<string, number> = { all: persons.length };
  subCategories.forEach((sub) => {
    counts[sub.id] = persons.filter((p) => p.subCategoryId === sub.id).length;
  });
  const getLabel = (id: string) => {
    if (id === "all") return isHindi ? "सभी" : "All";
    return subCategories.find((sub) => sub.id === id)?.name || id;
  };
  const [showNewPersonModal, setShowNewPersonModal] = React.useState(false);
  // Heading/description logic moved here
  const heading = persons[0]?.category?.heading || {};
  const description = persons[0]?.category?.description || {};
  return (
    <>
      <h1 className="text-center text-3xl font-bold mb-4 text-[#002352]">
        { isHindi ? heading.hi : heading.en }
      </h1>
      <p className="text-center mb-8 text-[#666666]">{ isHindi ? description.hi : description.en }</p>
      <NewPersonModal
        isOpen={showNewPersonModal}
        onClose={() => setShowNewPersonModal(false)}
        categories={categoriesForModal}
        activeCategoryId={persons[0]?.categoryId || categoriesForModal[0]?.id}
      />
      {/* Filter bar */}
      <div className={`flex justify-between gap-5`}>
        <div className="flex justify-start gap-3 mb-7 flex-wrap px-1">
          {["all", ...subCategories.map((sub) => sub.id)].map((key) => {
            const active = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`relative z-[1] mb-1 rounded-full border-2 px-6 py-2 text-[1rem] font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all ${
                  active
                    ? "bg-[#FFCA3C] text-[#002352] border-[#FFCA3C] -translate-y-[2px] scale-[1.06] shadow-[0_4px_16px_rgba(255,202,60,0.13)]"
                    : "bg-white text-[#002352] border-[#002352] hover:bg-[#002352] hover:text-white hover:border-[#002352] -translate-y-[1px] scale-[1.03]"
                }`}
              >
                {getLabel(key)} ({counts[key] || 0})
              </button>
            );
          })}
        </div>
        <Button
          className="bg-[#002352] text-white font-semibold shadow hover:bg-[#FFCA3C] hover:text-[#002352] transition-colors duration-500"
          onClick={() => setShowNewPersonModal(true)}
        >
          {isHindi ? "नया जोड़ें" : "Add New"}
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mb-10">
        {filtered.map((person, i) => (
          <PersonCard key={person.id} person={person} index={i} />
        ))}
      </div>
    </>
  );
};

export default FilterGrid;
