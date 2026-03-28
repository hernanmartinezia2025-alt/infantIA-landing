import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShoppingBag, Brain, Lightbulb, Star } from 'lucide-react';

export function HeroSalesSection({ onBuyClick }: { onBuyClick: () => void }) {
  const bullets = [
    { icon: <Brain size={18} />, text: 'Informe cognitivo 100% personalizado para tu hijo' },
    { icon: <Lightbulb size={18} />, text: 'Descubre su tipo de mente y cómo potenciarlo' },
    { icon: <Star size={18} />, text: 'Recomendaciones prácticas listas para aplicar hoy' },
  ];

  return (
    <section className="container mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28 flex flex-col items-center justify-center gap-10 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="text-center max-w-4xl mx-auto"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-bold mb-6 text-sm">
          <Sparkles size={16} />
          <span>Informe cognitivo con Inteligencia Artificial</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight mb-5 tracking-tight">
          Descubrí cómo{' '}
          <span className="relative inline-block">
            <span className="bg-[#a855f7] text-white px-5 py-1 rounded-2xl inline-block border-4 border-[#d8b4fe] shadow-[0_0_36px_rgba(168,85,247,0.45)]">
              aprende tu hijo
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto font-medium leading-relaxed">
          Un informe completo generado por IA que revela el tipo de mente de tu hijo, sus fortalezas cognitivas y cómo acompañarlo mejor en su aprendizaje.
        </p>

        {/* Bullets */}
        <ul className="flex flex-col gap-3 items-center mb-10">
          {bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
              className="flex items-center gap-3 bg-white/80 border border-slate-100 rounded-xl px-5 py-3 shadow-sm font-semibold text-slate-700 text-base"
            >
              <span className="text-purple-500">{b.icon}</span>
              {b.text}
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button
          onClick={onBuyClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-black py-4 px-10 rounded-full shadow-xl shadow-amber-200 text-xl flex items-center gap-3 mx-auto"
        >
          <ShoppingBag size={22} />
          Quiero el informe de mi hijo
        </motion.button>

        {/* Micro-urgency */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-5 text-sm font-semibold text-rose-600 bg-rose-50 border border-rose-100 inline-block px-4 py-2 rounded-full"
        >
          ⏳ Precio de lanzamiento — Cupos limitados esta semana
        </motion.p>
      </motion.div>
    </section>
  );
}
