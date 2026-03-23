import React from 'react';
import { motion } from 'motion/react';
import { FileText, Target, Heart } from 'lucide-react';

const propositions = [
  {
    icon: <FileText size={28} />,
    color: 'bg-purple-100 text-purple-600',
    title: '¿Qué es el informe?',
    description:
      'Un documento digital completo generado por IA que analiza el perfil cognitivo de tu hijo: su tipo de mente, estilo de aprendizaje, fortalezas y áreas de desarrollo.',
  },
  {
    icon: <Target size={28} />,
    color: 'bg-emerald-100 text-emerald-600',
    title: '¿Qué problema resuelve?',
    description:
      'Elimina la incertidumbre. Deja de adivinar cómo ayudar a tu hijo y obtené un diagnóstico claro, accionable y fácil de entender.',
  },
  {
    icon: <Heart size={28} />,
    color: 'bg-rose-100 text-rose-600',
    title: '¿Qué cambia para vos?',
    description:
      'Pasás de sentirte perdido/a a tener una guía concreta. Sabés exactamente cómo estimular a tu hijo, con qué actividades y en qué momentos.',
  },
];

export function ValuePropositionSection() {
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
            ¿Qué es exactamente{' '}
            <span className="text-purple-600">el informe InfantIA?</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            No es un test genérico. Es un análisis profundo y personalizado, diseñado especialmente para el desarrollo infantil.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {propositions.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="bg-slate-50 rounded-[2rem] p-8 border-2 border-slate-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div className={`inline-flex p-4 rounded-2xl mb-5 ${p.color}`}>
                {p.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{p.title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
