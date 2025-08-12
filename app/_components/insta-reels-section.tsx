"use client";

import { useLanguage } from "@/components/language";
import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process?: () => void;
      };
    };
  }
}

export default function InstaReelsSection() {
  const { isHindi } = useLanguage();

  useEffect(() => {
    try {
      window.instgrm?.Embeds?.process?.();
    } catch {}
  }, [isHindi]);

  return (
    <section id="popular-instagram-reels" className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#002352]">
            {isHindi ? "लोकप्रिय इंस्टाग्राम रील्स" : "Popular Instagram Reels"}
          </h2>
          <p className="text-[#666666] max-w-2xl mx-auto">
            {isHindi ? "हमारी चर्चित इंस्टाग्राम रील्स देखें" : "Watch our trending Instagram reels"}
          </p>
        </div>

        <div className="flex flex-wrap gap-8 justify-center">
          <blockquote
            className="instagram-media flex-1 basis-[320px] max-w-[350px] min-w-[220px] w-full"
            data-instgrm-permalink="https://www.instagram.com/reel/DLq4orsyU3V/?hl=en"
            data-instgrm-version="14"
          />
          <blockquote
            className="instagram-media flex-1 basis-[320px] max-w-[350px] min-w-[220px] w-full"
            data-instgrm-permalink="https://www.instagram.com/reel/DLOX81fyI6V/?hl=en"
            data-instgrm-version="14"
          />
          <blockquote
            className="instagram-media flex-1 basis-[320px] max-w-[350px] min-w-[220px] w-full"
            data-instgrm-permalink="https://www.instagram.com/reel/DLUc-QMyjNR/?hl=en"
            data-instgrm-version="14"
          />
        </div>
      </div>

      <Script
        id="ig-embed"
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          try {
            window.instgrm?.Embeds?.process?.();
          } catch {}
        }}
      />
    </section>
  );
}
