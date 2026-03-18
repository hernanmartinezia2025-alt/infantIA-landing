import React from 'react';
import { motion } from 'motion/react';
import { Brain, BookOpen, Puzzle } from 'lucide-react';

function FeatureCard({ icon, title, description, color, delay = 0 }: { icon: React.ReactNode, title: string, description: string, color: string, delay?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className="bg-slate-50 rounded-[2rem] p-8 border-2 border-slate-100 shadow-sm hover:shadow-xl transition-all"
    >
      <div className={`inline-flex p-4 rounded-2xl mb-6 ${color}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{title}</h3>
      <p className="text-slate-600 text-lg font-medium leading-relaxed">{description}</p>
    </motion.div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="bg-white py-24 rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.03)] relative z-10">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Aprender nunca fue tan divertido</h2>
          <p className="text-xl text-slate-600 font-medium">Nuestra IA crea experiencias personalizadas que se adaptan al nivel y los intereses de cada niño.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Brain size={36} />}
            title="IA Adaptativa"
            description="El nivel de dificultad se ajusta automáticamente según el progreso del niño para mantenerlo motivado y sin frustraciones."
            color="bg-purple-100 text-purple-600"
            delay={0.1}
          />
          <FeatureCard 
            icon={<BookOpen size={36} />}
            title="Cuentos Interactivos"
            description="Historias generadas por IA donde los niños toman decisiones, fomentando la lectura y enseñando valores positivos."
            color="bg-emerald-100 text-emerald-600"
            delay={0.2}
          />
          <FeatureCard 
            icon={<Puzzle size={36} />}
            title="Juegos Lógicos"
            description="Rompecabezas y retos matemáticos diseñados por expertos para desarrollar el pensamiento crítico y la resolución de problemas."
            color="bg-amber-100 text-amber-600"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
