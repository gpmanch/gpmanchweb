"use client";
import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from "next/image";
import { useLanguage } from "./language";
import NextTopLoader from 'nextjs-toploader';
import { Button } from "./ui/button";
import { logout } from "@/lib/auth-client";
import { useAuth } from "@/components/context/auth-context";
import { User, LogOut } from "lucide-react";

const guestRoutes = [
    {
        label: "Log In",
        href: `/sign-in`,
        variant: "outline"
    },
    {
        label: "Sign Up",
        href: `/sign-up`,
        variant: "default"
    }
]

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { isHindi, setLanguage } = useLanguage();
    const { user: currentUser, isLoggedIn } = useAuth();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
    };

    return (
        <>
            <header className="fixed top-[38px] left-0 w-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] z-[1200]">
                <div className="mx-auto max-w-7xl px-5 py-2 flex items-center justify-between gap-x-5 relative">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <Image src="/logo-b.png" alt="Gurjar Pragati Manch Logo" width={54} height={54} className="h-[54px] w-auto rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.04)]" priority={true} />
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

                    <div className="hidden md:flex gap-x-2 items-center">
                        {mounted && isLoggedIn && currentUser ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="w-8 h-8 bg-[#FFCA3C] rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-[#002352]" />
                                    </div>
                                    <span className="text-[#002352] font-medium">{currentUser.userName || currentUser.email}</span>
                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                        <Link
                                            href={`/${currentUser.userName}`}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            Profile
                                        </Link>
                                        {currentUser.isAdmin && (
                                            <Link
                                                href={`/${currentUser.userName}/admin`}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                Admin Panel
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : mounted ? (
                            guestRoutes.map((route) => (
                                <a key={route.href} href={route.href}>
                                    <Button variant={route.variant as "default" | "outline" | "secondary" | "destructive" | "link" | "ghost" | "success"}>
                                        {route.label}
                                    </Button>
                                </a>
                            ))
                        ) : (
                            // Show loading state during hydration
                            <div className="flex gap-x-2">
                                <div className="w-20 h-10 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-20 h-10 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        )}
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
                <NextTopLoader
                    color="#000"
                    initialPosition={0.08}
                    crawlSpeed={200}
                    height={5}
                    crawl={true}
                    showSpinner={false}
                    easing="ease"
                    speed={400}
                    template='<div class="bar" role="bar"><div class="peg"></div></div>
                    <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                    zIndex={9999}
                    showAtBottom={false}
                />
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
                            {mounted && isLoggedIn && currentUser && (
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-red-600"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                    <NextTopLoader
                        color="#000"
                        initialPosition={0.08}
                        crawlSpeed={200}
                        height={5}
                        crawl={true}
                        showSpinner={false}
                        easing="ease"
                        speed={400}
                        template='<div class="bar" role="bar"><div class="peg"></div></div>
                        <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                        zIndex={1600}
                        showAtBottom={false}
                    />
                </div>
            )}
        </>
    )
}
