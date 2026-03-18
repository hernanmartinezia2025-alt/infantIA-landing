import React from 'react';
import { motion } from 'motion/react';

export function CTASection({ onRegisterClick }: { onRegisterClick: () => void }) {
  return (
    <section className="py-24 bg-indigo-600 relative overflow-hidden z-10">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 relative z-10 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">¿Listo para la aventura?</h2>
        <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto font-medium">
          Únete a miles de padres que ya confían en InfantIA para el desarrollo cognitivo de sus hijos en un entorno seguro.
        </p>
        <button 
          onClick={onRegisterClick}
          className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-black py-4 px-10 rounded-full shadow-xl transition-transform hover:scale-105 text-xl"
        >
          Comienza tu prueba de 7 días
        </button>
      </motion.div>
    </section>
  );
}
