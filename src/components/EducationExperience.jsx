import React from 'react';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, GraduationCap, Sparkles } from 'lucide-react';

const MotionDiv = motion.div;

const education = [
  {
    title: 'Electrical Engineering SQA ADVANCED DIPLOMA',
    detail: 'Practical and technical training focused on electrical principles, industrial systems, automation, and engineering problem solving.',
  },
  {
    title: 'Industrial Electricity NVQ LEVEL 4',
    detail: 'Applied learning in electrical installations, maintenance practices, and plant-oriented technical work.',
  },
  {
    title: 'National Certificate of Engineering Crafting Practice in Electrical Engineering',
    detail: 'Applied learning in electrical installations, maintenance practices, and plant-oriented technical work.',
  },
];

const experience = [
  {
    period: 'Current focus',
    title: 'Electrical engineering project development',
    description: 'Working across electrical design, industrial automation, machine control, and protection-focused engineering solutions.',
    items: ['Power systems and control concepts', 'Motor and drive coordination', 'Industrial automation workflows', 'Maintenance and troubleshooting practices'],
  },
  {
    period: 'Technical practice',
    title: 'Hands-on engineering capability building',
    description: 'Developing practical experience through system design, installation planning, and disciplined troubleshooting in electrical environments.',
    items: ['Sensor and actuator integration discussions', 'Panel and power distribution planning', 'Testing and commissioning workflows', 'Engineering documentation and concept exploration'],
  },
];

export default function EducationExperience() {
  return (
    <section id="education" className="section-shell bg-[#020b18]">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-cyan-500/8 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <MotionDiv
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-slate-900/45 px-4 py-2 backdrop-blur-xl">
            <GraduationCap className="h-4 w-4 text-cyan-300" />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-100/80 sm:text-xs">
              Education & experience
            </span>
          </div>
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Academic and
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              technical foundation
            </span>
          </h2>
        </MotionDiv>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/45 p-6 backdrop-blur-xl sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl border border-cyan-400/25 bg-cyan-400/10 p-2.5 text-cyan-300">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white sm:text-2xl">Education</h3>
            </div>

            <div className="space-y-4">
              {education.map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-200/70">Academic background</p>
                  <h4 className="mt-3 text-lg font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300/80">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/45 p-6 backdrop-blur-xl sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl border border-cyan-400/25 bg-cyan-400/10 p-2.5 text-cyan-300">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white sm:text-2xl">Experience</h3>
            </div>

            <div className="space-y-4">
              {experience.map((entry) => (
                <div key={entry.title} className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">{entry.period}</p>
                    <Sparkles className="h-4 w-4 text-cyan-300" />
                  </div>
                  <h4 className="mt-3 text-lg font-semibold text-white">{entry.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300/80">{entry.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300/80">
                    {entry.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
