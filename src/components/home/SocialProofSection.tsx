import React from 'react';
import { motion } from 'motion/react';
import { Heart, School, Trophy, Users } from 'lucide-react';

export function SocialProofSection() {
  return (
    <section className="pt-32 pb-12 bg-white/60 border-y border-slate-200/60 relative z-10 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <p className="text-center text-slate-500 font-bold uppercase tracking-wider text-sm mb-8">
          Con la confianza de miles de familias y educadores
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-slate-200">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-col items-center justify-center">
            <div className="bg-pink-100 text-pink-500 p-3 rounded-full mb-3">
              <Heart size={24} fill="currentColor" />
            </div>
            <h4 className="text-3xl font-black text-slate-800">+10.000</h4>
            <p className="text-slate-600 font-bold text-sm">Niños Felices</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col items-center justify-center">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full mb-3">
              <School size={24} />
            </div>
            <h4 className="text-3xl font-black text-slate-800">+50</h4>
            <p className="text-slate-600 font-bold text-sm">Colegios Asociados</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col items-center justify-center">
            <div className="bg-yellow-100 text-yellow-500 p-3 rounded-full mb-3">
              <Trophy size={24} />
            </div>
            <h4 className="text-3xl font-black text-slate-800">Top 1</h4>
            <p className="text-slate-600 font-bold text-sm">App Educativa 2025</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-col items-center justify-center">
            <div className="bg-green-100 text-green-600 p-3 rounded-full mb-3">
              <Users size={24} />
            </div>
            <h4 className="text-3xl font-black text-slate-800">4.9/5</h4>
            <p className="text-slate-600 font-bold text-sm">Valoración de Padres</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
