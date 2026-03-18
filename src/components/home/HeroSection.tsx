import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Play } from 'lucide-react';

export function HeroSection({ onRegisterClick }: { onRegisterClick: () => void }) {
  return (
    <section className="container mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col items-center justify-center gap-12 relative z-10 pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 text-center pointer-events-auto max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-bold mb-6">
          <Sparkles size={18} />
          <span>Aprendizaje impulsado por IA</span>
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
          Aprende y <br /> Juega con <br />
          <span className="bg-[#a855f7] text-white px-8 py-2 md:py-4 rounded-3xl inline-block mt-4 border-[6px] border-[#d8b4fe] shadow-[0_0_40px_rgba(168,85,247,0.6)] tracking-wide">Infantia KIDS</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-6 max-w-2xl mx-auto font-medium">
          La plataforma educativa donde la inteligencia artificial se adapta al ritmo de cada niño, haciendo que aprender sea una aventura mágica y segura.
        </p>
        <div className="bg-indigo-50/80 border border-indigo-100 p-6 rounded-2xl max-w-3xl mx-auto mb-10">
          <h3 className="text-xl font-bold text-indigo-900 mb-2">Nuestra Misión</h3>
          <p className="text-indigo-700 font-medium">
            Queremos lograr que cada niño tenga acceso a una educación personalizada que potencie sus habilidades únicas, preparándolos para el futuro mientras se divierten y aprenden en un entorno seguro y estimulante.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onRegisterClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-8 rounded-full shadow-lg shadow-indigo-200 transition-transform hover:scale-105 flex items-center justify-center gap-2 text-lg"
          >
            <Play size={20} fill="currentColor" />
            Probar gratis
          </button>
          <button className="bg-white hover:bg-slate-50 text-slate-700 font-black py-4 px-8 rounded-full shadow-sm border-2 border-slate-200 transition-colors flex items-center justify-center gap-2 text-lg">
            Ver video
          </button>
        </div>
      </motion.div>
    </section>
  );
}
