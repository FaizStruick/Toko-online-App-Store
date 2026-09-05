"use client"

import { Banner as BannerType } from "@/types";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BannerProps {
  data: BannerType[] | BannerType;
}

const Banner: React.FC<BannerProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const bannerArray = Array.isArray(data) ? data : data ? [data] : [];

  useEffect(() => {
    if (isHovered || bannerArray.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === bannerArray.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isHovered, bannerArray.length]);

  if (bannerArray.length === 0) return null;

  const currentBanner = bannerArray[currentIndex];
  const isCarousel = bannerArray.length > 1;

  return (
    <div
      className="p-4 sm:p-6 lg:p-8 rounded-3xl overflow-hidden relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-3xl border border-slate-200/80 dark:border-neutral-800 bg-gradient-to-br from-slate-50 via-slate-100/70 to-slate-200/50 dark:from-neutral-900 dark:via-neutral-900/90 dark:to-neutral-800 flex flex-col md:flex-row items-center p-8 md:p-14 gap-8 relative min-h-[420px] md:min-h-[480px] overflow-hidden shadow-xs">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full z-10"
          >
            <Link
              href="/category/75dc54a7-5beb-46d4-92f2-696c16ee0f49"
              className="w-full flex flex-col md:flex-row items-center justify-between gap-8 cursor-pointer group/content block"
            >
              {/* Bagian Kiri: Tagline, Judul, Deskripsi & Tombol */}
              <div className="flex-1 space-y-5 text-center md:text-left order-2 md:order-1 max-w-xl">
                
                {/* Badge Tagline Elegan */}
                <div className="inline-flex items-center gap-x-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md border border-slate-200/80 dark:border-neutral-700 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
                    Koleksi Pilihan
                  </span>
                </div>

                {/* Judul Utama */}
                <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white leading-[1.15] tracking-tight group-hover/content:text-slate-700 dark:group-hover/content:text-neutral-300 transition-colors">
                  {currentBanner?.label}
                </h1>

                {/* Deskripsi */}
                <p className="text-slate-600 dark:text-neutral-300 text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0 font-normal">
                  Dapatkan koleksi pakaian dan fashion premium terbaik dengan material berkualitas hanya di Toko Faiz Market.
                </p>

                {/* Tombol CTA */}
                <div className="pt-2">
                  <div className="inline-flex items-center gap-x-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-7 py-3.5 rounded-full font-medium text-sm transition-all duration-300 group-hover/content:bg-slate-800 dark:group-hover/content:bg-neutral-100 group-hover/content:shadow-lg group-hover/content:shadow-slate-900/10">
                    <span>Lihat Koleksi</span>
                    <ArrowRight size={16} className="group-hover/content:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Bagian Kanan: Gambar Lingkaran 3D Floating */}
              <div className="flex-1 order-1 md:order-2 flex justify-center md:justify-end">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-white dark:bg-neutral-800/80 shadow-xl border border-slate-200/60 dark:border-neutral-700/60 flex items-center justify-center p-6 transition-transform duration-500 group-hover/content:scale-105">
                  <img
                    src={currentBanner?.imageUrl}
                    alt={currentBanner?.label || "Banner Image"}
                    className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover/content:-translate-y-2"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* TOMBOL NAVIGASI CAROUSEL (KIRI & KANAN) */}
        {isCarousel && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurrentIndex((prev) => (prev === 0 ? bannerArray.length - 1 : prev - 1));
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm p-3 rounded-full shadow-md text-slate-800 dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-20 hover:bg-white dark:hover:bg-neutral-800 hover:scale-110 active:scale-95"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurrentIndex((prev) => (prev === bannerArray.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm p-3 rounded-full shadow-md text-slate-800 dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-20 hover:bg-white dark:hover:bg-neutral-800 hover:scale-110 active:scale-95"
              aria-label="Next Slide"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* DOTS INDIKATOR (BAWAH) */}
        {isCarousel && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-x-2 z-20">
            {bannerArray.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === index
                    ? "w-7 bg-slate-900 dark:bg-white"
                    : "w-2 bg-slate-400/40 dark:bg-white/30 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Banner;