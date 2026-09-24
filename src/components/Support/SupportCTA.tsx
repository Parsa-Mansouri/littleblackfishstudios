'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Heart } from 'lucide-react';
import { SUPPORT_PAGE, SUPPORT_URL, SUPPORT_URL_IRAN } from '@/data/support';

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

interface SupportButtonProps {
  href: string;
  label: string;
  hint: string;
  variant: 'primary' | 'secondary';
}

function SupportButton({ href, label, hint, variant }: SupportButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
      <div className="group relative w-full">
        {/* Soft ambient glow, brightens on hover */}
        {isPrimary && (
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-2 rounded-full bg-blue-500/30 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label}: ${hint}`}
          className={`relative inline-flex min-h-16 w-full cursor-pointer items-center justify-center overflow-hidden rounded-full px-8 ring-inset transition-all duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:min-h-20 ${
            isPrimary
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 ring-1 ring-white/15 hover:from-blue-500 hover:to-blue-400'
              : 'bg-zinc-900 ring-1 ring-white/15 hover:bg-zinc-800 hover:ring-blue-500/60'
          }`}
        >
          {/* Sheen sweep on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
          />

          <span className="relative flex items-center gap-3 text-base font-black tracking-[0.2em] text-white uppercase sm:text-lg">
            <Heart className="size-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
            {label}
            <ArrowUpRight className="size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </span>
        </a>
      </div>

      <p className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase">{hint}</p>
    </motion.div>
  );
}

export default function SupportCTA({ locale }: { locale: string }) {
  const isRtl = locale === 'fa';
  const copy = isRtl ? SUPPORT_PAGE.fa : SUPPORT_PAGE.en;

  const intl = { href: SUPPORT_URL, label: copy.ctaIntl, hint: copy.ctaIntlHint };
  const iran = { href: SUPPORT_URL_IRAN, label: copy.ctaIran, hint: copy.ctaIranHint };

  // Lead with the option most visitors of this locale will need
  const [first, second] = isRtl ? [iran, intl] : [intl, iran];

  return (
    <motion.div
      className="grid w-full gap-8 sm:grid-cols-2 sm:gap-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <SupportButton {...first} variant="primary" />
      <SupportButton {...second} variant="secondary" />
    </motion.div>
  );
}
