import { useLanguage } from '@/components/language';
import React, { useMemo, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NewGotrModal } from '@/components/modals/newGotrModal.modal';

interface GotrProps {
  categoryId: string;
}

interface GotrItem {
  id: string;
  nameHi: string;
  nameEn: string;
}

const Gotr: React.FC<GotrProps> = ({ categoryId }) => {
  const { isHindi } = useLanguage();
  const [query, setQuery] = useState<string>('');
  const [gotras, setGotras] = useState<GotrItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showNewGotrModal, setShowNewGotrModal] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchGotras() {
      try {
        const res = await fetch('/api/gotr');
        if (!res.ok) throw new Error('Failed to fetch gotras');
        const data: GotrItem[] = await res.json();
        if (isMounted) setGotras(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchGotras();
    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  // Unique + sorted list
  const gotraList: string[] = useMemo(() => {
    const names = gotras
      .map((g) => (isHindi ? g.nameHi : g.nameEn))
      .filter((n): n is string => Boolean(n))
      .map((n) => n.trim());
    const unique = Array.from(new Set(names));
    unique.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    return unique;
  }, [gotras, isHindi]);

  // Search
  const filtered: string[] = useMemo(() => {
    if (!query.trim()) return gotraList;
    const q = query.toLowerCase();
    return gotraList.filter((name) => name.toLowerCase().includes(q));
  }, [gotraList, query]);

  return (
    <div className="mx-auto max-w-6xl px-5">
      {/* Search Input */}
      <div className="flex items-center justify-between mt-10 mb-6">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isHindi ? 'गोत्र खोजें... (Type to search)' : 'Search gotra... (Type to search)'}
          className="h-11 max-w-xs"
        />
        <Button
          className="bg-[#002352] text-white font-semibold shadow hover:bg-[#FFCA3C] hover:text-[#002352] transition-colors duration-500"
          onClick={() => setShowNewGotrModal(true)}
        >
          {isHindi ? "नया जोड़ें" : "Add New"}
        </Button>
      </div>
      <NewGotrModal
        isOpen={showNewGotrModal}
        onClose={() => setShowNewGotrModal(false)}
      />

      {/* Gotra List */}
      <div className="bg-white rounded-xl border shadow-sm p-4 sm:p-6">
        {loading ? (
          <div className="text-center text-slate-500 py-8">
            {isHindi ? 'लोड हो रहा है...' : 'Loading...'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10">
            {filtered.map((name, idx) => (
              <div key={`${name}-${idx}`} className="flex items-center gap-4 py-2 border-b">
                <span className="text-[#FFCA3C] font-bold text-xl w-6 text-right">
                  {idx + 1}.
                </span>
                <span className="text-[#0b234f] text-lg font-medium">
                  {name}
                </span>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center text-slate-500 py-8">
                {isHindi ? 'कोई परिणाम नहीं मिला' : 'No results found'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gotr;
