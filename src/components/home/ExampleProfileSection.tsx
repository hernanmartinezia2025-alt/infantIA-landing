import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb } from 'lucide-react';

const characteristics = [
  { emoji: '🎨', text: 'Aprende mejor a través de imágenes, colores y creación libre' },
  { emoji: '🔍', text: 'Necesita explorar con sus manos antes de entender conceptos' },
  { emoji: '💡', text: 'Se destaca en la resolución creativa de problemas nuevos' },
];

const recommendations = [
  'Usá materiales visuales y manualidades para reforzar lo que aprende en la escuela',
  'Permitile explorar libremente antes de seguir instrucciones paso a paso',
];

export function ExampleProfileSection() {
  return (
    <section className="py-20 bg-white relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Ejemplo real:{' '}
            <span className="text-rose-500">Explorador Creativo</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium">
            Así se ve un perfil dentro del informe.
          </p>
        </motion.div>

        <div className="bg-gradient-to-br from-rose-50 to-orange-50 border-2 border-rose-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
          {/* Profile header */}
          <div className="flex items-center gap-5 mb-8">
            <div className="w-20 h-20 bg-rose-500 rounded-3xl flex items-center justify-center text-4xl shadow-lg flex-shrink-0">
              🎨
            </div>
            <div>
              <p className="text-rose-600 font-bold text-sm uppercase tracking-widest mb-1">Tipo de mente</p>
              <h3 className="text-3xl font-black text-slate-900">Explorador Creativo</h3>
            </div>
          </div>

          {/* Characteristics */}
          <div className="mb-8">
            <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-rose-200 text-rose-700 rounded-lg flex items-center justify-center text-sm font-black">3</span>
              Características principales
            </h4>
            <div className="flex flex-col gap-3">
              {characteristics.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3 bg-white rounded-xl px-5 py-3 border border-rose-100 shadow-sm"
                >
                  <span className="text-xl flex-shrink-0">{c.emoji}</span>
                  <p className="text-slate-700 font-semibold">{c.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <Lightbulb size={20} className="text-amber-500" />
              Recomendaciones para hoy
            </h4>
            <div className="flex flex-col gap-3">
              {recommendations.map((r, i) => (
                <div key={i} className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl px-5 py-3">
                  <span className="text-amber-500 font-black flex-shrink-0 mt-0.5">→</span>
                  <p className="text-slate-700 font-semibold">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
