import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SupportCTA from '@/components/Support/SupportCTA';
import { SUPPORT_PAGE } from '@/data/support';

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

  return (
    <div
      className="min-h-screen bg-black px-6 pt-44 pb-24"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="mx-auto max-w-3xl">
        <header className="mb-12 md:mb-16">
          <div className="mb-4 flex items-center gap-4">
            <div className="h-px flex-1 bg-zinc-800"></div>
            <span className="text-xs font-bold tracking-[0.2em] text-blue-500 uppercase">
              {copy.eyebrow}
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase sm:text-5xl md:text-7xl">
            {copy.title}
          </h1>
          <div className="mt-6 h-1.5 w-24 bg-blue-600" />
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
            {copy.subtitle}
          </p>
        </header>

        <SupportCTA locale={locale} />

        <div className="mt-10 flex flex-col gap-2 text-xs text-zinc-600">
          <p>{copy.note}</p>
          <p>
            {copy.contactLead}{' '}
            <Link
              href={`/${locale}/contact`}
              className="text-zinc-400 underline underline-offset-4 transition-colors hover:text-blue-400"
            >
              {copy.contactLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
