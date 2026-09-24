import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { SUPPORT_PAGE, SUPPORT_URL, SUPPORT_URL_IRAN } from '@/data/support';

export const revalidate = 3600;

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = locale === 'fa' ? SUPPORT_PAGE.fa : SUPPORT_PAGE.en;

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
  };
}

export default async function SupportPage({ params }: Props) {
  const { locale } = await params;
  if (!['en', 'fa'].includes(locale)) notFound();

  const isRtl = locale === 'fa';
  const copy = isRtl ? SUPPORT_PAGE.fa : SUPPORT_PAGE.en;
  const Arrow = isRtl ? ArrowUpLeft : ArrowUpRight;

  const worldwide = { href: SUPPORT_URL, ...copy.worldwide };
  const iran = { href: SUPPORT_URL_IRAN, ...copy.iran };
  const buttons = isRtl ? [iran, worldwide] : [worldwide, iran];

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 pt-32 pb-20"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Soft blue light behind the content */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[120px]"
      />

      <div className="relative flex w-full max-w-2xl flex-col items-center text-center">
        <div className="mb-6 flex items-center gap-4">
          <span className="h-px w-8 bg-blue-500" />
          <span className="text-xs font-bold tracking-[0.3em] text-blue-500 uppercase rtl:text-sm rtl:tracking-normal">
            {copy.eyebrow}
          </span>
          <span className="h-px w-8 bg-blue-500" />
        </div>

        <h1 className="text-5xl leading-[0.95] font-black tracking-tighter text-white uppercase sm:text-7xl">
          {copy.title}
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400">{copy.subtitle}</p>

        <div className="mt-12 grid w-full gap-4 sm:grid-cols-2">
          {buttons.map((b) => (
            <a
              key={b.href}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-20 items-center justify-between gap-4 overflow-hidden rounded-full bg-white/[0.03] ps-8 pe-3 ring-1 ring-white/15 transition-shadow ring-inset hover:ring-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {/* Blue fill sweeping in from the start edge, like the menu's layers */}
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-blue-600 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 rtl:origin-right"
              />
              <span className="relative flex flex-col items-start gap-1 text-start">
                <span className="text-sm font-black tracking-[0.2em] text-white uppercase sm:text-base rtl:text-base rtl:font-normal rtl:tracking-normal">
                  {b.label}
                </span>
                <span className="text-xs text-zinc-400 transition-colors group-hover:text-white/80">
                  {b.caption}
                </span>
              </span>
              <span className="relative flex size-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-colors group-hover:bg-white group-hover:text-blue-600">
                <Arrow className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
