'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServiceCalculatorRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Автоматическое перенаправление на главную страницу с калькулятором
    const timer = setTimeout(() => {
      router.replace('/#calculator');
    }, 100); // Короткая задержка для плавности

    return () => clearTimeout(timer);
  }, [router]);

  // Показываем короткое сообщение о перенаправлении
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Atveram kalkulatoru...
        </h2>
        <p className="text-gray-600">
          Pārvirzām uz galveno lapu ar kalkulatoru
        </p>
      </motion.div>
    </div>
  );
}