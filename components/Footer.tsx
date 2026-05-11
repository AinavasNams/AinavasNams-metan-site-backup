'use client';

import Link from 'next/link';
import { Leaf, Mail, Phone, Facebook, Linkedin, Instagram } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function Footer() {
  const { t, localePath } = useTranslation();

  const footerLinks = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.services', href: '/pakalpojumi' },
    { key: 'nav.horeca', href: '/horeca' },
    { key: 'nav.industrial', href: '/industrial' },
    { key: 'nav.partners', href: '/partneriem' },
    { key: 'nav.about', href: '/par-mums' },
    { key: 'nav.projects', href: '/projekti' },
    { key: 'nav.contacts', href: '/kontakti' },
    { key: 'nav.documents', href: '/dokumenti' },
  ];

  return (
    <footer className="bg-metan-gray text-white">
      <div className="metan-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href={localePath('/')} className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="bg-metan-gradient p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              METAN.LV
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a 
                href="/social/facebook.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="/social/linkedin.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="/social/instagram.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">{t('nav.services')}</h3>
            <div className="space-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={localePath(link.href)}
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">{t('nav.contacts')}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <a 
                  href="mailto:tsv@metan.lv"
                  className="hover:text-white transition-colors"
                >
                  tsv@metan.lv
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <a 
                  href="tel:+37127727724"
                  className="hover:text-white transition-colors"
                >
                  +371 27727724
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CFLA Support Bar */}
        <div className="border-t border-gray-600 mt-12 pt-8 pb-4">
          <Link href={localePath('/biopolymers')} className="flex flex-col md:flex-row items-center justify-center gap-6 group">
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg group-hover:bg-white/20 transition-colors">
              <img
                src="/logos/eu-flag.png"
                alt="EU flag"
                width={80}
                height={54}
                className="h-12 w-auto object-contain"
              />
              <img
                src="/logos/eraf.png?v=2"
                alt="ERAF logo"
                width={120}
                height={54}
                className="h-12 w-auto object-contain"
              />
              <img
                src="/logos/cfla.svg"
                alt="CFLA logo"
                width={100}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 font-medium text-center md:text-left">
              Projekts Nr.&nbsp;1.2.1.1/3/25/A/014 tiek īstenots ar CFLA atbalstu
            </p>
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-4 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © 2025 SIA "Ainavas Nams". All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <Link href={localePath('/privatuma-politika')} className="text-gray-400 hover:text-white transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link href={localePath('/sikdatnu-politika')} className="text-gray-400 hover:text-white transition-colors">
              {t('footer.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
