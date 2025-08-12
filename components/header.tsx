"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/language";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isHindi, setLanguage } = useLanguage();

  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full bg-[#002352] text-white text-[0.98rem] z-[1201] h-[38px] flex items-center shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="mx-auto max-w-6xl px-5 w-full flex items-center justify-between h-[38px]">
          {/* Left: email, hidden on mobile */}
          <div className="hidden md:flex items-center gap-2">
            <i className="fa fa-envelope text-[#FFCA3C]" />
            <span>contact@gurjarpragatimanch.org</span>
          </div>
          {/* Right: quick links, scrollable on mobile */}
          <div className="flex items-center gap-2 md:gap-2 overflow-x-auto md:overflow-visible w-screen md:w-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <a href="award.html" className="inline-block border-2 border-[#FFCA3C] rounded-full px-4 py-1 text-white hover:bg-[#FFCA3C] hover:text-[#002352] transition-colors text-[0.98rem]"> 
              {isHindi ? <span>पुरस्कार</span> : <span>Award</span>}
            </a>
            <a href="gotr.html" className="inline-block border-2 border-[#FFCA3C] rounded-full px-4 py-1 text-white hover:bg-[#FFCA3C] hover:text-[#002352] transition-colors text-[0.98rem]">Gotr</a>
            <a href="ips.html" className="inline-block border-2 border-[#FFCA3C] rounded-full px-4 py-1 text-white hover:bg-[#FFCA3C] hover:text-[#002352] transition-colors text-[0.98rem]">IPS</a>
            <a href="politicians.html" className="inline-block border-2 border-[#FFCA3C] rounded-full px-4 py-1 text-white hover:bg-[#FFCA3C] hover:text-[#002352] transition-colors text-[0.98rem]">
              <span className="lang-hindi">राजनेता</span>
              <span className="lang-english hidden">Politicians</span>
            </a>
            <a href="sports.html" className="inline-block border-2 border-[#FFCA3C] rounded-full px-4 py-1 text-white hover:bg-[#FFCA3C] hover:text-[#002352] transition-colors text-[0.98rem]">Sports</a>
            <a href="actor-influencer.html" className="inline-block border-2 border-[#FFCA3C] rounded-full px-4 py-1 text-white hover:bg-[#FFCA3C] hover:text-[#002352] transition-colors text-[0.98rem]">Actors/Influencer</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
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
              <li>
                <a href="#" className="text-[#002352] font-medium text-[1.08em] px-3 py-1.5 rounded hover:bg-[#FFCA3C]">
                  {isHindi ? "होम" : "Home"}
                </a>
              </li>
              <li>
                <a href="#about" className="text-[#002352] font-medium text-[1.08em] px-3 py-1.5 rounded hover:bg-[#FFCA3C]">
                  {isHindi ? "हमारे बारे में" : "About Us"}
                </a>
              </li>
              <li>
                <a href="#history" className="text-[#002352] font-medium text-[1.08em] px-3 py-1.5 rounded hover:bg-[#FFCA3C]">
                  {isHindi ? "इतिहास" : "History"}
                </a>
              </li>
              <li>
                <a href="#youth" className="text-[#002352] font-medium text-[1.08em] px-3 py-1.5 rounded hover:bg-[#FFCA3C]">
                  {isHindi ? "युवा" : "Youth"}
                </a>
              </li>
              <li>
                <a href="#latest-videos" className="text-[#002352] font-medium text-[1.08em] px-3 py-1.5 rounded hover:bg-[#FFCA3C]">
                  {isHindi ? "वीडियो" : "Videos"}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[#002352] font-medium text-[1.08em] px-3 py-1.5 rounded hover:bg-[#FFCA3C]">
                  {isHindi ? "संपर्क" : "Contact"}
                </a>
              </li>
            </ul>
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center gap-2">
              <a href="https://www.facebook.com/gpmanch" target="_blank" rel="noopener" className="bg-[#002352] text-[#FFCA3C] rounded-full w-9 h-9 flex items-center justify-center text-[1.2rem] shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:bg-[#FFCA3C] hover:text-[#002352] transition-colors"><i className="fab fa-facebook-f" /></a>
              <a href="https://x.com/gpmanch" target="_blank" rel="noopener" className="bg-[#002352] text-[#FFCA3C] rounded-full w-9 h-9 flex items-center justify-center text-[1.2rem] shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:bg-[#FFCA3C] hover:text-[#002352] transition-colors"><i className="fab fa-twitter" /></a>
              <a href="https://www.instagram.com/gpmanch/" target="_blank" rel="noopener" className="bg-[#002352] text-[#FFCA3C] rounded-full w-9 h-9 flex items-center justify-center text-[1.2rem] shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:bg-[#FFCA3C] hover:text-[#002352] transition-colors"><i className="fab fa-instagram" /></a>
              <a href="https://www.youtube.com/@gpmanch" target="_blank" rel="noopener" className="bg-[#002352] text-[#FFCA3C] rounded-full w-9 h-9 flex items-center justify-center text-[1.2rem] shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:bg-[#FFCA3C] hover:text-[#002352] transition-colors"><i className="fab fa-youtube" /></a>
            </div>
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
                <li>
                  <a href="#" className="block px-8 py-4 text-[1.15em] text-[#002352] border-b border-[#f0f0f0]">{isHindi ? "होम" : "Home"}</a>
                </li>
                <li>
                  <a href="#about" className="block px-8 py-4 text-[1.15em] text-[#002352] border-b border-[#f0f0f0]">{isHindi ? "हमारे बारे में" : "About Us"}</a>
                </li>
                <li>
                  <a href="#history" className="block px-8 py-4 text-[1.15em] text-[#002352] border-b border-[#f0f0f0]">{isHindi ? "इतिहास" : "History"}</a>
                </li>
                <li>
                  <a href="#youth" className="block px-8 py-4 text-[1.15em] text-[#002352] border-b border-[#f0f0f0]">{isHindi ? "युवा" : "Youth"}</a>
                </li>
                <li>
                  <a href="#latest-videos" className="block px-8 py-4 text-[1.15em] text-[#002352] border-b border-[#f0f0f0]">{isHindi ? "वीडियो" : "Videos"}</a>
                </li>
                <li>
                  <a href="#contact" className="block px-8 py-4 text-[1.15em] text-[#002352] border-b border-[#f0f0f0]">{isHindi ? "संपर्क" : "Contact"}</a>
                </li>
              </ul>
            </nav>
            <div className="px-5 pb-5 flex items-end justify-between">
              <div className="flex gap-3">
                <a href="https://www.facebook.com/gpmanch" target="_blank" rel="noopener" className="bg-[#002352] text-[#FFCA3C] rounded-full w-9 h-9 flex items-center justify-center text-[1.2rem]"><i className="fab fa-facebook-f" /></a>
                <a href="https://x.com/gpmanch" target="_blank" rel="noopener" className="bg-[#002352] text-[#FFCA3C] rounded-full w-9 h-9 flex items-center justify-center text-[1.2rem]"><i className="fab fa-twitter" /></a>
                <a href="https://www.instagram.com/gpmanch/" target="_blank" rel="noopener" className="bg-[#002352] text-[#FFCA3C] rounded-full w-9 h-9 flex items-center justify-center text-[1.2rem]"><i className="fab fa-instagram" /></a>
                <a href="https://www.youtube.com/@gpmanch" target="_blank" rel="noopener" className="bg-[#002352] text-[#FFCA3C] rounded-full w-9 h-9 flex items-center justify-center text-[1.2rem]"><i className="fab fa-youtube" /></a>
              </div>
              <div className="flex bg-[#f9f9f9] rounded-[20px] p-0.5">
                <button onClick={() => setLanguage("en")} className={`px-4 py-1 rounded-[20px] font-semibold ${!isHindi ? "bg-[#FFCA3C] text-[#002352]" : "text-[#002352]"}`}>EN</button>
                <button onClick={() => setLanguage("hi")} className={`px-4 py-1 rounded-[20px] font-semibold ${isHindi ? "bg-[#FFCA3C] text-[#002352]" : "text-[#002352]"}`}>HI</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
