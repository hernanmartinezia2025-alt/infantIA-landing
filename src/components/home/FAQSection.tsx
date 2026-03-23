import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: '¿Qué es exactamente el informe InfantIA?',
    a: 'Es un documento digital de más de 12 páginas, generado por inteligencia artificial, que analiza el perfil cognitivo de tu hijo. Incluye su tipo de mente, estilo de aprendizaje, fortalezas, áreas de desarrollo y recomendaciones prácticas personalizadas.',
  },
  {
    q: '¿Qué incluye el informe?',
    a: 'El informe incluye: tipo de mente del niño, perfil cognitivo completo, fortalezas y áreas de mejora, actividades recomendadas según su estilo de aprendizaje, rutinas sugeridas y una guía para padres sobre cómo acompañarlo mejor.',
  },
  {
    q: '¿Cuánto tarda en llegar?',
    a: 'Una vez que completás el formulario, recibirás el informe en tu correo electrónico en menos de 24 horas hábiles, en formato PDF listo para leer o imprimir.',
  },
  {
    q: '¿Es un diagnóstico médico o psicológico?',
    a: 'No. El informe InfantIA es una herramienta educativa complementaria basada en perfiles cognitivos. No reemplaza ni equivale a un diagnóstico clínico. Si tenés dudas de salud mental o del neurodesarrollo, siempre consultá a un especialista.',
  },
  {
    q: '¿Para qué edad es el informe?',
    a: 'El informe está diseñado para niños de 3 a 10 años. El formulario tiene preguntas adaptadas a esa franja etaria para que el análisis sea lo más preciso y útil posible.',
  },
];

function FAQItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <span className="text-slate-800 font-bold text-base md:text-lg">{item.q}</span>
        <span className="flex-shrink-0 text-purple-600">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 py-5 bg-slate-50 border-t border-slate-100">
              <p className="text-slate-600 font-medium leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-20 bg-white relative z-10">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Preguntas frecuentes
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <FAQItem
                item={faq}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
