"use client";
import Image from "next/image";
import { useLanguage } from "@/components/language";

const Team = [
  {
    imgUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400&facepad=2&q=80",
    nameHi: "राजेश गुर्जर",
    nameEn: "Rajesh Gurjar",
    desgHi: "संस्थापक अध्यक्ष",
    desgEn: "Founder President",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=400&h=400&facepad=2&q=80",
    nameHi: "सुनीता गुर्जर",
    nameEn: "Sunita Gurjar",
    desgHi: "महिला विंग प्रमुख",
    desgEn: "Head, Women Wing",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=400&h=400&facepad=2&q=80",
    nameHi: "विकास गुर्जर",
    nameEn: "Vikas Gurjar",
    desgHi: "युवा प्रकोष्ठ संयोजक",
    desgEn: "Youth Cell Coordinator",
  },
]

export default function TeamSection() {
  const { isHindi } = useLanguage();
  return (
    <section className="py-20 bg-[#f9f9f9]">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#002352]">{isHindi ? "हमारी टीम" : "Our Team"}</h2>
          <p className="text-[#666666] max-w-[700px] mx-auto">{isHindi ? "समाज सेवा में समर्पित हमारे नेतृत्वकर्ता" : "Our leaders dedicated to community service"}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {
            Team.map((member, idx) =>(
              <div key={idx} className="text-center">
                <Image
                  src={member.imgUrl}
                  alt="Team Member"
                  width={200}
                  height={200}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  sizes="(max-width: 768px) 128px, 128px"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  priority={idx < 2}
                />
                <h3 className="text-xl font-semibold text-[#002352] mb-1">{isHindi ? member.nameHi : member.nameEn }</h3>
                <p className="italic text-[#666666]">{isHindi ? member.desgHi : member.desgEn }</p>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}
