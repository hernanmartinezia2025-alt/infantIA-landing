import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle } from 'lucide-react';

const painPoints = [
  '¿Siente que su hijo no aprovecha su verdadero potencial en la escuela?',
  '¿Se frustra cuando ve que aprende diferente a los demás niños?',
  '¿No sabe por dónde empezar para ayudarlo mejor?',
];

export function ProblemSection() {
  return (
    <section className="bg-white py-20 rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.03)] relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-bold mb-6 text-sm">
            <HelpCircle size={16} />
            <span>¿Te suena familiar?</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Todos los niños aprenden,<br />
            pero <span className="text-purple-600">no todos aprenden igual.</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            La mayoría de los padres sienten que algo podría hacerse diferente, pero sin herramientas concretas no saben exactamente qué.
          </p>
        </motion.div>

        <div className="grid gap-5">
          {painPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="flex items-start gap-4 bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-sm"
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">😔</span>
              <p className="text-slate-700 font-semibold text-base md:text-lg">{point}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-12 bg-indigo-50 border border-indigo-100 rounded-3xl p-8 text-center"
        >
          <p className="text-xl md:text-2xl font-black text-indigo-900 leading-snug">
            💡 Cada niño tiene un tipo de mente único.<br />
            <span className="font-semibold text-indigo-700">Conocerlo cambia todo.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
