import React from 'react';
import { motion } from 'motion/react';
import { Users, Heart, Sparkles } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="quienes-somos" className="py-24 bg-white relative z-10">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full font-bold mb-6">
            <Users size={18} />
            <span>Quiénes somos</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Nuestra Misión en InfantIA
          </h2>
          <p className="text-xl text-slate-600 font-medium leading-relaxed">
            Somos un equipo de educadores, psicólogos infantiles y expertos en tecnología unidos por un propósito: hacer que el aprendizaje temprano sea accesible, personalizado y profundamente divertido para cada niño.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden relative shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1503454537195-1dc534825562?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Niños aprendiendo felices" 
                className="object-cover w-full h-full"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 max-w-[240px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-pink-100 text-pink-500 p-2 rounded-full">
                  <Heart size={20} fill="currentColor" />
                </div>
                <span className="font-black text-xl text-slate-800">100%</span>
              </div>
              <p className="text-sm font-bold text-slate-600">Comprometidos con el desarrollo infantil</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <Sparkles className="text-amber-500" />
                Nuestra Visión
              </h3>
              <p className="text-slate-600 text-lg">
                Creemos en un mundo donde la tecnología no aísla, sino que conecta y potencia las capacidades naturales de cada niño, respetando su ritmo y estilo único de aprendizaje.
              </p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <h4 className="font-black text-slate-800 mb-4">Nuestros Valores:</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  Educación basada en la empatía
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  Seguridad y privacidad ante todo
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  Innovación con propósito
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  Diversión como motor del aprendizaje
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
