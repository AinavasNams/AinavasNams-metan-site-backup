'use client';

import { Phone, Truck, FileText, Cog, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    { 
      icon: Phone, 
      key: 'how.step1',
      bgImage: 'https://images.pexels.com/photos/7512967/pexels-photo-7512967.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      gradient: 'from-green-400 to-green-600',
    },
    { 
      icon: Truck, 
      key: 'how.step2',
      bgImage: 'https://images.pexels.com/photos/31403876/pexels-photo-31403876.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      gradient: 'from-blue-400 to-blue-600',
    },
    { 
      icon: FileText, 
      key: 'how.step3',
      bgImage: 'https://images.pexels.com/photos/6994743/pexels-photo-6994743.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      gradient: 'from-purple-400 to-purple-600',
    },
    { 
      icon: Cog, 
      key: 'how.step4',
      bgImage: 'https://images.pexels.com/photos/27404517/pexels-photo-27404517.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      gradient: 'from-orange-400 to-orange-600',
    },
    { 
      icon: Zap, 
      key: 'how.step5',
      bgImage: 'https://images.pexels.com/photos/12495809/pexels-photo-12495809.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      gradient: 'from-yellow-400 to-yellow-600',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-cover bg-center" 
             style={{backgroundImage: 'url(https://images.pexels.com/photos/31403876/pexels-photo-31403876.jpeg?auto=compress&cs=tinysrgb&h=650&w=940)'}}></div>
      </div>
      
      <div className="absolute top-20 left-20 w-32 h-32 bg-metan-primary/5 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-metan-accent/10 rounded-full blur-xl animate-bounce"></div>
      
      <div className="metan-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-metan-gray mb-4">
            {t('how.title')}
          </h2>
          <p className="text-xl text-metan-text max-w-2xl mx-auto">
            {t('how.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center relative group"
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-metan-primary to-metan-accent transform translate-x-4 z-0 opacity-30"></div>
              )}
              
              <div className="relative z-10 w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-metan-primary to-metan-accent rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                {index + 1}
              </div>
              
              <div className="relative w-20 h-20 mx-auto mb-4 group-hover:scale-105 transition-transform">
                <div className="absolute inset-0 rounded-full opacity-20 bg-cover bg-center" 
                     style={{backgroundImage: `url(${step.bgImage})`}}></div>
                <div className={`relative w-full h-full bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm`}>
                  <step.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <p className="text-metan-text font-medium px-2 group-hover:text-metan-primary transition-colors">
                {t(step.key)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
