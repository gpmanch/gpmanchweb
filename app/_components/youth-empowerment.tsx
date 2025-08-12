"use client";

import Image from "next/image";
import { useLanguage } from "@/components/language";

const Items = [
  {
    imgUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    alt: "Scholarship",
    titleHi: "छात्रवृत्ति कार्यक्रम",
    titleEn: "Scholarship Program",
    descHi: "मेधावी छात्रों को वित्तीय सहायता",
    descEn: "Financial support for meritorious students",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80",
    alt: "Coaching",
    titleHi: "कोचिंग सहायता",
    titleEn: "Coaching Assistance",
    descHi: "UPSC, SSC और अन्य प्रतियोगी परीक्षाओं के लिए मार्गदर्शन",
    descEn: "Guidance for UPSC, SSC and other competitive exams",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80",
    alt: "Success Stories",
    titleHi: "सफलता की कहानियाँ",
    titleEn: "Success Stories",
    descHi: "गुर्जर समाज के सफल युवाओं से प्रेरणा",
    descEn: "Inspiration from successful youth of Gurjar community",
  },
]

export default function YouthEmpowerment() {
  const { isHindi } = useLanguage();
  return (
    <section id="youth" className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#002352]">
            {isHindi ? "युवा सशक्तिकरण" : "Youth Empowerment"}
          </h2>
          <p className="text-[#666666] max-w-2xl mx-auto">
            {isHindi
              ? "हमारे युवाओं को सफलता के लिए तैयार करना"
              : "Preparing our youth for success"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            Items.map((item, idx) =>(
              <div key={idx} className="bg-white rounded-[10px] overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
                <Image
                  src={item.imgUrl}
                  alt={item.alt}
                  width={800}
                  height={400}
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-5">
                  <h3 className="text-[1.3rem] font-semibold text-[#002352] mb-2">
                    {isHindi ? item.titleHi : item.titleEn}
                  </h3>
                  <p className="text-[#666666] mb-2">
                    {isHindi ? item.descHi : item.descEn }
                  </p>
                  <a href="#" className="text-[#002352] font-semibold hover:text-[#FFCA3C] transition-colors">
                    {isHindi ? "और जानें →" : "Learn More →"}
                  </a>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
}
