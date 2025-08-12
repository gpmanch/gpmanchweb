"use client";

import { useLanguage } from "@/components/language";

export default function ContactSection() {
    const { isHindi } = useLanguage();
    return (
        <section id="contact" className="py-20 bg-[#f9f9f9]">
            <div className="mx-auto max-w-6xl px-5">
                <div className="text-center mb-12">
                <h2 className="text-[2.5rem] mb-[15px] font-bold text-[#002352]">
                    {isHindi ? "हमसे जुड़ें" : "Contact Us"}
                </h2>
                <p className="text-[#666666] max-w-2xl mx-auto">
                    {isHindi ? "समाज की प्रगति में अपना योगदान दें" : "Contribute to the progress of the community"}
                </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[50px]">
                <div>
                    <h3 className="text-2xl font-semibold text-[#002352] mb-5">
                    {isHindi ? "संपर्क जानकारी" : "Contact Information"}
                    </h3>
                    <p className="mb-[15px]"><i className="fas fa-map-marker-alt text-[#FFCA3C] mr-[10px] inline-block w-5 text-center"></i>
                    {isHindi ? "गुर्जर भवन, दिल्ली रोड, मेरठ, उत्तर प्रदेश" : "Gurjar Bhawan, Delhi Road, Meerut, Uttar Pradesh"}
                    </p>
                    <p className="mb-[15px]"><i className="fas fa-phone text-[#FFCA3C] mr-[10px] inline-block w-5 text-center"></i> +91 9876543210</p>
                    <p className="mb-[20px]"><i className="fas fa-envelope text-[#FFCA3C] mr-[10px] inline-block w-5 text-center"></i> contact@gurjarpragatimanch.org</p>

                    <div className="flex gap-4 text-[#002352]">
                    <a href="#" className="text-2xl hover:text-[#FFCA3C] transition-colors"><i className="fab fa-whatsapp" /></a>
                    <a href="#" className="text-2xl hover:text-[#FFCA3C] transition-colors"><i className="fab fa-telegram" /></a>
                    <a href="https://www.facebook.com/gpmanch" target="_blank" rel="noopener" className="text-2xl hover:text-[#FFCA3C] transition-colors"><i className="fab fa-facebook-f" /></a>
                    <a href="https://x.com/gpmanch" target="_blank" rel="noopener" className="text-2xl hover:text-[#FFCA3C] transition-colors"><i className="fab fa-twitter" /></a>
                    <a href="https://www.instagram.com/gpmanch/" target="_blank" rel="noopener" className="text-2xl hover:text-[#FFCA3C] transition-colors"><i className="fab fa-instagram" /></a>
                    </div>
                </div>

                <div>
                    <form className="space-y-5">
                    <input
                        type="text"
                        placeholder={isHindi ? "आपका नाम" : "Your Name"}
                        required
                        className="w-full p-3 border border-[#ddd] bg-white rounded-[5px] focus:outline-none focus:border-[#FFCA3C] transition-colors"
                    />
                    <input
                        type="email"
                        placeholder={isHindi ? "आपका ईमेल" : "Your Email"}
                        required
                        className="w-full p-3 border border-[#ddd] bg-white rounded-[5px] focus:outline-none focus:border-[#FFCA3C] transition-colors"
                    />
                    <input
                        type="tel"
                        placeholder={isHindi ? "आपका फोन नंबर" : "Your Phone Number"}
                        className="w-full p-3 border border-[#ddd] bg-white rounded-[5px] focus:outline-none focus:border-[#FFCA3C] transition-colors"
                    />
                    <textarea
                        rows={5}
                        placeholder={isHindi ? "आपका संदेश" : "Your Message"}
                        required
                        className="w-full p-3 border border-[#ddd] bg-white rounded-[5px] focus:outline-none focus:border-[#FFCA3C] transition-colors"
                    />
                    <button
                        type="submit"
                        className="inline-block bg-[#FFCA3C] text-[#002352] font-semibold px-[30px] py-[12px] rounded-full transition-colors hover:bg-[#002352] hover:text-white"
                    >
                        {isHindi ? "संदेश भेजें" : "Send Message"}
                    </button>
                    </form>
                </div>
                </div>
            </div>
        </section>
    );
}
