'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  href: string;
  labelKey: string;
  isLast?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t } = useTranslation();

  return (
    <nav className="py-4 bg-gray-50 border-b border-gray-100">
      <div className="metan-container">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center space-x-2 text-sm"
        >
          <Link 
            href="/" 
            className="flex items-center text-gray-500 hover:text-metan-primary transition-colors"
          >
            <Home className="h-4 w-4" />
          </Link>
          
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              {item.isLast ? (
                <span className="font-medium text-metan-primary">
                  {t(item.labelKey)}
                </span>
              ) : (
                <Link 
                  href={item.href}
                  className="text-gray-500 hover:text-metan-primary transition-colors"
                >
                  {t(item.labelKey)}
                </Link>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </nav>
  );
}