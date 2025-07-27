'use client';

import Link from 'next/link';
import { Leaf, Mail, Phone, Facebook, Linkedin, Instagram } from 'lucide-react';

const footerLinks = [
  { title: 'Sākums', href: '/' },
  { title: 'Pakalpojumi', href: '/pakalpojumi' },
  { title: 'Par mums', href: '/par-mums' },
  { title: 'Projekti', href: '/projekti' },
  { title: 'Kontakti', href: '/kontakti' },
  { title: 'Dokumenti', href: '/dokumenti' },
];

export function Footer() {
  console.log('Footer component rendered');

  return (
    <footer className="bg-metan-gray text-white">
      <div className="metan-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="bg-metan-gradient p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              METAN.LV
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              SIA "Ainavas Nams" – uzticams partneris atkritumu apsaimniekošanā un biometāna ražošanā Latvijā.
            </p>
            <div className="flex gap-4">
              <a 
                href="/social/facebook.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                onClick={() => console.log('Footer social link clicked: Facebook')}
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="/social/linkedin.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                onClick={() => console.log('Footer social link clicked: LinkedIn')}
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="/social/instagram.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                onClick={() => console.log('Footer social link clicked: Instagram')}
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Ātrās saites</h3>
            <div className="space-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Kontakti</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <a 
                  href="mailto:tsv@metan.lv"
                  className="hover:text-white transition-colors"
                  onClick={() => console.log('Footer email clicked: tsv@metan.lv')}
                >
                  tsv@metan.lv
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <a 
                  href="tel:+37127727724"
                  className="hover:text-white transition-colors"
                  onClick={() => console.log('Footer phone clicked: +371 27727724')}
                >
                  +371 27727724
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © 2025 SIA "Ainavas Nams". Visas tiesības aizsargātas.
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/privatuma-politika" className="text-gray-400 hover:text-white transition-colors">
              Privātuma politika
            </Link>
            <Link href="/sikdatnu-politika" className="text-gray-400 hover:text-white transition-colors">
              Sīkdatņu politika
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}