'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Heart } from 'lucide-react';
import { SUPPORT_PAGE, SUPPORT_URL } from '@/data/support';

const EASE_SNAPPY: [number, number, number, number] = [0.22, 1, 0.36, 1];

const LIFT_SPRING = { type: 'spring' as const, stiffness: 300, damping: 20 };

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
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.a
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={copy.cta}
        variants={itemVariants}
        whileHover="hover"
        whileTap={{ scale: 0.99 }}
        className="group flex w-full flex-col items-center justify-center gap-4 rounded-2xl border border-blue-500/40 bg-blue-600 px-8 py-14 text-center shadow-xl shadow-blue-600/20 transition-colors duration-300 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-4 focus-visible:ring-offset-black md:py-20"
      >
        <motion.span
          className="flex size-14 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors group-hover:bg-white/20 group-hover:text-white"
          variants={{ rest: { y: 0 }, hover: { y: -4, transition: LIFT_SPRING } }}
        >
          <Heart size={26} />
        </motion.span>

        <span className="flex items-center gap-3 text-2xl font-black tracking-tight text-white uppercase sm:text-4xl md:text-5xl">
          {copy.cta}
          <ArrowUpRight className="size-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 sm:size-9 md:size-11" />
        </span>

        <span className="text-xs font-bold tracking-[0.2em] text-blue-100/70 uppercase">
          {copy.ctaHint}
        </span>
      </motion.a>
    </motion.div>
  );
}
