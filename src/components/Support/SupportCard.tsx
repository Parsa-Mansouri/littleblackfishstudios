'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { isPlaceholderUrl, SUPPORT_PAGE, type SupportTier } from '@/data/support';

const LIFT_SPRING = { type: 'spring' as const, stiffness: 300, damping: 20 };

interface SupportCardProps {
  tier: SupportTier;
  locale: string;
}

const SupportCard: React.FC<SupportCardProps> = ({ tier, locale }) => {
  const isRtl = locale === 'fa';
  const copy = isRtl ? SUPPORT_PAGE.fa : SUPPORT_PAGE.en;
  const Icon = tier.icon;
  const name = isRtl ? tier.nameFa : tier.nameEn;
  const blurb = isRtl ? tier.blurbFa : tier.blurbEn;
  const pending = isPlaceholderUrl(tier.url);

  const shell = twMerge(
    'group flex h-full flex-col justify-between rounded-2xl border bg-zinc-950 p-6 transition-colors duration-300',
    tier.featured ? 'border-blue-500/40' : 'border-zinc-800/80',
    isRtl ? 'text-right' : 'text-left',
    pending
      ? 'cursor-default opacity-60'
      : 'hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black'
  );

  const inner = (
    <>
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-white/5 text-white/40 transition-colors group-hover:bg-white/10 group-hover:text-white/80">
            <Icon size={22} />
          </div>
          {pending ? (
            <span className="rounded-full border border-zinc-700 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              {copy.pending}
            </span>
          ) : (
            tier.featured && (
              <span className="rounded-full border border-blue-500/40 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                {copy.featured}
              </span>
            )
          )}
        </div>

        <span
          dir="ltr"
          className="mt-6 inline-block text-4xl font-black tracking-tighter text-white"
        >
          {tier.price}
        </span>

        <h2 className="relative mt-2 w-fit text-xl font-bold text-zinc-50 transition-colors group-hover:text-blue-400">
          {name}
          <span
            className={`absolute -bottom-px h-px w-0 bg-blue-500 transition-all duration-300 ${
              pending ? '' : 'group-hover:w-full'
            } ${isRtl ? 'right-0' : 'left-0'}`}
          />
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-zinc-500">{blurb}</p>
      </div>

      <div
        className={`mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] ${
          pending ? 'text-zinc-600' : 'text-zinc-400 group-hover:text-white'
        }`}
      >
        <span>{pending ? copy.pending : copy.cta}</span>
        {!pending && <ArrowUpRight size={16} />}
      </div>
    </>
  );

  if (pending) {
    return (
      <div className={shell} aria-disabled="true">
        {inner}
      </div>
    );
  }

  return (
    <motion.a
      href={tier.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${copy.cta} — ${name}, ${tier.price}`}
      initial="rest"
      animate="rest"
      whileHover="hover"
      className={shell}
      variants={{
        rest: { y: 0 },
        hover: { y: -4, transition: LIFT_SPRING },
      }}
    >
      {inner}
    </motion.a>
  );
};

export default SupportCard;
