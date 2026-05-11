import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/page-metadata';
import { locales, type Locale } from '@/lib/i18n';
import SocialContent from './Content';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lang = (locales.includes(locale as Locale) ? locale : 'lv') as Locale;
  return generatePageMetadata(lang, '/pakalpojumi/social', {
    titleKey: 'seo.social.title',
    descriptionKey: 'seo.social.description',
  });
}

export default function Page() {
  return <SocialContent />;
}
