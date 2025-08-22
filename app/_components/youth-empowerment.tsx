"use client";

import Image from "next/image";
import { useLanguage } from "@/components/language";

const initiatives = [
  {
    titleHi: "शिक्षा और कौशल विकास",
    titleEn: "Education & Skill Development",
    descHi: "युवाओं को उच्च शिक्षा और व्यावसायिक प्रशिक्षण के लिए सहायता प्रदान करना।",
    descEn: "Supporting youth with higher education and vocational training opportunities.",
    imgUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
  },
  {
    titleHi: "रोजगार और उद्यमिता",
    titleEn: "Employment & Entrepreneurship",
    descHi: "युवाओं को रोजगार के अवसर और अपना व्यवसाय शुरू करने में मदद करना।",
    descEn: "Helping youth find employment opportunities and start their own businesses.",
    imgUrl: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80",
  },
  {
    titleHi: "खेल और फिटनेस",
    titleEn: "Sports & Fitness",
    descHi: "युवाओं को खेल और फिटनेस गतिविधियों में भाग लेने के लिए प्रोत्साहित करना।",
    descEn: "Encouraging youth to participate in sports and fitness activities.",
    imgUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function YouthEmpowerment() {
  const { isHindi } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#002352] mb-4">
            {isHindi ? "युवा सशक्तिकरण" : "Youth Empowerment"}
          </h2>
          <p className="text-[#666666] max-w-2xl mx-auto text-lg">
            {isHindi
              ? "हमारा लक्ष्य युवाओं को सशक्त बनाना और उन्हें समाज के विकास में सक्रिय भागीदार बनाना है।"
              : "Our goal is to empower youth and make them active participants in society's development."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initiatives.map((initiative, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <Image
                src={initiative.imgUrl}
                alt={isHindi ? initiative.titleHi : initiative.titleEn}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-lg mb-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                priority={index < 2}
              />
              <h3 className="text-xl font-semibold text-[#002352] mb-3">
                {isHindi ? initiative.titleHi : initiative.titleEn}
              </h3>
              <p className="text-[#666666] leading-relaxed">
                {isHindi ? initiative.descHi : initiative.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
