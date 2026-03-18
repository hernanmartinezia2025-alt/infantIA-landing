import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Globe, Sparkles, Cpu } from 'lucide-react';

export function FutureSection() {
  return (
    <section id="futuro" className="py-24 bg-slate-900 text-white relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full font-bold mb-6 border border-indigo-500/30">
            <Rocket size={18} />
            <span>El futuro de InfantIA</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">
            Hacia dónde vamos
          </h2>
          <p className="text-xl text-slate-300 font-medium leading-relaxed">
            Nuestra hoja de ruta está diseñada para revolucionar la educación infantil a nivel global, integrando las últimas tecnologías con pedagogías probadas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors"
          >
            <div className="bg-indigo-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-indigo-400">
              <Globe size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4">Expansión Global</h3>
            <p className="text-slate-400 text-lg">
              Llevaremos InfantIA a más de 50 países, adaptando el contenido a múltiples idiomas y contextos culturales para una educación verdaderamente inclusiva.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors"
          >
            <div className="bg-pink-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-pink-400">
              <Sparkles size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4">Realidad Aumentada</h3>
            <p className="text-slate-400 text-lg">
              Integración de experiencias inmersivas donde los niños podrán interactuar con personajes y conceptos educativos en su propio entorno físico.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors"
          >
            <div className="bg-emerald-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-emerald-400">
              <Cpu size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4">IA Emocional</h3>
            <p className="text-slate-400 text-lg">
              Desarrollo de algoritmos capaces de detectar frustración o aburrimiento para adaptar el ritmo y el tono de la enseñanza en tiempo real.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
