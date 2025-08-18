"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/components/language";
import Image from "next/image";

type AwardType = "civilian" | "sports" | "gallantry" | "other";

type Awardee = {
  name_hi: string;
  name_en: string;
  desc_hi: string;
  desc_en: string;
  award_hi: string;
  award_en: string;
  img: string;
  type: AwardType;
};

const AWARDEES: Awardee[] = [
  // Civilian
  {
    name_hi: "मियाँ बशीर अहमद",
    name_en: "Mian Bashir Ahmed",
    desc_hi: "जम्मू-कश्मीर से प्रमुख गुर्जर नेता और सूफी संत, समाज सेवा में योगदान।",
    desc_en: "Prominent Gurjar leader and Sufi saint from J&K, contributed to social service.",
    award_hi: "पद्म भूषण (2008)",
    award_en: "Padma Bhushan (2008)",
    img: "/award/Mian-Bashir-Ahmed.png",
    type: "civilian",
  },
  {
    name_hi: "ओमप्रकाश गांधी",
    name_en: "Omprakash Gandhi",
    desc_hi: "देवधर गुरुकुल के संस्थापक, शिक्षा और समाज सेवा में योगदान।",
    desc_en: "Founder of Devdhar Gurukul, contributed to education and social service.",
    award_hi: "पद्म श्री",
    award_en: "Padma Shri",
    img: "/award/Omprakash-Gandhi.png",
    type: "civilian",
  },
  {
    name_hi: "डॉ. कोमल गुर्जर",
    name_en: "Dr. Komal Gurjar",
    desc_hi: "महिला सशक्तिकरण और समाज सेवा में उत्कृष्ट योगदान।",
    desc_en: "Outstanding contribution in women empowerment and social service.",
    award_hi: "स्त्री शक्ति सम्मान (2020), नारी शक्ति पुरस्कार",
    award_en: "Stree Shakti Samman (2020), Nari Shakti Award",
    img: "/ips/Dr.-Komal-Gurjar.png",
    type: "civilian",
  },
  {
    name_hi: "डॉ. शिवदयाल गुर्जर",
    name_en: "Dr. Shivdayal Gurjar",
    desc_hi: "शिक्षा के क्षेत्र में विशिष्ट योगदान के लिए सम्मानित।",
    desc_en: "Honored for distinguished contribution in education.",
    award_hi: "राज्य स्तरीय शिक्षक पुरस्कार",
    award_en: "State Level Teacher Award",
    img: "/ips/Dr.-Shivdayal-Gurjar.png",
    type: "civilian",
  },
  {
    name_hi: "राजीव कुमार रावल",
    name_en: "Rajiv Kumar Rawal",
    desc_hi: "पुलिस सेवा में उत्कृष्ट योगदान और वीरता के लिए सम्मानित।",
    desc_en: "Honored for outstanding service and bravery in police service.",
    award_hi: "पुलिस मेडल फॉर गैलेंट्री",
    award_en: "Police Medal for Gallantry",
    img: "/ips/Rajiv-Kumar-Rawal.png",
    type: "civilian",
  },
  {
    name_hi: "राजेश कुमार गुर्जर",
    name_en: "Rajesh Kumar Gurjar",
    desc_hi: "पुलिस सेवा में विशिष्ट योगदान के लिए राष्ट्रपति पदक से सम्मानित।",
    desc_en: "Awarded President's Police Medal for Distinguished Service.",
    award_hi: "राष्ट्रपति पुलिस मेडल",
    award_en: "President's Police Medal",
    img: "/ips/Rajesh-Kumar-Gurjar.png",
    type: "civilian",
  },
  {
    name_hi: "विजय बिधुड़ी",
    name_en: "Vijay Bidhuri",
    desc_hi: "दिल्ली पुलिस कमिश्नर, पुलिस सेवा में उत्कृष्ट योगदान।",
    desc_en: "Delhi Police Commissioner, excellence in police service.",
    award_hi: "विशिष्ट सेवा पदक",
    award_en: "Distinguished Service Medal",
    img: "/ips/Vijay-Bidhuri.png",
    type: "civilian",
  },
  {
    name_hi: "राणी नागर",
    name_en: "Rani Nagar",
    desc_hi: "यूपीएससी सिविल सेवा में उत्कृष्ट रैंक प्राप्त की।",
    desc_en: "Achieved outstanding rank in UPSC Civil Services.",
    award_hi: "प्रशासनिक सेवा में विशिष्ट योगदान",
    award_en: "Distinguished contribution in Administrative Services",
    img: "/ips/Rani-Nagar.png",
    type: "civilian",
  },
  {
    name_hi: "ऋतिका लोहामोर गुर्जर",
    name_en: "Ritika Lohomor Gurjar",
    desc_hi: "पुलिस सेवा में विशेष योगदान और उत्कृष्ट कार्य।",
    desc_en: "Special contribution and excellence in police service.",
    award_hi: "विशिष्ट सेवा सम्मान",
    award_en: "Distinguished Service Award",
    img: "/ips/Ritika-Lohomor-Gurjar.png",
    type: "civilian",
  },
  // Sports
  {
    name_hi: "सुंदर सिंह गुर्जर",
    name_en: "Sundar Singh Gurjar",
    desc_hi: "पैरा एथलीट (भाला फेंक), विश्व रिकॉर्ड धारक और एशियाई पैरा गेम्स में स्वर्ण पदक विजेता।",
    desc_en: "Para athlete (javelin), world record holder and Asian Para Games gold medalist.",
    award_hi: "अर्जुन पुरस्कार (2019)",
    award_en: "Arjuna Award (2019)",
    img: "/award/Sundar-Singh-Gurjar.png",
    type: "sports",
  },
  {
    name_hi: "महेंद्र गुर्जर",
    name_en: "Mahendra Gurjar",
    desc_hi: "F42 भाला फेंक और लंबी कूद में स्वर्ण पदक विजेता (नॉटविल वर्ल्ड पैरा एथलेटिक्स ग्रांड प्रिक्स)।",
    desc_en: "Gold medalist in F42 javelin and long jump (Nottwil World Para Athletics Grand Prix).",
    award_hi: "पैरा एथलेटिक्स में विश्व रिकॉर्ड",
    award_en: "World Record in Para Athletics",
    img: "/award/Mahendra-Gurjar.png",
    type: "sports",
  },
  // Gallantry
  {
    name_hi: "कमल राम",
    name_en: "Kamal Ram",
    desc_hi: "द्वितीय विश्व युद्ध में वीरता के लिए सर्वोच्च ब्रिटिश और कॉमनवेल्थ पुरस्कार प्राप्तकर्ता।",
    desc_en: "Victoria Cross recipient for gallantry in WWII.",
    award_hi: "विक्टोरिया क्रॉस",
    award_en: "Victoria Cross",
    img: "/award/Kamal-Ram.png",
    type: "gallantry",
  },
  {
    name_hi: "धन सिंह गुर्जर",
    name_en: "Dhan Singh Gurjar",
    desc_hi: "मेरठ में ब्रिटिश सेना के खिलाफ विद्रोह का नेतृत्व किया। (यह एक वीरतापूर्ण कार्य है, हालांकि विशिष्ट सरकारी पुरस्कार का उल्लेख नहीं है)",
    desc_en: "Led the revolt against British in Meerut (heroic act, not a specific government award).",
    award_hi: "1857 के स्वतंत्रता संग्राम के नायक",
    award_en: "Hero of 1857 Freedom Struggle",
    img: "/award/Dhan-Singh-Gurjar.png",
    type: "gallantry",
  },
  {
    name_hi: "कुलदीप सिंह चांदपुरी",
    name_en: "Kuldip Singh Chandpuri",
    desc_hi: "लोंगेवाला के युद्ध में वीरता के लिए सम्मानित भारतीय सेना के सेवानिवृत्त अधिकारी।",
    desc_en: "Indian Army officer honored for gallantry at Battle of Longewala.",
    award_hi: "महावीर चक्र",
    award_en: "Maha Vir Chakra",
    img: "/award/Kuldip-Singh-Chandpuri.png",
    type: "gallantry",
  },
  {
    name_hi: "घनश्याम गुर्जर (शहीद)",
    name_en: "Ghanshyam Gurjar (Martyr)",
    desc_hi: "श्रीनगर में आतंकवादी हमले में शहीद हुए सशस्त्र सीमा बल के जवान।",
    desc_en: "Martyred SSB jawan in Srinagar terror attack.",
    award_hi: "राजकीय सम्मान के साथ अंतिम संस्कार",
    award_en: "State Honors at Funeral",
    img: "/award/Ghanshyam-Gurjar.png",
    type: "gallantry",
  },
  {
    name_hi: "परिक्षित खटाना",
    name_en: "Parikshit Khatana",
    desc_hi: "पुलिस सेवा में असाधारण वीरता और साहस का प्रदर्शन।",
    desc_en: "Demonstrated exceptional bravery and courage in police service.",
    award_hi: "वीरता के लिए प्रतिष्ठित पुलिस मेडल",
    award_en: "Prestigious Police Medal for Gallantry",
    img: "/ips/Parikshit-Khatana.png",
    type: "gallantry",
  },
  {
    name_hi: "जोगिंदर सिंह",
    name_en: "Joginder Singh",
    desc_hi: "कर्तव्य के दौरान असाधारण वीरता का प्रदर्शन।",
    desc_en: "Demonstrated extraordinary bravery during duty.",
    award_hi: "पुलिस वीरता पदक",
    award_en: "Police Gallantry Medal",
    img: "/ips/Joginder-Singh.png",
    type: "gallantry",
  },
  {
    name_hi: "परमल सिंह गुर्जर खटाना",
    name_en: "Parmal Singh Gurjar Khatana",
    desc_hi: "विशेष परिस्थितियों में वीरता और साहस का प्रदर्शन।",
    desc_en: "Demonstrated bravery and courage in special circumstances.",
    award_hi: "राष्ट्रपति पुलिस मेडल फॉर गैलेंट्री",
    award_en: "President's Police Medal for Gallantry",
    img: "/ips/Parmal-Singh-Gurjar-Khatana.png",
    type: "gallantry",
  },
  // Other
  {
    name_hi: "जावेद राही",
    name_en: "Javaid Rahi",
    desc_hi: "गुजरी/गोजरी, उर्दू और अंग्रेजी में 12 पुस्तकें लिखीं, गुर्जर और बकरवाल समुदायों के इतिहास, संस्कृति और साहित्य पर 300+ पुस्तकों/पत्रिकाओं का संपादन किया।",
    desc_en: "Authored 12 books in Gojri/Urdu/English, edited 300+ books/journals on Gurjar/Bakarwal history, culture, literature.",
    award_hi: "गुर्जर शोधकर्ता और लेखक",
    award_en: "Gurjar Researcher & Author",
    img: "/award/Javaid-Rahi.png",
    type: "other",
  },
  {
    name_hi: "बी. आर. गुर्जर",
    name_en: "B. R. Gurjar",
    desc_hi: "आईआईटी रुड़की से संबंधित, पर्यावरण उत्कृष्टता पुरस्कार और राष्ट्रीय डिजाइन पुरस्कार प्राप्तकर्ता।",
    desc_en: "IIT Roorkee, recipient of Environmental Excellence & National Design Awards.",
    award_hi: "पर्यावरण इंजीनियरिंग में विशेषज्ञ",
    award_en: "Expert in Environmental Engineering",
    img: "/award/Bhola-Gurjar.png",
    type: "other",
  },
];

