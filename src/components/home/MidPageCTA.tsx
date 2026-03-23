import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';

export function MidPageCTA({ onBuyClick }: { onBuyClick: () => void }) {
  return (
    <section className="py-12 bg-white relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="container mx-auto px-6 max-w-3xl"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[2rem] px-8 py-10 text-center shadow-2xl">
          <p className="text-white text-2xl md:text-3xl font-black mb-2">
            ¿Listo para entender a tu hijo?
          </p>
          <p className="text-indigo-200 font-medium mb-7 text-lg">
            Informe completo · Entrega en 24 hs · Un solo pago
          </p>
          <motion.button
            onClick={onBuyClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-black py-3.5 px-10 rounded-full shadow-xl shadow-amber-900/30 text-lg flex items-center gap-3 mx-auto"
          >
            <ShoppingBag size={20} />
            Quiero el informe ahora
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
