import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';

export function DemoSection({ onBuyClick }: { onBuyClick: () => void }) {
  const reportSections = [
    { label: 'Tipo de mente', color: 'bg-purple-100 text-purple-700', value: 'Explorador Creativo' },
    { label: 'Estilo de aprendizaje', color: 'bg-blue-100 text-blue-700', value: 'Visual–Kinestésico' },
    { label: 'Fortaleza principal', color: 'bg-emerald-100 text-emerald-700', value: 'Pensamiento espacial' },
    { label: 'Actividades recomendadas', color: 'bg-amber-100 text-amber-700', value: 'Arte, construcción, exploración' },
  ];

  return (
    <section className="py-20 bg-white relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Así se ve el informe
          </h2>
          <p className="text-lg text-slate-600 font-medium max-w-xl mx-auto">
            Claro, visual y fácil de entender. Diseñado para padres, no para especialistas.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-10 items-center">
          {/* Mockup Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex-1 w-full bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-900 rounded-[2.5rem] p-8 shadow-2xl border border-purple-800/30"
          >
            {/* Report header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-purple-300 font-bold text-sm tracking-widest uppercase mb-1">InfantIA Report</p>
                <h3 className="text-white text-2xl font-black">Perfil Cognitivo</h3>
              </div>
              <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🧠</span>
              </div>
            </div>

            {/* Child info */}
            <div className="bg-white/10 rounded-2xl p-4 mb-6 border border-white/10">
              <p className="text-purple-200 text-sm font-semibold mb-1">Perfil del niño</p>
              <p className="text-white font-black text-lg">Tomás · 6 años</p>
            </div>

            {/* Report sections */}
            <div className="flex flex-col gap-3">
              {reportSections.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3 border border-white/10"
                >
                  <span className="text-purple-200 font-semibold text-sm">{s.label}</span>
                  <span className={`${s.color} text-xs font-black px-3 py-1 rounded-full`}>{s.value}</span>
                </motion.div>
              ))}
            </div>

            {/* Decorative score */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-amber-400 text-lg">★</span>
                ))}
              </div>
              <span className="text-purple-300 text-sm font-semibold">+12 páginas de análisis</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex-1"
          >
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-5 tracking-tight">
              Un diagnóstico completo, <span className="text-purple-600">listo para usar</span>
            </h3>
            <p className="text-slate-600 font-medium text-lg mb-6 leading-relaxed">
              Más de 12 páginas de análisis personalizado. No recibís un resultado de 2 líneas: recibís un informe profundo con contexto, ejemplos reales y pasos concretos.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Análisis del tipo de mente y perfil cognitivo',
                'Fortalezas y áreas de desarrollo personalizadas',
                'Actividades prácticas según su estilo de aprendizaje',
                'Guía para padres sobre cómo acompañar mejor',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-semibold">
                  <span className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <motion.button
              onClick={onBuyClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-black py-3.5 px-8 rounded-full shadow-lg shadow-amber-200 text-lg flex items-center gap-2"
            >
              <ShoppingBag size={20} />
              Quiero este informe
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
