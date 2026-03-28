import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Rocket, Shield } from 'lucide-react';

export function ClosingSection({ onBuyClick }: { onBuyClick: () => void }) {
  return (
    <section className="py-24 bg-gradient-to-b from-sky-50 to-slate-900 relative overflow-hidden z-10">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Vision block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="bg-white rounded-[2.5rem] p-10 md:p-14 text-center shadow-2xl mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-bold mb-6 text-sm">
            <Rocket size={16} />
            <span>El futuro de InfantIA</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
            Este informe es solo el{' '}
            <span className="text-purple-600">comienzo</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
            InfantIA está construyendo una plataforma completa de aprendizaje personalizado para niños. Los que compren el informe hoy tendrán <strong className="text-slate-800">acceso prioritario</strong> a las herramientas que lanzaremos próximamente: actividades adaptativas, seguimiento del progreso y mucho más.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-3">
              <Shield size={18} className="text-emerald-600" />
              <span className="text-emerald-700 font-bold text-sm">Acceso prioritario a la plataforma</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-xl px-5 py-3">
              <Rocket size={18} className="text-purple-600" />
              <span className="text-purple-700 font-bold text-sm">Precio especial de fundadores</span>
            </div>
          </div>

          <motion.button
            onClick={onBuyClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-black py-4 px-10 rounded-full shadow-xl shadow-amber-200 text-xl flex items-center gap-3 mx-auto"
          >
            <ShoppingBag size={22} />
            Quiero el informe de mi hijo
          </motion.button>

          <p className="mt-5 text-slate-400 font-medium text-sm">
            Un solo pago. Sin suscripciones. Informe listo en menos de 24 horas.
          </p>
        </motion.div>

        {/* Final trust message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="text-center text-slate-400"
        >
          <p className="font-bold text-lg text-slate-300 mb-2">
            Tu hijo tiene un tipo de mente único. <span className="text-white">Ya es hora de descubrirlo.</span>
          </p>
          <p className="text-slate-500 font-medium text-sm">
            © {new Date().getFullYear()} InfantIA · Herramienta educativa con IA · No es diagnóstico clínico
          </p>
        </motion.div>
      </div>
    </section>
  );
}
