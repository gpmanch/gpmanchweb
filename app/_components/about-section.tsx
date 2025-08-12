"use client";
import { useLanguage } from "@/components/language";

const Data = [
  {
    icon: "fa-landmark",
    titleHi: "इतिहास जागरूकता",
    titleEn: "History Awareness",
    descHi: "हमारे गौरवशाली इतिहास को संरक्षित और प्रसारित करना",
    descEn: "Preserving and spreading our glorious history",
  },
  {
    icon: "fa-graduation-cap",
    titleHi: "युवा सशक्तिकरण",
    titleEn: "Youth Empowerment",
    descHi: "युवाओं को शिक्षा और रोजगार के लिए प्रेरित करना",
    descEn: "Inspiring youth for education and employment",
  },
  {
    icon: "fa-hands-helping",
    titleHi: "सामाजिक न्याय",
    titleEn: "Social Justice",
    descHi: "समाज के हर वर्ग के अधिकारों के लिए संघर्ष",
    descEn: "Fighting for the rights of every section of society",
  },
]

export default function AboutSection() {
  const { isHindi } = useLanguage();
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#002352]">
            {isHindi ? "हमारे बारे में" : "About Us"}
          </h2>
          <p className="text-[#666666] max-w-2xl mx-auto">
            {isHindi
              ? "गुर्जर समाज की प्रगति के लिए समर्पित संगठन"
              : "An organization dedicated to the progress of the Gurjar community"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {Data.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[10px] p-8 shadow-[0_5px_15px_rgba(0,0,0,0.1)] text-center transition-transform hover:-translate-y-2"
            >
              <i className={`fas ${card.icon} text-[3rem] text-[#FFCA3C] mb-5`} />
              <h3 className="text-xl font-semibold text-[#002352] mb-4">
                {isHindi ? card.titleHi : card.titleEn}
              </h3>
              <p className="text-[#666666]">
                {isHindi ? card.descHi : card.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
