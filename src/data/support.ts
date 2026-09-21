import { Coffee, Heart, Gem, type LucideIcon } from 'lucide-react';

/**
 * Gumroad product base URL.
 * Every tier points at this same "pay what you want" product and only differs by the
 * `price` query param, which prefills the amount on Gumroad's checkout.
 * If the Gumroad username or product slug ever changes, edit this one line.
 *
 * Use the custom permalink (/coffee), NOT the /l/ggltsz form: the latter 302-redirects
 * to /coffee and drops the query string, silently losing the price prefill.
 */
const GUMROAD_PRODUCT = 'https://lbfstudios.gumroad.com/coffee';

/** Sentinel for a tier whose product does not exist yet — its card renders disabled. */
export const TODO_URL = 'TODO_REPLACE_WITH_GUMROAD_URL';

export const isPlaceholderUrl = (url: string) => url.startsWith('TODO_');

export interface SupportTier {
  /** Stable key — used as the React key and in the aria-label. */
  id: string;
  /** Display price, ASCII, currency symbol included. Rendered dir="ltr". */
  price: string;
  nameEn: string;
  nameFa: string;
  blurbEn: string;
  blurbFa: string;
  /** Gumroad product URL. Set to TODO_URL to render the card as "coming soon". */
  url: string;
  icon: LucideIcon;
  /** Rings the card and shows a "Most popular" chip. */
  featured?: boolean;
}

export const SUPPORT_TIERS: SupportTier[] = [
  {
    id: 'coffee',
    price: '$5',
    nameEn: 'Coffee',
    nameFa: 'یک قهوه',
    blurbEn: 'Buy us a coffee and keep the edit bay running a little longer.',
    blurbFa: 'یک قهوه مهمان‌مان کن تا چراغ اتاق تدوین روشن بماند.',
    url: `${GUMROAD_PRODUCT}?price=5`,
    icon: Coffee,
  },
  {
    id: 'supporter',
    price: '$15',
    nameEn: 'Supporter',
    nameFa: 'حامی',
    blurbEn: 'Helps cover the software, storage and sound licences behind each film.',
    blurbFa: 'در هزینه‌ی نرم‌افزار، فضای ذخیره‌سازی و مجوز صدای هر فیلم شریک شو.',
    url: `${GUMROAD_PRODUCT}?price=15`,
    icon: Heart,
    featured: true,
  },
  {
    id: 'patron',
    price: '$50',
    nameEn: 'Patron',
    nameFa: 'پشتیبان ویژه',
    blurbEn: 'Back a whole production: gear, crew, and the long nights in between.',
    blurbFa: 'یک تولید کامل را پشتیبانی کن؛ تجهیزات، گروه، و شب‌های طولانی میان‌شان.',
    url: `${GUMROAD_PRODUCT}?price=50`,
    icon: Gem,
  },
];

export const SUPPORT_PAGE = {
  en: {
    eyebrow: 'Support',
    title: 'Support the Studio',
    subtitle:
      'We are independent. Every contribution goes straight into the next film — gear, sound, and the time it takes to get it right.',
    cta: 'Support on Gumroad',
    pending: 'Coming soon',
    featured: 'Most popular',
    note: 'Payments are handled securely by Gumroad and open in a new tab.',
    contactLead: 'Would rather talk first?',
    contactLink: 'Get in touch',
    metaTitle: 'Support | Little Black Fish Studios',
    metaDescription:
      'Support Little Black Fish Studios. Independent cinema and animation, funded by the people who watch it.',
  },
  fa: {
    eyebrow: 'حمایت',
    title: 'حمایت از استودیو',
    subtitle:
      'ما مستقل هستیم. هر حمایت مستقیم صرف فیلم بعدی می‌شود؛ تجهیزات، صدا، و زمانی که کار را درست درمی‌آورد.',
    cta: 'حمایت در Gumroad',
    pending: 'به‌زودی',
    featured: 'محبوب‌ترین',
    note: 'پرداخت به‌صورت امن توسط Gumroad انجام می‌شود و در زبانه‌ی جدید باز می‌شود.',
    contactLead: 'ترجیح می‌دهی اول صحبت کنیم؟',
    contactLink: 'تماس با ما',
    metaTitle: 'حمایت | استودیو ماهی سیاه کوچولو',
    metaDescription:
      'از استودیو ماهی سیاه کوچولو حمایت کنید. سینما و انیمیشن مستقل، با پشتیبانی کسانی که آن را می‌بینند.',
  },
} as const;
