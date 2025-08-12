"use client";
import { useLanguage } from "@/components/language";

const items = [
  {
    titleHi: "8वीं शताब्दी",
    titleEn: "8th Century",
    descHi: "मिहिर भोज - गुर्जर प्रतिहार साम्राज्य का स्वर्ण युग",
    descEn: "Mihir Bhoj - The golden era of Gurjar Pratihar Empire",
  },
  {
    titleHi: "12वीं शताब्दी",
    titleEn: "12th Century",
    descHi: "रानी नायकी देवी - मुहम्मद गोरी को पराजित किया",
    descEn: "Queen Nayaki Devi - Defeated Muhammad Ghori",
  },
  {
    titleHi: "18वीं शताब्दी",
    titleEn: "18th Century",
    descHi: "बप्पा रावल - मेवाड़ के महान योद्धा",
    descEn: "Bappa Rawal - The great warrior of Mewar",
  },
  {
    titleHi: "1857",
    titleEn: "1857",
    descHi: "1857 की क्रांति में गुर्जरों का योगदान",
    descEn: "Gurjars’ contribution in the 1857 revolution",
  },
  {
    titleHi: "वर्तमान",
    titleEn: "Present",
    descHi: "आधुनिक भारत में गुर्जर समाज का विकास",
    descEn: "Development of Gurjar community in modern India",
  },
];

export default function HistorySection() {
  const { isHindi } = useLanguage();

  return (
    <section id="history" className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#002352]">
            {isHindi ? "गुर्जर इतिहास" : "Gurjar History"}
          </h2>
          <p className="text-[#666666] max-w-2xl mx-auto">
            {isHindi
              ? "प्राचीन काल से आधुनिक युग तक हमारी गौरव गाथा"
              : "Our glorious journey from ancient times to the modern era"}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Center vertical line (md and up) */}
          <div className="hidden md:block absolute left-1/2 -ml-[3px] top-0 bottom-0 w-[6px] bg-[#FFCA3C]" />

          {items.map((item, idx) => {
            const isRight = idx % 2 === 1;
            return (
              <div key={idx} className="relative my-6 md:flex md:items-start">
                {/* Dot marker */}
                <div className="hidden md:block absolute top-4 left-1/2 -translate-x-1/2 w-[25px] h-[25px] bg-white rounded-full border-4 border-[#FFCA3C] z-[1]" />

                {/* Left column card */}
                {!isRight ? (
                  <>
                    <div className="md:w-1/2 md:pr-10">
                      <div className="bg-white rounded-md shadow-[0_3px_10px_rgba(0,0,0,0.1)] p-6">
                        <h3 className="text-lg font-semibold text-[#002352] mb-2">
                          {isHindi ? item.titleHi : item.titleEn}
                        </h3>
                        <p className="text-[#666666]">{isHindi ? item.descHi : item.descEn}</p>
                      </div>
                    </div>
                    <div className="md:w-1/2" />
                  </>
                ) : (
                  <>
                    <div className="md:w-1/2" />
                    <div className="md:w-1/2 md:pl-10">
                      <div className="bg-white rounded-md shadow-[0_3px_10px_rgba(0,0,0,0.1)] p-6">
                        <h3 className="text-lg font-semibold text-[#002352] mb-2">
                          {isHindi ? item.titleHi : item.titleEn}
                        </h3>
                        <p className="text-[#666666]">{isHindi ? item.descHi : item.descEn}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}