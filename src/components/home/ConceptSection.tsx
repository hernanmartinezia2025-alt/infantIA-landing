import React from 'react';
import { motion } from 'motion/react';

const mindTypes = [
  { emoji: '🎨', name: 'Explorador Creativo', color: 'bg-rose-50 border-rose-200' },
  { emoji: '📐', name: 'Analítico Preciso', color: 'bg-blue-50 border-blue-200' },
  { emoji: '🌿', name: 'Conector Empático', color: 'bg-emerald-50 border-emerald-200' },
  { emoji: '🚀', name: 'Impulsor Activo', color: 'bg-amber-50 border-amber-200' },
  { emoji: '🔭', name: 'Pensador Profundo', color: 'bg-purple-50 border-purple-200' },
];

export function ConceptSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-sky-50 to-white relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            El concepto clave:{' '}
            <span className="text-purple-600">Tipo de mente</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Más allá de "visual, auditivo o kinestésico", identificamos el perfil cognitivo completo de tu hijo según cómo procesa, explora y conecta con el mundo.
          </p>
        </motion.div>

        {/* Mind type grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {mindTypes.map((type, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 ${type.color} shadow-sm transition-all cursor-default`}
            >
              <span className="text-3xl">{type.emoji}</span>
              <p className="text-slate-800 font-black text-xs text-center leading-snug">{type.name}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-indigo-900 rounded-[2.5rem] p-10 text-center text-white shadow-2xl"
        >
          <p className="text-xl md:text-2xl font-bold leading-relaxed mb-3">
            No existe un tipo de mente <em>mejor</em> que otro.
          </p>
          <p className="text-indigo-200 text-lg font-medium max-w-2xl mx-auto">
            Cada perfil tiene sus propias fortalezas únicas. El informe te ayuda a entender las de <strong className="text-white">tu hijo</strong> y cómo celebrarlas.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
