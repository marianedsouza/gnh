import React from 'react';
import { motion } from 'motion/react';

export const HeroIllustration = () => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = 0.2 + i * 0.3;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 3, bounce: 0 },
          opacity: { delay, duration: 0.5 }
        }
      };
    }
  };

  return (
    <div className="w-full max-w-[500px] aspect-square relative flex items-center justify-center">
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-2xl"
        initial="hidden"
        animate="visible"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFC373" />
            <stop offset="50%" stopColor="#C99D3C" />
            <stop offset="100%" stopColor="#8A601B" />
          </linearGradient>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B1B33" />
            <stop offset="100%" stopColor="#1B3A64" />
          </linearGradient>
        </defs>

        {/* --- Arcos e Geometria Sagrada (Fundo) --- */}
        <motion.circle cx="100" cy="100" r="85" fill="none" stroke="url(#goldGradient)" strokeWidth="0.5" strokeDasharray="2 4" variants={draw} custom={0} />
        <motion.circle cx="100" cy="100" r="70" fill="none" stroke="url(#blueGradient)" strokeWidth="0.5" variants={draw} custom={0.5} />
        <motion.path d="M 15 100 A 85 85 0 0 0 185 100" fill="none" stroke="url(#goldGradient)" strokeWidth="1" variants={draw} custom={1} />

        {/* --- Montanha (Ao Fundo) --- */}
        <g transform="translate(60, 90) scale(3.5)" stroke="url(#blueGradient)" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <motion.path d="M8 3l4 8 5-5 5 15H2L8 3z" variants={draw} custom={1.5} />
        </g>

        {/* --- Sol (No Centro / Nascente) --- */}
        <g transform="translate(85, 75) scale(1.25)" stroke="url(#goldGradient)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <motion.circle cx="12" cy="12" r="4" variants={draw} custom={2} />
          <motion.path d="M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M6.34 17.66l-1.41 1.41 M19.07 4.93l-1.41 1.41" variants={draw} custom={2.5} />
        </g>

        {/* --- Ondas / Água (Base) --- */}
        <motion.path d="M 40 145 Q 100 155 160 145 M 50 152 Q 100 160 150 152 M 65 159 Q 100 165 135 159" fill="none" stroke="url(#goldGradient)" strokeWidth="1" strokeLinecap="round" variants={draw} custom={3} />

        {/* --- Mãos em Concha (Apoio) --- */}
        <g transform="translate(80, 120) scale(1.8)" stroke="url(#goldGradient)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Hand icon adaptation */}
          <motion.path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0 M14 4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0 M10 4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0 M6 6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v7.5 M18 11s0 5-6 8 M4 13s0 6 6 8 M10 21h4" variants={draw} custom={3.5} />
        </g>

        {/* --- Pessoas (Comunidade/Crescimento) --- */}
        <g transform="translate(65, 100) scale(1.5)" stroke="url(#goldGradient)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Users icon adaptation */}
          <motion.path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" variants={draw} custom={4.5} />
        </g>

        {/* --- Pássaro (Liberdade / Despertar) na Direita --- */}
        <g transform="translate(130, 40) scale(1.8)" stroke="url(#goldGradient)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Bird icon adaptation */}
          <motion.path d="M16 7h.01 M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20 M20 7l-2 3" variants={draw} custom={5.5} />
        </g>

        {/* --- Folha (Regeneração / Natureza) na Esquerda --- */}
        <g transform="translate(30, 40) scale(1.8)" stroke="url(#goldGradient)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Leaf icon adaptation */}
          <motion.path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z M2 22l10-10" variants={draw} custom={6.5} />
        </g>
        
        {/* --- Estrela Polar / Norte (Topo Centro) --- */}
        <g transform="translate(90, 15) scale(0.8)" stroke="url(#goldGradient)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Sparkles icon adaptation */}
          <motion.path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" variants={draw} custom={7.5} />
        </g>

      </motion.svg>
    </div>
  );
};
