import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const idealCases = [
  'Papás y mamás que sienten que su hijo tiene potencial sin explorar',
  'Familias que quieren ir más allá de lo que ofrece la escuela tradicional',
  'Padres que notan que su hijo aprende diferente a sus hermanos o compañeros',
  'Quien busca herramientas prácticas para acompañar el desarrollo de su hijo',
  'Niños de 3 a 10 años que merecen una educación pensada para ellos',
  'Cualquier padre que quiera entender a su hijo más profundamente',
];

const notIdealCases = [
  'Quienes buscan un diagnóstico médico o psicológico clínico',
  'Padres que esperan resultados sin leer ni aplicar las recomendaciones',
];

export function ForWhoSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-sky-50 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            ¿Para quién es{' '}
            <span className="text-purple-600">este informe?</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Ideal */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2rem] p-8 border-2 border-emerald-100 shadow-sm"
          >
            <h3 className="text-xl font-black text-emerald-700 mb-5 flex items-center gap-2">
              <CheckCircle2 size={22} />
              Este informe ES para vos si…
            </h3>
            <ul className="space-y-3">
              {idealCases.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 font-semibold">
                  <span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not ideal */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-[2rem] p-8 border-2 border-slate-100 shadow-sm"
          >
            <h3 className="text-xl font-black text-slate-500 mb-5 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              No es para vos si…
            </h3>
            <ul className="space-y-3">
              {notIdealCases.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 font-semibold">
                  <span className="text-slate-400 flex-shrink-0 mt-0.5">✕</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-slate-500 font-medium text-sm">
                Este informe es una <strong>herramienta educativa complementaria</strong>, no un diagnóstico clínico.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
