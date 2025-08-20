"use client";
import Image from "next/image";
import React from "react";
import { useLanguage } from "@/components/language";

interface PersonCardProps {
    person: {
        id: string;
        nameHi: string | null;
        nameEn: string | null;
        description?: { hi: string | null; en: string | null };
        imageUrl?: string | null;
        award?: string | null;
    };
    index: number;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, index }) => {
    const { isHindi } = useLanguage();

    return (
        <div
            key={person.id}
            className="relative bg-white rounded-[1.2rem] shadow-[0_2px_16px_rgba(0,0,0,0.07)]
                p-7 pt-8 flex flex-col items-center text-center transition-transform
                hover:-translate-y-1.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.13)] border-t-[5px]"
        >
            {/* Number badge */}
            <div className="absolute -top-[22px] -left-[22px] bg-gradient-to-br from-[#FFCA3C] to-[#002352]
                text-white rounded-full w-12 h-12 flex items-center justify-center
                font-bold text-[1.2rem] shadow-[0_4px_16px_rgba(0,0,0,0.13)] border-4 border-white"
            >
                {index + 1}
            </div>

            {/* Avatar */}
            {
                person.imageUrl ? (
                    <div className="relative">
                        <Image
                            src={person.imageUrl}
                            width={120}
                            height={120}
                            alt={`${person.nameHi || ""} / ${person.nameEn || ""}`}
                            className="w-[120px] h-[120px] rounded-full object-cover border-[4px] border-white shadow-md mb-3"
                        />
                    </div>
                ) : (
                    <div className="w-[120px] h-[120px] bg-accent font-bold text-6xl text-[#002352] flex items-center justify-center rounded-full border-[4px] border-white shadow-md mb-3">
                        { person.nameEn?.charAt(0) }
                    </div>
                )
            }

            {/* Name */}
            <h2 className="text-[1.18rem] font-semibold text-[#002352] mb-1">
                {isHindi ? person.nameHi : person.nameEn}
            </h2>

            {/* Desc */}
            <div className="mt-1 text-[#666666] text-[0.98rem]">
                {isHindi ? person.description?.hi : person.description?.en}
            </div>

            {/* Award */}
            {person.award && (
                <div className="mt-1 text-[#666666] text-[0.98rem]">{person.award}</div>
            )}
        </div>
    );
};

export default PersonCard;