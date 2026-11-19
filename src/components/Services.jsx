import React from 'react';
import { motion } from 'framer-motion';
import { CircuitBoard, Cpu, Gauge, Lightbulb, PanelTop, Workflow } from 'lucide-react';

const MotionDiv = motion.div;

const serviceCards = [
  { icon: CircuitBoard, title: 'Electrical Panel Design', description: 'Structured panel layouts, circuit arrangement, protection coordination, and practical concepts suited to industrial electrical systems.' },
  { icon: Cpu, title: 'Control System Integration', description: 'Coordinated control logic, equipment interfacing, and system thinking for reliable industrial automation environments.' },
  { icon: Gauge, title: 'Industrial Control', description: 'Automation architecture, drive coordination, and practical machine control concepts for real-world industrial workflows.' },
  { icon: PanelTop, title: 'Electrical System Design', description: 'Power distribution, panel planning, protection logic, and installation-oriented technical documentation.' },
  { icon: Workflow, title: 'Industrial Automation', description: 'Implementation-focused process monitoring, PLC logic understanding, and responsive industrial control design.' },
  { icon: Lightbulb, title: 'Testing & Commissioning', description: 'Electrical verification, system checks, troubleshooting, and commissioning support for dependable startup and operation.' },
];

export default function Services() {
  return (
    <section className="section-shell bg-[#020b18]">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-0 top-8 h-[320px] w-[320px] rounded-full bg-indigo-500/8 blur-[150px]" />
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
            <Lightbulb className="h-4 w-4 text-cyan-300" />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-100/80 sm:text-xs">
              Capabilities
            </span>
          </div>

          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Engineering
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              capabilities
            </span>
          </h2>
        </MotionDiv>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {serviceCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <MotionDiv
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group rounded-[1.8rem] border border-white/10 bg-slate-900/45 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-400/25"
              >
                <div className="mb-5 inline-flex rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300/80">{card.description}</p>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}
