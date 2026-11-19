import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, ArrowUpRight } from 'lucide-react';

const MotionDiv = motion.div;

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-[9998] p-4 sm:p-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex justify-between items-center gap-3">
        <MotionDiv
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto flex items-center gap-2 sm:gap-3 bg-blue-950/20 backdrop-blur-xl border border-blue-500/30 px-3 py-1.5 sm:px-5 sm:py-2 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.1)]"
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </div>

          <span className="font-bold tracking-[0.2em] text-blue-100 uppercase text-[10px] sm:text-xs">
            Maleesha <span className="hidden xs:inline text-blue-400/60 font-light ml-1">DEV.OS</span>
          </span>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto hidden items-center gap-3 rounded-2xl border border-blue-500/30 bg-blue-950/20 px-3 py-2 backdrop-blur-xl shadow-[0_0_20px_rgba(59,130,246,0.1)] lg:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-blue-100/80 transition hover:text-cyan-300"
            >
              <span>{item.label}</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          ))}
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto flex items-center gap-3 sm:gap-6 bg-blue-950/20 backdrop-blur-xl border border-blue-500/30 px-3 py-1.5 sm:px-5 sm:py-2 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.1)]"
        >
          <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-blue-300/60 uppercase">
            <div className="flex items-center gap-1">
              <Cpu size={12} className="text-blue-400" />
              <span>System_OK</span>
            </div>
            <div className="w-[1px] h-3 bg-blue-500/20" />
          </div>

          <div className="flex items-center gap-2 text-[11px] sm:text-sm font-mono text-blue-100 tabular-nums">
            <Zap size={14} className="text-yellow-400 animate-pulse fill-yellow-400/20" />
            {time || '00:00'}
          </div>
        </MotionDiv>
      </div>
    </header>
  );
}