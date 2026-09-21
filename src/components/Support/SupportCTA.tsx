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
      className="flex flex-col items-center gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.a
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={copy.cta}
        variants={itemVariants}
        className="group inline-flex min-h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-white px-8 text-sm font-black tracking-[0.2em] text-black uppercase shadow-lg shadow-white/5 transition-all duration-200 hover:bg-zinc-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:min-h-16 sm:w-auto sm:px-12 sm:text-base"
      >
        <Heart className="size-4 shrink-0 sm:size-5" />
        <span>{copy.cta}</span>
        <ArrowUpRight className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 sm:size-5" />
      </motion.a>

      <motion.p
        variants={itemVariants}
        className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase"
      >
        {copy.ctaHint}
      </motion.p>
    </motion.div>
  );
}
