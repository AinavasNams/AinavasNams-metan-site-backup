import { permanentRedirect } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HorecaRedirect({ params }: Props) {
  const { locale } = await params;
  const lang = locales.includes(locale as Locale) ? locale : 'lv';
  permanentRedirect(`/${lang}/pakalpojumi/horeca`);
}
