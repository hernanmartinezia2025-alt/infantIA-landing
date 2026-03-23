import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, CheckCircle2, Tag } from 'lucide-react';

const includes = [
  'Informe cognitivo completo (+12 páginas)',
  'Tipo de mente y perfil de aprendizaje',
  'Actividades y rutinas personalizadas',
  'Guía para padres incluida',
  'Entrega en menos de 24 horas (PDF)',
];

export function PricingSection({ onBuyClick }: { onBuyClick: () => void }) {
  return (
    <section id="precio" className="py-20 bg-indigo-900 relative overflow-hidden z-10">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Precio de lanzamiento
          </h2>
          <p className="text-indigo-200 text-lg font-medium max-w-xl mx-auto">
            Por tiempo limitado, mientras estamos en fase de lanzamiento.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto bg-white rounded-[2.5rem] p-10 shadow-2xl"
        >
          {/* Badge */}
          <div className="flex items-center justify-center mb-6">
            <span className="bg-rose-100 text-rose-600 font-black text-sm px-4 py-2 rounded-full flex items-center gap-2">
              <Tag size={14} />
              Precio de lanzamiento — Oferta limitada
            </span>
          </div>

          {/* Price */}
          <div className="text-center mb-8">
            <div className="flex items-end justify-center gap-3 mb-2">
              <span className="text-slate-400 line-through text-2xl font-bold">$4.999</span>
              <span className="text-6xl font-black text-slate-900">$2.499</span>
            </div>
            <p className="text-slate-500 font-semibold">Pago único — Sin suscripción</p>
          </div>

          {/* Includes */}
          <div className="flex flex-col gap-3 mb-8">
            {includes.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-700 font-semibold">
                <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            onClick={onBuyClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-black py-4 px-8 rounded-full shadow-xl shadow-amber-200 text-xl flex items-center justify-center gap-3"
          >
            <ShoppingBag size={22} />
            Comprar el informe ahora
          </motion.button>

          <p className="text-center text-slate-400 font-medium text-sm mt-4">
            ⏳ Esta oferta es válida solo durante el lanzamiento
          </p>
        </motion.div>
      </div>
    </section>
  );
}
