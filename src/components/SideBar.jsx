import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Home, Layers3, Terminal, UserRound } from 'lucide-react';

const MotionDiv = motion.div;

const navItems = [
  { icon: Home, label: 'Home', id: 'home' },
  { icon: UserRound, label: 'About', id: 'about' },
  { icon: Layers3, label: 'Skills', id: 'skills' },
  { icon: Briefcase, label: 'Projects', id: 'projects' },
  { icon: GraduationCap, label: 'Education', id: 'education' },
  { icon: Terminal, label: 'Contact', id: 'contact' },
];

function SideBar() {
  const [active, setActive] = useState('home');

  const handleClick = (id) => {
    setActive(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="relative">
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] md:left-8 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 w-[92%] max-w-sm md:w-20 md:h-fit">
        <div className="relative flex items-center justify-around p-2 border md:flex-col md:justify-center md:gap-4 md:p-4 rounded-3xl border-blue-500/30 bg-blue-950/10 backdrop-blur-2xl shadow-[0_0_20px_rgba(59,130,246,0.15)]">
          <div className="hidden pb-4 mb-2 border-b md:flex border-blue-500/20 text-blue-400/70">
            <Terminal size={24} />
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleClick(item.id)}
                className="relative flex items-center justify-center p-4 group transition-transform active:scale-90"
              >
                {isActive && (
                  <MotionDiv
                    layoutId="activeBackground"
                    className="absolute inset-0 bg-blue-500/20 rounded-2xl border border-blue-400/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <Icon
                  size={24}
                  className={`relative z-10 transition-all duration-300 ${
                    isActive
                      ? 'text-blue-400 scale-110 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]'
                      : 'text-blue-200/40 group-hover:text-blue-300'
                  }`}
                />

                <span className="absolute left-20 hidden md:group-hover:block px-3 py-1.5 bg-blue-900/40 backdrop-blur-md border border-blue-500/30 text-blue-100 text-xs rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default SideBar;