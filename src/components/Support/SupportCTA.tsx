'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Heart } from 'lucide-react';
import { SUPPORT_PAGE, SUPPORT_URL } from '@/data/support';

const EASE_SNAPPY: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_SNAPPY },
  },
};

export default function SupportCTA({ locale }: { locale: string }) {
  const isRtl = locale === 'fa';
  const copy = isRtl ? SUPPORT_PAGE.fa : SUPPORT_PAGE.en;

  return (
    <motion.div
      className="flex flex-col items-center gap-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="group relative w-full sm:w-auto">
        {/* Soft ambient glow, brightens on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-2 rounded-full bg-blue-500/30 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <a
          href={SUPPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={copy.cta}
          className="relative inline-flex min-h-16 w-full cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-10 ring-1 ring-white/15 ring-inset transition-all duration-200 ease-out hover:from-blue-500 hover:to-blue-400 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:min-h-20 sm:w-auto sm:px-16"
        >
          {/* Sheen sweep on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
          />

          <span className="relative flex items-center gap-3 text-base font-black tracking-[0.2em] text-white uppercase sm:gap-4 sm:text-xl">
            <Heart className="size-5 shrink-0 transition-transform duration-300 group-hover:scale-110 sm:size-6" />
            {copy.cta}
            <ArrowUpRight className="size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 sm:size-6" />
          </span>
        </a>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase"
      >
        {copy.ctaHint}
      </motion.p>
    </motion.div>
  );
}
