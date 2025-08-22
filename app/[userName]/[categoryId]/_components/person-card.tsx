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
        cadre?: string | null;
        post?: string | null;
        sport?: string | null;
        profession?: string | null;
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
                hover:-translate-y-1.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.13)] border-t-[5px] border-t-[#002352]"
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
                            sizes="(max-width: 640px) 120px, (max-width: 768px) 120px, (max-width: 1024px) 120px, 120px"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                            priority={index < 4} // Priority for first 4 images (above the fold)
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

            {/* Award */}
            {person.award && (
                <div className="mt-1 text-[#666666] text-[0.98rem]"><b>{isHindi ? "पुरस्कार/योगदान:" : "Award/Contribution:" }</b>{" "}{person.award}</div>
            )}
            {person.cadre && (
                <div className="mt-1 text-[#666666] text-[0.98rem]"><b>{isHindi ? "कैडर/पद:" : "Cadre/Post:" }</b>{" "}{person.cadre}</div>
            )}
            {person.post && (
                <div className="mt-1 text-[#666666] text-[0.98rem]"><b>{isHindi ? "विधानसभा क्षेत्र/पद:" : "Constituency/Post:" }</b>{" "}{person.post}</div>
            )}
            {person.sport && (
                <div className="mt-1 text-[#666666] text-[0.98rem]"><b>{isHindi ? "खेल:" : "Sport:" }</b>{" "}{person.sport}</div>
            )}
            {person.profession && (
                <div className="mt-1 text-[#666666] text-[0.98rem]"><b>{isHindi ? "पेशा:" : "Profession:" }</b>{" "}{person.profession}</div>
            )}

            {/* Desc */}
            <div className="mt-1 text-[#666666] text-[0.98rem]">
                {isHindi ? person.description?.hi : person.description?.en}
            </div>
        </div>
    );
};

export default PersonCard;