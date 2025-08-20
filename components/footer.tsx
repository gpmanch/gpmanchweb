"use client";
import { useLanguage } from "@/components/language";
import { usePathname } from "next/navigation";

export default function Footer() {
    const { isHindi } = useLanguage();
    const pathname = usePathname()

    const isAdminPage = pathname?.includes("admin");

    return (
        <footer className={`bg-[#002352] text-white pt-12 pb-5 ${isAdminPage ? "hidden" : "block"}`}>
            <div className="mx-auto max-w-6xl px-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl mb-5 text-[#FFCA3C] font-semibold">{isHindi ? "गुर्जर प्रगति मंच" : "Gurjar Pragati Manch"}</h3>
                        <p>{isHindi ? "समाज की प्रगति के लिए समर्पित" : "Dedicated to the progress of the community"}</p>
                    </div>
                    <div>
                        <h3 className="text-xl mb-5 text-[#FFCA3C] font-semibold">{isHindi ? "त्वरित लिंक" : "Quick Links"}</h3>
                        <ul className="list-none space-y-2">
                            <li>
                                <a href="index.html" className="text-white hover:text-[#FFCA3C] transition-colors">{isHindi ? "होम" : "Home"}</a>
                            </li>
                            <li>
                                <a href="gotr.html" className="text-white hover:text-[#FFCA3C] transition-colors">{isHindi ? "गोत्र सूची" : "Gotr List"}</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl mb-5 text-[#FFCA3C] font-semibold">{isHindi ? "हमारे कार्यक्रम" : "Our Programs"}</h3>
                        <ul className="list-none space-y-2">
                            <li>
                                <a href="#" className="text-white hover:text-[#FFCA3C] transition-colors">{isHindi ? "छात्रवृत्ति" : "Scholarship"}</a>
                            </li>
                            <li>
                                <a href="#" className="text-white hover:text-[#FFCA3C] transition-colors">{isHindi ? "युवा प्रशिक्षण" : "Youth Training"}</a>
                            </li>
                            <li>
                                <a href="#" className="text-white hover:text-[#FFCA3C] transition-colors">{isHindi ? "इतिहास संरक्षण" : "History Preservation"}</a>
                            </li>
                            <li>
                                <a href="#" className="text-white hover:text-[#FFCA3C] transition-colors">{isHindi ? "सामाजिक जागरूकता" : "Social Awareness"}</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl mb-5 text-[#FFCA3C] font-semibold">{isHindi ? "सोशल मीडिया" : "Social Media"}</h3>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/gpmanch" target="_blank" rel="noopener" className="text-white text-[1.2rem] hover:text-[#FFCA3C] transition-colors"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://x.com/gpmanch" target="_blank" rel="noopener" className="text-white text-[1.2rem] hover:text-[#FFCA3C] transition-colors"><i className="fab fa-twitter"></i></a>
                            <a href="https://www.instagram.com/gpmanch/" target="_blank" rel="noopener" className="text-white text-[1.2rem] hover:text-[#FFCA3C] transition-colors"><i className="fab fa-instagram"></i></a>
                            <a href="https://www.youtube.com/@gpmanch" target="_blank" rel="noopener" className="text-white text-[1.2rem] hover:text-[#FFCA3C] transition-colors"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                <div className="text-center pt-5 border-t border-white/10">
                    <p>{isHindi ? "© 2023 गुर्जर प्रगति मंच | सर्वाधिकार सुरक्षित" : "© 2023 Gurjar Pragati Manch | All rights reserved"}</p>
                </div>
            </div>
        </footer>
    )
}
