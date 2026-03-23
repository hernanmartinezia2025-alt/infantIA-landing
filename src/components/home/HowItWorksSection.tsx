import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, ClipboardList, FileDown } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: <ShoppingCart size={32} />,
    color: 'bg-purple-100 text-purple-600',
    title: 'Comprás el informe',
    description: 'Un único pago simple y seguro. Sin suscripciones ni cargos ocultos.',
  },
  {
    number: '02',
    icon: <ClipboardList size={32} />,
    color: 'bg-amber-100 text-amber-600',
    title: 'Completás el formulario',
    description: 'Respondés 15 preguntas sencillas sobre tu hijo. Tarda menos de 5 minutos.',
  },
  {
    number: '03',
    icon: <FileDown size={32} />,
    color: 'bg-emerald-100 text-emerald-600',
    title: 'Recibís el informe',
    description: 'En menos de 24 horas, el informe completo llega a tu correo en formato PDF.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-sky-50 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-lg text-slate-600 font-medium max-w-xl mx-auto">
            Simple, rápido y sin complicaciones.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5 bg-slate-200 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              {/* Step number */}
              <div className="text-sm font-black text-slate-400 mb-3 tracking-widest">PASO {step.number}</div>

              {/* Icon circle */}
              <div className={`w-20 h-20 rounded-full ${step.color} flex items-center justify-center mb-6 shadow-md`}>
                {step.icon}
              </div>

              <div className="bg-white rounded-[2rem] p-6 border-2 border-slate-100 shadow-sm w-full">
                <h3 className="text-xl font-black text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
