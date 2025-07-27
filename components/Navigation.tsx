'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, X, Leaf } from 'lucide-react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { trackContentSelection } from '@/lib/ga4-events';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  console.log('Navigation component rendered');

  const navItems = [
    { title: 'Sākums', href: '/' },
    { title: 'Par mums', href: '/par-mums' },
    { title: 'Pakalpojumi', href: '/pakalpojumi' },
    { title: 'Projekti', href: '/projekti' },
    { title: 'Investoriem', href: '/investoriem' },
    { title: 'Dokumenti', href: '/dokumenti' },
    { title: 'Kontakti', href: '/kontakti' },
  ];

  const handleNavClick = (title: string, href: string, isMobile: boolean = false) => {
    // Track navigation clicks for user journey analysis
    trackContentSelection(
      'navigation',
      `nav_${href.replace('/', '').replace('-', '_') || 'home'}`,
      isMobile ? 8 : 5
    );
    
    console.log(`📊 Navigation click: ${title} (${isMobile ? 'mobile' : 'desktop'})`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="metan-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-metan-primary">
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
                href={item.href}
                className="text-metan-text hover:text-metan-primary transition-colors duration-200 font-medium"
                onClick={() => handleNavClick(item.title, item.href, false)}
              >
                {item.title}
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
                  <SheetTitle>Galvenā izvēlne</SheetTitle>
                </VisuallyHidden.Root>
                <div className="flex flex-col gap-6 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium text-metan-text hover:text-metan-primary transition-colors"
                      onClick={() => {
                        handleNavClick(item.title, item.href, true);
                        setIsOpen(false);
                      }}
                    >
                      {item.title}
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