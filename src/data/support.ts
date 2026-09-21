/**
 * Gumroad product URL.
 * The product is "pay what you want", so no amount is passed — the supporter names
 * their own on Gumroad's checkout.
 *
 * Use the custom permalink (/coffee), NOT the /l/<id> form: the latter 302-redirects
 * to /coffee and drops any query string.
 */
export const SUPPORT_URL = 'https://lbfstudios.gumroad.com/coffee';

export const SUPPORT_PAGE = {
  en: {
    eyebrow: 'Support',
    title: 'Support the Studio',
    subtitle:
      'We are independent. Every contribution goes straight into the next film — gear, sound, and the time it takes to get it right.',
    cta: 'Support on Gumroad',
    ctaHint: 'Name your own amount',
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
    ctaHint: 'مبلغ را خودت انتخاب کن',
    note: 'پرداخت به‌صورت امن توسط Gumroad انجام می‌شود و در زبانه‌ی جدید باز می‌شود.',
    contactLead: 'ترجیح می‌دهی اول صحبت کنیم؟',
    contactLink: 'تماس با ما',
    metaTitle: 'حمایت | استودیو ماهی سیاه کوچولو',
    metaDescription:
      'از استودیو ماهی سیاه کوچولو حمایت کنید. سینما و انیمیشن مستقل، با پشتیبانی کسانی که آن را می‌بینند.',
  },
} as const;
