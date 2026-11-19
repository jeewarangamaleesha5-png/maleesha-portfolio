import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Activity, Orbit, Sparkles } from 'lucide-react';
import SkillsSpinner from './SkillsSpinner';
import { skillGroups, totalSkillCount } from './skillsData';

const MotionDiv = motion.div;

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGroup = skillGroups[activeIndex] ?? skillGroups[0];
  const ActiveIcon = activeGroup.icon;

  return (
    <section
      id="skills"
      className="relative isolate overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-cyan-500/[0.08] blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-indigo-500/[0.10] blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(148,163,184,0.7)_0.7px,transparent_0.7px)] [background-size:24px_24px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-9 sm:mb-12"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-slate-900/45 px-4 py-2.5 shadow-[0_0_28px_rgba(34,211,238,0.07)] backdrop-blur-xl">
            <Orbit className="h-5 w-5 text-cyan-300" />
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-100/80 sm:text-sm">
              Engineering Capabilities
            </span>
          </div>

          <div className="max-w-4xl">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-300/65 sm:text-sm">
              Technical Expertise // Interactive 3D
            </p>
            <h2 className="text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Skills &
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
                Engineering Expertise
              </span>
            </h2>
            <div className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 sm:w-32" />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300/75 sm:text-lg">
              A focused overview of my technical interests across electrical power,
              industrial systems, machines, automation, and instrumentation.
            </p>
          </div>
        </MotionDiv>

        {/* Category selector */}
        <MotionDiv
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mb-5 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Choose a technical skill category"
        >
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            const isActive = index === activeIndex;

            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className={`relative flex shrink-0 items-center gap-2.5 rounded-xl border px-4 py-3 text-left transition-all duration-300 sm:px-5 ${
                  isActive
                    ? 'border-cyan-300/35 bg-cyan-300/[0.09] text-white shadow-[0_0_24px_rgba(34,211,238,0.08)]'
                    : 'border-white/[0.08] bg-slate-900/35 text-slate-400 hover:border-white/20 hover:text-slate-200'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" style={{ color: isActive ? group.color : undefined }} />
                <span className="whitespace-nowrap text-xs font-semibold sm:text-sm">{group.short}</span>
                <span className="font-mono text-[9px] text-slate-500">{group.number}</span>
                {isActive && (
                  <motion.span
                    layoutId="active-skill-tab"
                    className="absolute inset-x-3 -bottom-px h-px"
                    style={{ backgroundColor: group.color, boxShadow: `0 0 12px ${group.color}` }}
                  />
                )}
              </button>
            );
          })}
        </MotionDiv>

        {/* Single integrated 3D experience + selected skill details */}
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-6">
          {/* 3D stage: no cards or component models inside the scene */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.975 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.15 }}
            className="order-1 relative min-w-0 overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[#050d1d]/75 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:order-2"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_52%_48%,rgba(14,116,144,0.13),transparent_57%)]" />
            <div className="pointer-events-none absolute left-5 top-5 z-10 sm:left-7 sm:top-7">
              <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-cyan-200/55 sm:text-[10px]">
                3D Environment / 001
              </p>
              <p className="mt-1 text-sm font-semibold text-white/90 sm:text-base">Kinetic skill field</p>
            </div>
            <div className="pointer-events-none absolute right-5 top-5 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/50 px-3 py-1.5 backdrop-blur-md sm:right-7 sm:top-7">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: activeGroup.color, boxShadow: `0 0 10px ${activeGroup.color}` }} />
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-slate-300/75">Live scene</span>
            </div>

            <SkillsSpinner activeGroup={activeGroup.id} />

            <div className="pointer-events-none absolute bottom-12 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-14 sm:left-7 sm:right-7">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">Selected discipline</p>
                <p className="mt-1 max-w-[220px] text-sm font-semibold text-white/90 sm:text-base">{activeGroup.title}</p>
              </div>
              <Sparkles className="mb-1 h-5 w-5 shrink-0" style={{ color: activeGroup.color }} />
            </div>
          </MotionDiv>

          {/* Skills content */}
          <div className="order-2 flex min-w-0 flex-col rounded-[2rem] border border-white/[0.08] bg-slate-900/45 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.2)] backdrop-blur-2xl sm:p-8 lg:order-1 lg:p-9">
            <AnimatePresence mode="wait">
              <MotionDiv
                key={activeGroup.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
                className="flex h-full flex-col"
              >
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/55">
                      Discipline / {activeGroup.number}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
                      {activeGroup.title}
                    </h3>
                  </div>
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border"
                    style={{ borderColor: `${activeGroup.color}40`, backgroundColor: `${activeGroup.color}12` }}
                  >
                    <ActiveIcon className="h-6 w-6" style={{ color: activeGroup.color }} />
                  </div>
                </div>

                <p className="max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
                  {activeGroup.description}
                </p>

                <div className="my-7 h-px bg-gradient-to-r from-white/15 via-white/[0.06] to-transparent" />

                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
                    Technical competencies
                  </p>
                  <span className="font-mono text-xs" style={{ color: activeGroup.color }}>
                    {String(activeGroup.skills.length).padStart(2, '0')} SKILLS
                  </span>
                </div>

                <div className="flex flex-wrap content-start gap-2.5">
                  {activeGroup.skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, y: 7 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: Math.min(index * 0.025, 0.25) }}
                      className="rounded-xl border border-white/[0.08] bg-slate-950/55 px-3.5 py-2.5 text-xs leading-relaxed text-slate-300 transition-colors duration-200 hover:border-cyan-300/25 hover:text-white sm:text-[13px]"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.07] pt-6">
                  <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-slate-500 sm:text-[10px]">
                    Explore another discipline
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-cyan-200/75">
                    Select above <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </MotionDiv>
            </AnimatePresence>
          </div>
        </div>

        {/* Compact overview */}
        <MotionDiv
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-4"
        >
          <div className="rounded-2xl border border-white/[0.08] bg-slate-900/40 p-5 backdrop-blur-xl">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 sm:text-[10px]">Disciplines</p>
            <p className="mt-2 text-3xl font-black text-white">{String(skillGroups.length).padStart(2, '0')}</p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-slate-900/40 p-5 backdrop-blur-xl">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 sm:text-[10px]">Technical areas</p>
            <p className="mt-2 text-3xl font-black text-white">{String(totalSkillCount).padStart(2, '0')}<span className="ml-1 text-base text-cyan-300">+</span></p>
          </div>
          <div className="col-span-2 rounded-2xl border border-white/[0.08] bg-slate-900/40 p-5 backdrop-blur-xl sm:col-span-1">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 sm:text-[10px]">Core discipline</p>
            <p className="mt-2 text-xl font-bold text-white">Electrical Engineering</p>
          </div>
        </MotionDiv>

        {/* Closing note */}
        <MotionDiv
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/[0.08] pt-7 sm:mt-12 sm:flex-row sm:items-center"
        >
          <div className="flex items-start gap-3">
            <Activity className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
            <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
              Connecting electrical engineering, industrial systems, and intelligent control to build practical solutions.
            </p>
          </div>
          <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-200/45">
            Explore · Design · Engineer
          </span>
        </MotionDiv>
      </div>
    </section>
  );
}
