"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language";

type Rss2JsonItem = {
  title: string;
  link: string;
};

type Rss2JsonResponse = {
  items?: Rss2JsonItem[];
};

export default function LatestVideosSection() {
  const { isHindi } = useLanguage();
  const [videos, setVideos] = useState<Array<{ videoId: string; title: string }>>([]);

  useEffect(() => {
    const channelId = "UCqEbnUlqW5SFheI_mvwxiIQ";
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    let isCancelled = false;
    fetch(apiUrl)
      .then((res) => res.json() as Promise<Rss2JsonResponse>)
      .then((data) => {
        if (isCancelled) return;
        const items = data.items ?? [];
        const picked = items
          .filter((item) => item.link.includes("watch"))
          .slice(0, 3)
          .map((item) => {
            const videoId = item.link.split("v=")[1] ?? "";
            return { videoId, title: item.title };
          })
          .filter((v) => v.videoId.length > 0);
        setVideos(picked);
      })
      .catch(() => {
        // ignore errors silently for now
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <section id="latest-videos" className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#002352]">
            {isHindi ? "नवीनतम वीडियो" : "Latest Videos"}
          </h2>
          <p className="text-[#666666] max-w-2xl mx-auto">
            {isHindi
              ? "हमारे यूट्यूब चैनल के ताज़ा वीडियो देखें"
              : "Watch the latest videos from our YouTube channel"}
          </p>
        </div>

        <div className="flex flex-wrap gap-8 justify-center">
          {videos.map((v) => (
            <div key={v.videoId} className="max-w-[350px] w-full">
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-md shadow-[0_3px_10px_rgba(0,0,0,0.1)]">
                <iframe
                  src={`https://www.youtube.com/embed/${v.videoId}`}
                  title={v.title}
                  className="absolute top-0 left-0 w-full h-full"
                  allowFullScreen
                />
              </div>
              <div className="mt-2 font-semibold text-[#002352]">{v.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
