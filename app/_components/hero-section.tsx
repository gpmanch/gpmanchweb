"use client";
import { useLanguage } from "@/components/language";

export default function HeroSection() {
    const { isHindi } = useLanguage();
    return (
        <section
            className="relative mt-[70px] h-screen bg-[linear-gradient(rgba(0,35,82,0.7),rgba(0,35,82,0.7)),url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center flex items-center text-white"
        >
            <div className="max-w-[800px] mx-auto px-5 text-center">
                <h1 className="text-5xl font-bold mb-5">{isHindi ? "गौरवशाली इतिहास से प्रेरित, प्रगति की ओर एक कदम" : "Inspired by Glorious History, A Step Towards Progress"}</h1>
                <p className="text-lg mb-8">{isHindi ? "गुर्जर प्रगति मंच - एकता, शिक्षा और विकास की दिशा में आंदोलन" : "Gurjar Pragati Manch - A movement towards unity, education, and development"}</p>
                <div className="flex justify-center gap-5">
                <a
                    href="#contact"
                    className="inline-block rounded-full px-7 py-3 font-semibold bg-[#FFCA3C] text-[#002352] transition-transform hover:bg-white hover:-translate-y-1"
                >
                    {isHindi ? "हमसे जुड़ें" : "Join Us"}
                </a>
                <a
                    href="https://www.youtube.com/@gpmanch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full px-7 py-3 font-semibold border-2 border-white text-white transition-transform hover:bg-white hover:text-[#002352] hover:-translate-y-1"
                >
                    {isHindi ? "हमारे वीडियो देखें" : "Watch Our Videos"}
                </a>
                </div>
            </div>
        </section>
    )
}
