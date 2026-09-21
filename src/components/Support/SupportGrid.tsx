'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import SupportCard from './SupportCard';
import { SUPPORT_TIERS } from '@/data/support';

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

export default function SupportGrid({ locale }: { locale: string }) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {SUPPORT_TIERS.map((tier) => (
        <motion.div key={tier.id} variants={itemVariants} className="h-full">
          <SupportCard tier={tier} locale={locale} />
        </motion.div>
      ))}
    </motion.div>
  );
}
