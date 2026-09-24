/**
 * Gumroad product URL ("pay what you want", so the supporter names their own amount).
 *
 * Use the custom permalink (/coffee), NOT the /l/<id> form: the latter 302-redirects
 * to /coffee and drops any query string.
 */
export const SUPPORT_URL = 'https://lbfstudios.gumroad.com/coffee';

/** tlcard charge page for supporters in Iran, who can't pay through Gumroad. */
export const SUPPORT_URL_IRAN = 'https://tlcard.ir/charge/7603/8565';

export const SUPPORT_PAGE = {
  en: {
    eyebrow: 'Support',
    title: 'Support the Studio',
    subtitle: 'Independent cinema and animation, funded by the people who watch it.',
    worldwide: { label: 'Worldwide', caption: 'Card · any amount' },
    iran: { label: 'From Iran', caption: 'Iranian bank card · Rial' },
    metaTitle: 'Support | Little Black Fish Studios',
    metaDescription:
      'Support Little Black Fish Studios. Independent cinema and animation, funded by the people who watch it.',
  },
  fa: {
    eyebrow: 'حمایت',
    title: 'حمایت از استودیو',
    subtitle: 'سینما و انیمیشن مستقل، با پشتیبانی کسانی که آن را می‌بینند.',
    worldwide: { label: 'بین‌المللی', caption: 'کارت · مبلغ دلخواه' },
    iran: { label: 'از داخل ایران', caption: 'کارت بانکی ایرانی · ریال' },
    metaTitle: 'حمایت | استودیو ماهی سیاه کوچولو',
    metaDescription:
      'از استودیو ماهی سیاه کوچولو حمایت کنید. سینما و انیمیشن مستقل، با پشتیبانی کسانی که آن را می‌بینند.',
  },
} as const;
