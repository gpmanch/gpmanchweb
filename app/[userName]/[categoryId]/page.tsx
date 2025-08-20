"use client";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language";
import { NewPersonModal } from "@/components/modals/newPersonModal.modal";
import { Button } from "@/components/ui/button";
import Gotr from "./_components/gotr";
import PersonCard from "./_components/person-card";

interface SubCategory {
  id: string;
  name: string;
  categoryId?: string | null;
  category?: { name: string } | null;
}

interface Person {
  id: string;
  nameHi: string | null;
  nameEn: string | null;
  description?: {
    hi: string | null;
    en: string | null;
  }
  img?: string | null;

  categoryId: string;
  subCategoryId?: string | null;

  award?: string | null;
  cadre?: string | null;
  post?: string | null;
  sport?: string | null;
  profession?: string | null;

  order: number;
  isApproved: boolean;
}

interface PageProps {
  params: Promise<{ categoryId: string }>;
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { categoryId } = React.use(params);
  const { isHindi } = useLanguage();

  const [showNewPersonModal, setShowNewPersonModal] = useState(false);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [persons, setPersons] = useState<Person[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryHeading, setCategoryHeading] = useState<{ en?: string; hi?: string }>({});
  const [categoryDescription, setCategoryDescription] = useState<{ en?: string; hi?: string }>({});

  // Fetch category heading/description
  useEffect(() => {
    const fetchCategory = async () => {
      const isValidObjectId =
        typeof categoryId === "string" && /^[a-fA-F0-9]{24}$/.test(categoryId);
      if (!isValidObjectId) return;
      try {
        const response = await axios.get(`/api/category/${categoryId}`);
        setCategoryName(response.data?.name || "");
        setCategoryHeading(response.data.heading || {});
        setCategoryDescription(response.data.description || {});
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    fetchCategory();
  }, [categoryId]);

  // Fetch sub-categories for this category
  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const res = await fetch("/api/sub-category");
        if (!res.ok) {
          setSubCategories([]);
          return;
        }
        const data = await res.json();
        const list: SubCategory[] = Array.isArray(data) ? data : [];
        setSubCategories(list.filter((sub) => sub?.categoryId === categoryId));
      } catch {
        setSubCategories([]);
      }
    };
    fetchSubs();
  }, [categoryId]);

  // Fetch persons by category (new)
  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const res = await axios.get(`/api/person?categoryId=${categoryId}`);
        setPersons(res.data || []);
      } catch (err) {
        console.error("Error fetching persons:", err);
        setPersons([]);
      }
    };
    if (categoryId) fetchPersons();
  }, [categoryId]);

  // Dynamic counts
  const counts = useMemo(() => {
    const result: Record<string, number> = { all: persons.length };
    subCategories.forEach((sub) => {
      result[sub.id] = persons.filter((p) => p.subCategoryId === sub.id).length;
    });
    return result;
  }, [persons, subCategories]);

  // Dynamic filtering
  const filtered = useMemo(() => {
    if (filter === "all") return persons;
    return persons.filter((p) => p.subCategoryId === filter);
  }, [filter, persons]);

  // Dynamic label
  const getLabel = (id: string) => {
    if (id === "all") return isHindi ? "सभी" : "All";
    return subCategories.find((sub) => sub.id === id)?.name || id;
  };

  const headingText = isHindi ? categoryHeading.hi || "" : categoryHeading.en || "";
  const descriptionText = isHindi
    ? categoryDescription.hi || ""
    : categoryDescription.en || "";

  // Build minimal categories list for modal using current page category
  const categoriesForModal = useMemo(() => {
    if (!categoryName)
      return [] as { id: string; name: string; subCategories?: SubCategory[] }[];
    return [{ id: categoryId, name: categoryName, subCategories }];
  }, [categoryId, categoryName, subCategories]);

  return (
    <div className="mx-auto max-w-6xl px-5 mt-10 min-h-88">
      <h1 className="text-center text-3xl font-bold mb-4 text-[#002352]">
        {headingText || (isHindi ? "शीर्षक" : "Heading")}
      </h1>
      <p className="text-center mb-8 text-[#666666]">{descriptionText}</p>

      {/* Modal for adding new awardee */}
      <NewPersonModal
        isOpen={showNewPersonModal}
        onClose={() => setShowNewPersonModal(false)}
        categories={categoriesForModal}
      />

      {/* Grid */}
      {categoryName === "Gotr" ? (
        <Gotr categoryId={categoryId} />
      ) : (
        <>
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
      )}
    </div>
  );
};

export default Page;