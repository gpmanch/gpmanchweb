"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonCard from "./_components/person-card";
import { ApprovePersonModal } from "@/components/modals/approvePerson.modal";
import { ApproveGotrModal } from "@/components/modals/approveGotr.modal";

interface Category {
  id: string;
  name: string;
  subCategories?: { id: string; name: string }[];
}

interface Person {
  id: string;
  nameHi: string | null;
  nameEn: string | null;
  categoryId: string;
  subCategoryId?: string | null;
  img?: string | null;
  isApproved: boolean;
}

interface Gotr {
  id: string;
  nameHi: string;
  nameEn: string;
  isApproved: boolean;
}

export default function VerifyPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [gotrs, setGotrs] = useState<Gotr[]>([]);

  // modal state
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGotr, setSelectedGotr] = useState<Gotr | null>(null);
  const [isGotrModalOpen, setIsGotrModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await axios.get("/api/category");
        setCategories(catRes.data || []);

        const personRes = await axios.get("/api/person/unapproved");
        setPersons(personRes.data || []);

        // Fetch unapproved gotr
        const gotrRes = await axios.get("/api/gotr/unapproved");
        setGotrs(gotrRes.data || []);
      } catch (err) {
        console.error("Error fetching verify page data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!persons.length && !gotrs.length) {
    return <p className="text-center mt-10">✅ No unapproved persons or gotr</p>;
  }

  return (
    <div className="mx-auto max-w-6xl px-5 mt-10 min-h-88">
      <h1 className="text-center text-3xl font-bold mb-6 text-[#002352]">
        Verify Persons & Gotr
      </h1>

      <Tabs defaultValue={categories[0]?.id || "gotr"} className="w-full">
        <TabsList className="flex flex-wrap justify-center gap-2 mb-8">
          {categories
            .filter((cat) => cat.name !== "Gotr")
            .map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.name}
              </TabsTrigger>
            ))
          }
          <TabsTrigger value="gotr">Gotr</TabsTrigger>
        </TabsList>

        {/* Gotr Tab */}
        <TabsContent value="gotr">
          {gotrs.length > 0 ? (
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm mb-5">Click to approve/verify</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                {gotrs.map((gotr) => (
                  <div
                    key={gotr.id}
                    className="border rounded p-4 flex flex-col items-center cursor-pointer"
                    onClick={() => {
                      setSelectedGotr(gotr);
                      setIsGotrModalOpen(true);
                    }}
                  >
                    <div className="font-bold text-lg mb-2">{gotr.nameEn} / {gotr.nameHi}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No unapproved Gotr</p>
          )}
        </TabsContent>

        {/* Existing category tabs */}
        {categories
          .filter((cat) => cat.name !== "Gotr")
          .map((cat) => {
            const filtered = persons.filter((p) => p.categoryId === cat.id);
            return (
              <TabsContent key={cat.id} value={cat.id}>
                {filtered.length > 0 ? (
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-sm mb-5">Click to approve/verify</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                      {filtered.map((person, i) => (
                        <div
                          key={person.id}
                          onClick={() => {
                            setSelectedPerson(person);
                            setIsModalOpen(true);
                          }}
                          className="cursor-pointer"
                        >
                          <PersonCard person={person} index={i} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">
                    No unapproved persons in this category
                  </p>
                )}
              </TabsContent>
            );
          })}
      </Tabs>

      {selectedPerson && (
        <ApprovePersonModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPerson(null);
          }}
          categories={categories}
          person={selectedPerson} // ✅ pass person to modal
        />
      )}
      {selectedGotr && (
        <ApproveGotrModal
          isOpen={isGotrModalOpen}
          onClose={() => {
            setIsGotrModalOpen(false);
            setSelectedGotr(null);
          }}
          gotr={selectedGotr}
        />
      )}
    </div>
  );
}