import React from 'react';
import { motion } from 'motion/react';

const EMOJIS = [
  { emoji: '🚀', top: '15%', left: '5%', size: 'text-5xl', delay: 0 },
  { emoji: '🧸', top: '25%', left: '85%', size: 'text-6xl', delay: 1 },
  { emoji: '🎨', top: '65%', left: '8%', size: 'text-4xl', delay: 0.5 },
  { emoji: '🧩', top: '75%', left: '82%', size: 'text-5xl', delay: 1.5 },
  { emoji: '🎈', top: '35%', left: '45%', size: 'text-6xl', delay: 2 },
  { emoji: '🤖', top: '45%', left: '90%', size: 'text-5xl', delay: 0.8 },
  { emoji: '🦖', top: '85%', left: '40%', size: 'text-6xl', delay: 1.2 },
  { emoji: '🚂', top: '20%', left: '55%', size: 'text-4xl', delay: 2.5 },
  { emoji: '⚽', top: '55%', left: '20%', size: 'text-5xl', delay: 1.8 },
  { emoji: '🖍️', top: '10%', left: '35%', size: 'text-4xl', delay: 0.3 },
];

export function FloatingBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {EMOJIS.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.size} pointer-events-auto cursor-pointer opacity-40 hover:opacity-100 transition-opacity`}
          style={{ top: item.top, left: item.left }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.5, rotate: 360, transition: { duration: 0.5 } }}
          whileTap={{ scale: 0.9 }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}
