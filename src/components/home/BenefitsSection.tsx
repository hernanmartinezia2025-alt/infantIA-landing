import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const benefits = [
  'El tipo de mente predominante de tu hijo y qué significa en la práctica',
  'Sus fortalezas cognitivas y cómo potenciarlas con actividades concretas',
  'Los ambientes de aprendizaje en los que se desarrolla mejor',
  'Cómo hablarle, enseñarle y motivarlo según su perfil',
  'Recomendaciones de rutinas, juegos y hábitos personalizados',
  'Un mapa claro para acompañar su crecimiento con confianza',
];

export function BenefitsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-sky-50 relative z-10">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            ¿Qué vas a descubrir{' '}
            <span className="text-purple-600">en el informe?</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium">
            Todo lo que necesitás saber sobre cómo aprende y procesa el mundo tu hijo.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex items-start gap-4 bg-white border border-slate-100 rounded-2xl px-6 py-4 shadow-sm"
            >
              <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-0.5" size={22} />
              <p className="text-slate-700 font-semibold text-base md:text-lg">{benefit}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
