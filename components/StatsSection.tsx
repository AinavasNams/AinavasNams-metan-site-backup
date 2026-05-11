'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { TrendingUp, DollarSign, Factory, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  {
    icon: DollarSign,
    value: 1738000,
    suffix: '€',
    key: 'stats.investment',
    prefix: '',
    gradient: 'from-green-400 to-green-600',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: TrendingUp,
    value: 48.3,
    suffix: '%',
    key: 'stats.roi',
    prefix: '~',
    gradient: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Factory,
    value: 10000,
    suffix: '+',
    key: 'stats.processed',
    prefix: '',
    gradient: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Zap,
    value: 26951,
    suffix: ' MWh',
    key: 'stats.energy',
    prefix: '',
    gradient: 'from-yellow-400 to-yellow-600',
    bgColor: 'bg-yellow-500/10',
  },
];

export function StatsSection() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-metan-primary via-metan-primary to-metan-accent text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{backgroundImage: 'url(https://images.pexels.com/photos/31403876/pexels-photo-31403876.jpeg?auto=compress&cs=tinysrgb&h=650&w=940)'}}></div>
      </div>
      
      <div className="absolute top-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-metan-accent/30 rounded-full blur-lg animate-bounce"></div>
      
      <div className="metan-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {t('stats.title')}
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t('stats.subtitle')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="flex justify-center mb-6">
                <div className={`${stat.bgColor} backdrop-blur-sm p-6 rounded-2xl border border-white/20 group-hover:scale-110 transition-all duration-300`}>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.gradient} flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {stat.prefix}
                {inView && (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    separator=" "
                    decimals={stat.value % 1 !== 0 ? 1 : 0}
                  />
                )}
                {stat.suffix}
              </div>
              <p className="text-white/90 text-lg font-medium">
                {t(stat.key)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
