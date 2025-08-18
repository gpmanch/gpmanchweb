"use client";
import { useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import { useLanguage } from "./language";

const navRoutes = [
    {
        hi: "होम",
        en: "Home",
        targetUrl: "/",
    },
    {
        hi: "हमारे बारे में",
        en: "About Us",
        targetUrl: "/about-us",
    },
    {
        hi: "इतिहास",
        en: "History",
        targetUrl: "/history",
    },
    {
        hi: "युवा",
        en: "Youth",
        targetUrl: "/youth",
    },
    {
        hi: "वीडियो",
        en: "Videos",
        targetUrl: "/videos",
    },
    {
        hi: "संपर्क",
        en: "Contact",
        targetUrl: "/contact-us",
    },
]

export const Header = () => {

    // const [isVisible, setIsVisible] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isHindi, setLanguage } = useLanguage();
    // const lastScrollY = useRef(0);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (typeof window !== "undefined") {
    //             const currentScrollY = window.scrollY;
    //             setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 88);
    //             lastScrollY.current = currentScrollY;
    //         }
    //     };
    //     if (typeof window !== "undefined") {
    //         window.addEventListener("scroll", handleScroll);
    //         return () => {
    //             window.removeEventListener("scroll", handleScroll);
    //         };
    //     }
    // }, []);

    return (
        <>
            <header className="fixed top-[38px] left-0 w-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] z-[1200]">
                <div className="mx-auto max-w-6xl px-5 py-2 flex items-center justify-between relative">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <Image src="/logo-b.png" alt="Gurjar Pragati Manch Logo" width={54} height={54} className="h-[54px] w-auto rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.04)]" />
                    </Link>
                </div>

                {/* Mobile language switch */}
                <div className="flex md:hidden items-center">
                    <div className="flex bg-[#f9f9f9] rounded-[20px] p-0.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                    <button onClick={() => setLanguage("en")} className={`px-4 py-1 rounded-[20px] font-semibold ${!isHindi ? "bg-[#FFCA3C] text-[#002352]" : "text-[#002352]"}`}>EN</button>
                    <button onClick={() => setLanguage("hi")} className={`px-4 py-1 rounded-[20px] font-semibold ${isHindi ? "bg-[#FFCA3C] text-[#002352]" : "text-[#002352]"}`}>HI</button>
                    </div>
                </div>

                {/* Desktop Nav */}
                <nav id="main-nav" className="hidden md:flex flex-1 justify-center">
                    <ul className="flex gap-2 items-center list-none">
                        {
                            navRoutes.map((item) => (
                                <li key={item.targetUrl}>
                                    <Link href={item.targetUrl} className="text-[#002352] font-medium text-[1.08em] px-3 py-1.5 rounded hover:bg-[#FFCA3C]">
                                        {isHindi ? item.hi : item.en}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* Desktop actions */}
                <div className="hidden md:flex items-center gap-5">
                    <div className="hidden md:flex bg-[#f9f9f9] rounded-[20px] p-0.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                        <button onClick={() => setLanguage("en")} className={`px-4 py-1 rounded-[20px] font-semibold ${!isHindi ? "bg-[#FFCA3C] text-[#002352]" : "text-[#002352]"}`}>English</button>
                        <button onClick={() => setLanguage("hi")} className={`px-4 py-1 rounded-[20px] font-semibold ${isHindi ? "bg-[#FFCA3C] text-[#002352]" : "text-[#002352]"}`}>हिंदी</button>
                    </div>
                </div>

                {/* Hamburger */}
                <button
                    className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1 ml-2"
                    aria-label="Toggle menu"
                    onClick={() => setIsMenuOpen(true)}
                >
                    <span className="block w-8 h-1 bg-[#002352] rounded" />
                    <span className="block w-8 h-1 bg-[#002352] rounded" />
                    <span className="block w-8 h-1 bg-[#002352] rounded" />
                </button>
                </div>
            </header>
            {/* Mobile menu overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[1199]">
                    <div
                        className="absolute inset-0 bg-black/30"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <div className="absolute left-0 top-0 w-[80vw] max-w-[340px] h-screen bg-white shadow-[2px_0_16px_rgba(0,0,0,0.12)] flex flex-col justify-between animate-[slideInLeft_0.3s]">
                        <nav className="pt-8">
                            <ul className="list-none m-0 p-0 flex flex-col">
                                {
                                    navRoutes.map((item) => (
                                        <li key={item.targetUrl}>
                                            <Link href={item.targetUrl} className="text-[#002352] font-medium text-[1.08em] px-3 py-1.5 rounded hover:bg-[#FFCA3C]">
                                                {isHindi ? item.hi : item.en}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                        <div className="px-5 pb-5 flex items-end justify-between">
                            <div className="flex bg-[#f9f9f9] rounded-[20px] p-0.5">
                                <button onClick={() => setLanguage("en")} className={`px-4 py-1 rounded-[20px] font-semibold ${!isHindi ? "bg-[#FFCA3C] text-[#002352]" : "text-[#002352]"}`}>EN</button>
                                <button onClick={() => setLanguage("hi")} className={`px-4 py-1 rounded-[20px] font-semibold ${isHindi ? "bg-[#FFCA3C] text-[#002352]" : "text-[#002352]"}`}>HI</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
