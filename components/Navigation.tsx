'use client';
import { useState } from 'react';
import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, X, Leaf } from 'lucide-react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { trackContentSelection } from '@/lib/ga4-events';
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, localePath } = useTranslation();
  const navItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.about', href: '/par-mums' },
    { key: 'nav.services', href: '/pakalpojumi' },
    { key: 'nav.horeca', href: '/pakalpojumi/horeca' },
    { key: 'nav.industrial', href: '/pakalpojumi/industrial' },
    { key: 'nav.municipal', href: '/pakalpojumi/municipal' },
    { key: 'nav.social', href: '/pakalpojumi/social' },
    { key: 'nav.logistics', href: '/pakalpojumi/logistics' },
    { key: 'nav.partners', href: '/partneriem' },
    { key: 'nav.projects', href: '/projekti' },
    { key: 'nav.investors', href: '/investoriem' },
    { key: 'nav.documents', href: '/dokumenti' },
    { key: 'nav.contacts', href: '/kontakti' },
  ];
  const handleNavClick = (title: string, href: string, isMobile: boolean = false) => {
    trackContentSelection(
      'navigation',
      `nav_${href.replace('/', '').replace('-', '_') || 'home'}`,
      isMobile ? 8 : 5
    );
  };
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="metan-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={localePath('/')} className="flex items-center gap-2 font-bold text-xl text-metan-primary">
            <div className="bg-metan-gradient p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            METAN.LV
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localePath(item.href)}
                className="text-metan-text hover:text-metan-primary transition-colors duration-200 font-medium"
                onClick={() => handleNavClick(t(item.key), item.href, false)}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
          </div>
          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white">
                <VisuallyHidden.Root>
                  <SheetTitle>{t('nav.home')}</SheetTitle>
                </VisuallyHidden.Root>
                <div className="flex flex-col gap-6 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={localePath(item.href)}
                      className="text-lg font-medium text-metan-text hover:text-metan-primary transition-colors"
                      onClick={() => {
                        handleNavClick(t(item.key), item.href, true);
                        setIsOpen(false);
                      }}
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
