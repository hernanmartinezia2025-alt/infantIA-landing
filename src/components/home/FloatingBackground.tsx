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

// Only allow interaction with emojis near screen edges so they don't block content
const EDGE_THRESHOLD = 15; // percentage from any edge
function isNearEdge(top: string, left: string): boolean {
  const t = parseFloat(top);
  const l = parseFloat(left);
  return l <= EDGE_THRESHOLD || l >= (100 - EDGE_THRESHOLD) || t <= EDGE_THRESHOLD || t >= (100 - EDGE_THRESHOLD);
}

export function FloatingBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {EMOJIS.map((item, index) => {
        const interactive = isNearEdge(item.top, item.left);
        return (
          <motion.div
            key={index}
            className={`absolute ${item.size} ${interactive ? 'pointer-events-auto cursor-pointer hover:opacity-100' : 'pointer-events-none'} opacity-40 transition-opacity`}
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
            {...(interactive && {
              whileHover: { scale: 1.5, rotate: 360, transition: { duration: 0.5 } },
              whileTap: { scale: 0.9 },
            })}
          >
            {item.emoji}
          </motion.div>
        );
      })}
    </div>
  );
}
