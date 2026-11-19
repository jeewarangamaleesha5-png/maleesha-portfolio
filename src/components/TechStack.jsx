import React from 'react';
import { motion } from 'framer-motion';
import { CircuitBoard, Cpu, Code2, HardDrive, MonitorCog } from 'lucide-react';

const MotionDiv = motion.div;

const techGroups = [
  {
    title: 'Electronics & Engineering',
    icon: CircuitBoard,
    items: ['Altium Designer', 'KiCad', 'Proteus', 'SolidWorks', 'PLECS'],
    accent: '#67e8f9',
  },
  {
    title: 'Microcontrollers',
    icon: Cpu,
    items: ['STM32', 'ESP32', 'AVR', 'PIC', 'Arduino'],
    accent: '#60a5fa',
  },
  {
    title: 'Programming',
    icon: Code2,
    items: ['C', 'C++', 'Java', 'JavaScript', 'TypeScript', 'Python'],
    accent: '#a78bfa',
  },
  {
    title: 'Electrical Design & Analysis',
    icon: MonitorCog,
    items: ['ETAP', 'AutoCAD', 'Excel', 'Load calculations', 'Protection studies', 'Testing tools'],
    accent: '#34d399',
  },
  {
    title: 'Systems & Control',
    icon: HardDrive,
    items: ['PLC', 'SCADA', 'HMI', 'PID control', 'Industrial networks'],
    accent: '#fbbf24',
  },
];

export default function TechStack() {
  return (
    <section className="section-shell bg-slate-950/25">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 top-10 h-[280px] w-[280px] rounded-full bg-blue-500/8 blur-[140px]" />
        <div className="absolute right-0 bottom-10 h-[300px] w-[300px] rounded-full bg-cyan-500/8 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <MotionDiv
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-slate-900/45 px-4 py-2 backdrop-blur-xl">
            <HardDrive className="h-4 w-4 text-cyan-300" />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-100/80 sm:text-xs">
              Technology stack
            </span>
          </div>

          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Tools and systems
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              behind each design
            </span>
          </h2>
        </MotionDiv>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {techGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <MotionDiv
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-[1.7rem] border border-white/10 bg-slate-900/45 p-5 backdrop-blur-xl"
              >
                <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-slate-950/55 p-3" style={{ boxShadow: `0 0 24px ${group.accent}22` }}>
                  <Icon className="h-5 w-5" style={{ color: group.accent }} />
                </div>
                <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-slate-950/55 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.14em] text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}
