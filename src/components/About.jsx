import React from 'react';
import { motion } from 'framer-motion';
import {
  Fingerprint,
  Award,
  Rocket,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

import MyPhoto from '../assets/my-photo.jpeg';

const MotionDiv = motion.div;

const milestones = [
  { icon: Rocket, label: 'Specialty', value: 'Electrical Power Engineering' },
  { icon: Award, label: 'Background', value: 'Electrical Engineering Training' },
  { icon: CheckCircle2, label: 'Focus', value: 'Industrial Electrical Systems' },
  { icon: Sparkles, label: 'Approach', value: 'Protection, Control & Commissioning' },
];

export default function AboutMe() {
  return (
    <section id="about" className="relative min-h-screen overflow-hidden px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28 z-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] bg-cyan-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] bg-blue-500/10 blur-[90px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-slate-900/40 backdrop-blur-xl px-4 sm:px-5 py-2.5 shadow-[0_0_25px_rgba(34,211,238,0.08)]">
            <Fingerprint className="w-5 h-5 text-cyan-400" />
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-cyan-200/80">
              About Me
            </span>
          </div>
        </MotionDiv>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <MotionDiv
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.25 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[420px]">
              <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-transparent blur-xl" />
              <div className="relative rounded-[2.5rem] border border-white/10 bg-slate-900/40 p-3 sm:p-4 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
                <div className="relative overflow-hidden rounded-[2rem]">
                  <img
                    src={MyPhoto}
                    alt="Maleesha Jeewaranga"
                    className="h-[360px] sm:h-[460px] lg:h-[540px] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
                </div>

                <div className="absolute -top-3 -left-3 w-14 h-14 border-t-2 border-l-2 border-cyan-400/70 rounded-tl-2xl" />
                <div className="absolute -bottom-3 -right-3 w-14 h-14 border-b-2 border-r-2 border-cyan-400/70 rounded-br-2xl" />
              </div>
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.25 }}
            className="lg:col-span-7"
          >
            <div className="space-y-8">
              <div>
                <p className="mb-3 text-sm sm:text-base font-mono uppercase tracking-[0.3em] text-cyan-300/70">
                  Engineering portfolio identity
                </p>

                <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl xl:text-[6rem] font-black leading-[0.95] tracking-tight text-white">
                  Maleesha
                  <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Jeewaranga
                  </span>
                </h1>

                <div className="mt-5 h-1 w-24 sm:w-32 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-900/40 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_40px_rgba(34,211,238,0.05)]">
                <p className="text-cyan-300/80 text-sm uppercase tracking-[0.25em] font-mono mb-4">
                  Biography //
                </p>

                <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-slate-200 font-medium">
                  I am <span className="text-white font-semibold">Maleesha Jeewaranga</span>,
                  an Electrical Engineer focused on power systems, industrial electrical
                  installations, protection systems, and reliable control infrastructure.
                </p>

                <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300/80">
                  My work is centred on practical electrical engineering solutions for industrial
                  environments, including power distribution, motor control, panel design,
                  automation systems, and maintenance-focused troubleshooting.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {milestones.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <MotionDiv
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="group relative overflow-hidden rounded-2xl border border-cyan-400/15 bg-slate-900/35 p-5 backdrop-blur-xl hover:border-cyan-400/40 transition-all duration-300"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cyan-400/10 to-blue-500/5" />
                      <div className="relative z-10 flex items-start gap-4">
                        <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3">
                          <Icon className="w-5 h-5 text-cyan-300" />
                        </div>
                        <div>
                          <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-slate-400 mb-1">
                            {item.label}
                          </p>
                          <h3 className="text-sm sm:text-base font-semibold text-white leading-snug">
                            {item.value}
                          </h3>
                        </div>
                      </div>
                    </MotionDiv>
                  );
                })}
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}