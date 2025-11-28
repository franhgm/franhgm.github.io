/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Code, Users, Briefcase, Heart, Activity } from 'lucide-react';

// --- SKILL WIDGET ---
export const SkillWidget: React.FC = () => {
  const skills = [
    { name: "Digitalización", level: 95, icon: <Code size={16} /> },
    { name: "Gestión de Proyectos", level: 90, icon: <Briefcase size={16} /> },
    { name: "Liderazgo de Equipos", level: 85, icon: <Users size={16} /> },
    { name: "Innovación Pública", level: 88, icon: <Activity size={16} /> },
  ];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 w-full max-w-md">
      <h3 className="font-serif text-2xl mb-6 text-slate-800">Competencias Clave</h3>
      <div className="space-y-6">
        {skills.map((skill, index) => (
            <div key={index}>
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                        {skill.icon}
                        <span>{skill.name}</span>
                    </div>
                    <span className="text-sm text-slate-400 font-mono">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-slate-900 rounded-full"
                    />
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

// --- MUSIC INTERACTIVE WIDGET ---
export const MusicWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl shadow-xl text-white w-full max-w-md relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <Music size={120} />
        </div>
        
        <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold tracking-widest mb-4 border border-white/20 text-[#d4af37]">
                PASIÓN
            </div>
            <h3 className="font-serif text-3xl mb-2">Navarra Ukeclub</h3>
            <p className="text-slate-300 mb-6 text-sm leading-relaxed">
                Fomentando la comunidad musical en Navarra a través del ukelele. Encuentros, talleres y mucha música.
            </p>

            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-[#d4af37] text-slate-900 flex items-center justify-center hover:bg-white transition-colors"
                >
                    <Heart className={isPlaying ? "fill-current animate-pulse" : ""} size={20} />
                </button>
                <div className="flex flex-col">
                    <span className="text-sm font-bold">Presidente</span>
                    <span className="text-xs text-slate-400">Asociación de aficionados</span>
                </div>
            </div>
        </div>

        {/* Decorative Strings */}
        <div className="absolute bottom-0 left-0 right-0 h-32 flex justify-around pointer-events-none opacity-20">
            <div className="w-[1px] h-full bg-white"></div>
            <div className="w-[1px] h-full bg-white"></div>
            <div className="w-[1px] h-full bg-white"></div>
            <div className="w-[1px] h-full bg-white"></div>
        </div>
    </div>
  );
};