const TYPE_LABELS = {
  all: { hi: "सभी", en: "All" },
  civilian: { hi: "नागरिक सम्मान", en: "Civilian" },
  sports: { hi: "खेल", en: "Sports" },
  gallantry: { hi: "वीरता", en: "Gallantry" },
  other: { hi: "अन्य", en: "Other" },
} as const;

const TYPE_ACCENT: Record<AwardType, string> = {
  civilian: "border-t-[#002352]",
  sports: "border-t-[#28a745]",
  gallantry: "border-t-[#dc3545]",
  other: "border-t-[#6c757d]",
};

export default function AwardPage() {
  const { isHindi } = useLanguage();
  const [filter, setFilter] = useState<"all" | AwardType>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return AWARDEES;
    return AWARDEES.filter((a) => a.type === filter);
  }, [filter]);

  const counts = useMemo(() => {
    return {
      all: AWARDEES.length,
      civilian: AWARDEES.filter((a) => a.type === "civilian").length,
      sports: AWARDEES.filter((a) => a.type === "sports").length,
      gallantry: AWARDEES.filter((a) => a.type === "gallantry").length,
      other: AWARDEES.filter((a) => a.type === "other").length,
    } as const;
  }, []);

  return (
    <>
      {/* Hero bar */}
      <section className="w-full h-[150px] bg-gradient-to-r from-[#f5f5f5] to-[#e0e0e0] flex items-center justify-center text-[2rem] font-bold text-[#444] mt-[90px] mb-5">
        {isHindi ? "गुर्जर समाज के पुरस्कार विजेता" : "Awardees of Gurjar Samaj"}
      </section>

      <div className="mx-auto max-w-6xl px-5">
        <h1 className="text-center text-3xl font-bold mb-4 text-[#002352]">
          {isHindi ? "गुर्जर पुरस्कार विजेता" : "Gurjar Awardees"}
        </h1>
        <p className="text-center mb-8 text-[#666666]">
          {isHindi
            ? "यहाँ गुर्जर समुदाय से संबंधित उन प्रमुख व्यक्तियों के नाम और उनके विवरण दिए गए हैं, जिन्हें विभिन्न सरकारी पुरस्कारों से सम्मानित किया गया है या जिन्होंने खेलों में उत्कृष्ट प्रदर्शन किया है।"
            : "Here are some prominent Gurjar personalities who have been honored with various government awards or have excelled in sports."}
        </p>

        {/* Filter bar */}
        <div className="flex justify-center gap-3 mb-7 flex-wrap px-1">
          {(["all", "civilian", "sports", "gallantry", "other"] as const).map(
            (key) => {
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
                  {isHindi ? TYPE_LABELS[key].hi : TYPE_LABELS[key].en} ({
                    counts[key]
                  })
                </button>
              );
            }
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mb-10">
          {filtered.map((a, i) => (
            <div
              key={`${a.name_en}-${i}`}
              className={`relative bg-white rounded-[1.2rem] shadow-[0_2px_16px_rgba(0,0,0,0.07)] p-7 pt-8 flex flex-col items-center text-center transition-transform hover:-translate-y-1.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.13)] border-t-[5px] ${TYPE_ACCENT[a.type]}`}
            >
              {/* Number badge */}
              <div className="absolute -top-[22px] -left-[22px] bg-gradient-to-br from-[#FFCA3C] to-[#002352] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-[1.2rem] shadow-[0_4px_16px_rgba(0,0,0,0.13)] border-4 border-white">
                {i + 1}
              </div>
              {/* Avatar */}
              <Image
                src={a.img}
                width={110}
                height={110}
                alt={`${a.name_hi} / ${a.name_en}`}
                className="w-[110px] h-[110px] rounded-full object-cover border-4 bg-[#f9f9f9] border-[#f9f9f9] mb-3"
              />
              {/* Name */}
              <h2 className="text-[1.18rem] font-semibold text-[#002352] mb-1">
                {isHindi ? a.name_hi : a.name_en}
              </h2>
              {/* Award */}
              <p className="m-0 text-[#666666] text-[1rem]">
                <b>{isHindi ? "पुरस्कार/योगदान:" : "Award/Contribution:"}</b>{" "}
                {isHindi ? a.award_hi : a.award_en}
              </p>
              {/* Desc */}
              <div className="mt-1 text-[#666666] text-[0.98rem]">
                {isHindi ? a.desc_hi : a.desc_en}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}