import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, GitBranch, Globe, Mail } from 'lucide-react';

const MotionDiv = motion.div;

const heroHighlights = [
  'Electrical Power',
  'Industrial Installation',
  'Motor Control',
  'Protection & Automation',
];

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px] sm:h-[420px] sm:w-[420px]" />
        <div className="absolute bottom-10 right-10 h-[260px] w-[260px] rounded-full bg-blue-500/10 blur-[110px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-slate-900/45 px-4 py-2 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(103,232,249,0.9)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-200/80 sm:text-xs">
                Electrical engineering portfolio
              </span>
            </div>

            <h1 className="text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Building reliable
              <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                power and control systems.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300/85 sm:text-lg">
              I design dependable engineering solutions across electrical power systems,
              industrial automation, protection schemes, and practical control infrastructure.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_15px_35px_rgba(34,211,238,0.3)] transition hover:scale-[1.02]"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-slate-900/40 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/40 hover:text-white"
              >
                Contact Me
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {heroHighlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-slate-900/35 px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] text-slate-300/90"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4">
              <a href="mailto:maleesha@example.com" aria-label="Email" className="rounded-full border border-cyan-400/20 bg-slate-900/40 p-3 text-cyan-200 transition hover:border-cyan-300/40 hover:text-white">
                <Mail className="h-4 w-4" />
              </a>
              <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noreferrer" className="rounded-full border border-cyan-400/20 bg-slate-900/40 p-3 text-cyan-200 transition hover:border-cyan-300/40 hover:text-white">
                <GitBranch className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" aria-label="Portfolio" target="_blank" rel="noreferrer" className="rounded-full border border-cyan-400/20 bg-slate-900/40 p-3 text-cyan-200 transition hover:border-cyan-300/40 hover:text-white">
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: 'easeOut', delay: 0.08 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-slate-950/45 p-5 shadow-[0_25px_80px_rgba(2,6,23,0.7)] backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_52%)]" />

              <div className="relative space-y-5">
                <div className="rounded-[1.5rem] border border-cyan-400/10 bg-slate-900/70 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/65">System overview</p>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-left">
                    <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-3">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">Power</p>
                      <p className="mt-2 text-xl font-black text-white">AC/DC</p>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-3">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">Control</p>
                      <p className="mt-2 text-xl font-black text-white">PLC</p>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-3">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">Control</p>
                      <p className="mt-2 text-xl font-black text-white">PLC</p>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-3">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">Protection</p>
                      <p className="mt-2 text-xl font-black text-white">IEC</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-blue-400/10 bg-gradient-to-br from-cyan-500/5 via-slate-950/80 to-indigo-500/5 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/70">Engineering focus</p>
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[9px] uppercase tracking-[0.15em] text-emerald-300">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                      Ready
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {['Industrial power distribution', 'Electrical protection', 'Motor & drive control', 'Automation interfaces'].map((item) => (
                      <div key={item} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-slate-950/50 px-3 py-2.5">
                        <span className="text-sm text-slate-200">{item}</span>
                        <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>

        <div className="mt-12 flex justify-center pb-4 sm:mt-16">
          <a href="#about" className="flex flex-col items-center gap-2 text-slate-300/80 transition hover:text-cyan-200">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em]">Scroll</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
