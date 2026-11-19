
import React, { useMemo, useState } from 'react';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';

import {
  Activity,
  ArrowUpRight,
  FolderKanban,
  Gauge,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

// ============================================================
// PROJECT DATA
// ============================================================

const projectData = [
  {
    id: 'power-distribution',
    title: 'Industrial Power Distribution System',
    category: 'Electrical Power',
    description:
      'An engineering concept focused on industrial power distribution, three-phase load balancing, electrical calculations, and coordinated protection systems.',
    tags: ['Three-phase systems', 'Protection design', 'Load analysis'],
    accent: '#67e8f9',
    icon: Zap,
    type: 'power',
  },
  {
    id: 'motor-control',
    title: 'Motor Control and Protection Interface',
    category: 'Motor Control',
    description:
      'An industrial motor control concept covering drive operation, motor protection, electrical interlocking, diagnostics, and safe operating principles.',
    tags: ['VFD', 'Motor protection', 'Control systems'],
    accent: '#60a5fa',
    icon: Gauge,
    type: 'motor',
  },
  {
    id: 'pcb-design',
    title: 'PCB Design & Hardware Prototyping',
    category: 'PCB Design',
    description:
      'Professional PCB design and hardware prototyping with detailed component placement, signal routing, power distribution, and practical circuit development.',
    tags: ['KiCad', 'PCB layout', 'Prototyping'],
    accent: '#a78bfa',
    icon: Activity,
    type: 'pcb',
  },
  {
    id: 'scada-hmi',
    title: 'SCADA & HMI Automation Workflow',
    category: 'Industrial Automation',
    description:
      'An industrial supervisory monitoring concept featuring process visualization, operator interfaces, equipment monitoring, and automation workflows.',
    tags: ['SCADA', 'HMI', 'Process control'],
    accent: '#34d399',
    icon: Activity,
    type: 'scada',
  },
  {
    id: 'power-electronics',
    title: 'Power Electronics Concept Lab',
    category: 'Power Electronics',
    description:
      'A power electronics design exploration covering DC-DC converters, battery charging systems, inverter circuits, and power conversion principles.',
    tags: ['DC-DC converters', 'Inverters', 'Power conversion'],
    accent: '#fbbf24',
    icon: Zap,
    type: 'electronics',
  },
  {
    id: 'monitoring-platform',
    title: 'Electrical Monitoring and Control Platform',
    category: 'Automation',
    description:
      'An electrical monitoring concept for equipment status, panel supervision, operational monitoring, and industrial electrical asset management.',
    tags: ['Monitoring', 'Control panels', 'Automation'],
    accent: '#f472b6',
    icon: ShieldCheck,
    type: 'monitoring',
  },
];

const categories = [
  'All',
  ...new Set(projectData.map((item) => item.category)),
];

// ============================================================
// ANIMATION CONFIGURATION
// ============================================================

const springConfig = {
  stiffness: 180,
  damping: 22,
  mass: 0.5,
};

// ============================================================
// 3D PROJECT VISUALIZATION
// ============================================================

function ProjectArtwork({ project, index, reducedMotion }) {
  const bars = [35, 65, 45, 85, 55, 95, 70];

  return (
    <div
      className="relative h-48 overflow-hidden rounded-[1.4rem] border border-white/10"
      style={{
        background: `linear-gradient(135deg, ${project.accent}12, rgba(15,23,42,0.95) 65%)`,
        transform: 'translateZ(25px)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Engineering grid */}

      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
          `,
          backgroundSize: '25px 25px',
        }}
      />

      {/* Ambient glow */}

      <div
        className="absolute -right-12 -top-16 h-48 w-48 rounded-full blur-[65px]"
        style={{ backgroundColor: `${project.accent}30` }}
      />

      {/* Rotating technical rings */}

      <motion.div
        className="absolute right-5 top-3 h-40 w-40 rounded-full border"
        style={{ borderColor: `${project.accent}35` }}
        animate={reducedMotion ? {} : { rotate: 360 }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute right-12 top-10 h-28 w-28 rounded-full border border-dashed"
        style={{ borderColor: `${project.accent}60` }}
        animate={reducedMotion ? {} : { rotate: -360 }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating orbital nodes */}

      {!reducedMotion && (
        <>
          <motion.div
            className="absolute right-[105px] top-[25px] h-2 w-2 rounded-full"
            style={{
              backgroundColor: project.accent,
              boxShadow: `0 0 15px ${project.accent}`,
            }}
            animate={{ y: [0, 12, 0], x: [0, 5, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute right-8 top-[110px] h-3 w-3 rounded-full"
            style={{
              backgroundColor: project.accent,
              boxShadow: `0 0 18px ${project.accent}`,
            }}
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}

      {/* Main information */}

      <div
        className="absolute left-5 top-5 z-10"
        style={{ transform: 'translateZ(35px)' }}
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-400">
          Engineering / Design
        </p>

        <p className="mt-2 font-mono text-xs font-bold tracking-widest text-white">
          SYS_0{index + 1}
        </p>

        <div
          className="mt-3 h-[2px] w-12 rounded-full"
          style={{ backgroundColor: project.accent }}
        />
      </div>

      {/* Animated waveform / visualization */}

      <div
        className="absolute bottom-5 left-5 flex h-16 items-end gap-1.5"
        style={{ transform: 'translateZ(30px)' }}
      >
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className="w-2 rounded-t-sm"
            style={{
              backgroundColor: project.accent,
              opacity: 0.45 + i * 0.07,
            }}
            initial={false}
            animate={
              reducedMotion
                ? { height: `${height}%` }
                : {
                    height: [
                      `${height}%`,
                      `${Math.max(15, height - 25)}%`,
                      `${height}%`,
                    ],
                  }
            }
            transition={{
              duration: 1.5 + (i % 3) * 0.4,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
              delay: i * 0.08,
            }}
          />
        ))}
      </div>

      {/* Floating instrument panel */}

      <motion.div
        className="absolute bottom-5 right-5 z-10 flex h-20 w-24 flex-col justify-between rounded-xl border border-white/10 bg-slate-950/70 p-3 shadow-2xl backdrop-blur-xl"
        style={{
          transform: 'translateZ(55px)',
        }}
        animate={reducedMotion ? {} : { y: [0, -5, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] uppercase tracking-widest text-slate-400">
            Status
          </span>

          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: project.accent,
              boxShadow: `0 0 8px ${project.accent}`,
            }}
            animate={
              reducedMotion ? {} : { opacity: [1, 0.3, 1] }
            }
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </div>

        <div className="font-mono text-[10px] font-bold text-white">
          ACTIVE
        </div>

        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: project.accent }}
            initial={{ width: '15%' }}
            animate={
              reducedMotion
                ? { width: '75%' }
                : { width: ['35%', '85%', '55%', '75%'] }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>

      {/* Animated scan line */}

      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
            boxShadow: `0 0 12px ${project.accent}`,
          }}
          animate={{ top: ['0%', '100%'] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {/* Bottom label */}

      <div className="absolute bottom-2 right-3 font-mono text-[7px] tracking-widest text-slate-500">
        ENGINEERING VISUALIZATION
      </div>
    </div>
  );
}

// ============================================================
// ADVANCED 3D PROJECT CARD
// ============================================================

function ProjectCard({ project, index }) {
  const reducedMotion = useReducedMotion();

  // Mouse-responsive 3D rotation

  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  const pointerX = useMotionValue('50%');
  const pointerY = useMotionValue('50%');

  const handlePointerMove = (event) => {
    if (reducedMotion || event.pointerType !== 'mouse') return;

    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    rotateY.set((x - 0.5) * 14);
    rotateX.set((0.5 - y) * 14);

    pointerX.set(`${x * 100}%`);
    pointerY.set(`${y * 100}%`);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);

    pointerX.set('50%');
    pointerY.set('50%');
  };

  const ProjectIcon = project.icon;

  return (
    <motion.article
      layout
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 35, scale: 0.94 }
      }
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        reducedMotion
          ? {}
          : {
              y: -9,
              scale: 1.015,
              transition: { duration: 0.3 },
            }
      }
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className="group relative rounded-[1.8rem] border border-white/10 bg-slate-900/50 p-4 shadow-[0_25px_65px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-colors duration-500 hover:border-white/20 sm:p-5"
    >
      {/* Dynamic mouse-following light */}

      <motion.div
        className="pointer-events-none absolute z-0 h-64 w-64 rounded-full opacity-0 blur-[75px] transition-opacity duration-500 group-hover:opacity-100"
        style={{
          left: pointerX,
          top: pointerY,
          x: '-50%',
          y: '-50%',
          backgroundColor: project.accent,
        }}
      />

      {/* Card gradient */}

      <div
        className="pointer-events-none absolute inset-0 rounded-[1.8rem] opacity-80"
        style={{
          background: `linear-gradient(145deg, ${project.accent}0c, transparent 55%)`,
        }}
      />

      <div
        className="relative z-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card header */}

        <div
          className="mb-4 flex items-center justify-between"
          style={{ transform: 'translateZ(35px)' }}
        >
          <span
            className="rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.17em]"
            style={{
              borderColor: `${project.accent}40`,
              backgroundColor: `${project.accent}12`,
              color: project.accent,
            }}
          >
            {project.category}
          </span>

          <ProjectIcon
            className="h-5 w-5 transition-transform duration-500 group-hover:rotate-12"
            style={{ color: project.accent }}
          />
        </div>

        {/* Technical artwork */}

        <ProjectArtwork
          project={project}
          index={index}
          reducedMotion={reducedMotion}
        />

        {/* Project information */}

        <div
          className="mt-6"
          style={{ transform: 'translateZ(38px)' }}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.23em] text-slate-500">
              Project / 0{index + 1}
            </span>

            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: project.accent,
                boxShadow: `0 0 12px ${project.accent}`,
              }}
            />
          </div>

          <h3 className="text-xl font-bold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-100 sm:text-2xl">
            {project.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
            {project.description}
          </p>
        </div>

        {/* Project technology tags */}

        <div
          className="mt-5 flex flex-wrap gap-2"
          style={{ transform: 'translateZ(28px)' }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.08] bg-slate-950/60 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-slate-400 transition-all duration-300 group-hover:border-white/20 group-hover:text-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom decorative line */}

        <div
          className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4"
          style={{ transform: 'translateZ(32px)' }}
        >
          <div className="flex items-center gap-2">
            <div
              className="h-1 w-7 rounded-full"
              style={{ backgroundColor: project.accent }}
            />

            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">
              Engineering project
            </span>
          </div>

          <motion.div
            whileHover={
              reducedMotion ? {} : { x: 4, y: -4, scale: 1.15 }
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-slate-300 transition-colors duration-300 group-hover:border-cyan-300/40 group-hover:text-cyan-300"
          >
            <ArrowUpRight className="h-4 w-4" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

// ============================================================
// MAIN PROJECTS SECTION
// ============================================================

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const reducedMotion = useReducedMotion();

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') return projectData;

    return projectData.filter(
      (project) => project.category === activeFilter
    );
  }, [activeFilter]);

  return (
    <section
      id="projects"
      className="section-shell relative isolate overflow-hidden bg-slate-950/30"
      style={{ perspective: '1400px' }}
    >
      {/* ====================================================
          BACKGROUND ATMOSPHERE
      ==================================================== */}

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Cyan glow */}

        <motion.div
          className="absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-cyan-500/[0.07] blur-[150px]"
          animate={
            reducedMotion
              ? {}
              : {
                  x: [0, 60, 0],
                  y: [0, 40, 0],
                  scale: [1, 1.15, 1],
                }
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Indigo glow */}

        <motion.div
          className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.09] blur-[150px]"
          animate={
            reducedMotion
              ? {}
              : {
                  x: [0, -50, 0],
                  y: [0, -40, 0],
                  scale: [1, 1.2, 1],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Grid background */}

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '55px 55px',
          }}
        />
      </div>

      {/* ====================================================
          MAIN CONTAINER
      ==================================================== */}

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          {/* Section label */}

          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-slate-900/60 px-4 py-2 backdrop-blur-xl">
            <FolderKanban className="h-4 w-4 text-cyan-300" />

            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-100/80 sm:text-xs">
              Project portfolio
            </span>

            <motion.span
              animate={
                reducedMotion ? {} : { rotate: [0, 180, 360] }
              }
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            </motion.span>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            {/* Heading */}

            <div className="max-w-3xl">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300/65 sm:text-xs">
                Engineering solutions // selected work
              </p>

              <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-7xl">
                Selected

                <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                  project work.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Exploring electrical engineering, industrial systems,
                power technologies, and innovative engineering solutions.
              </p>
            </div>

            {/* Project count */}

            <div className="flex items-center gap-5">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-500">
                  Featured projects
                </p>

                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">
                    0{projectData.length}
                  </span>

                  <span className="font-mono text-xs text-slate-500">
                    / WORKS
                  </span>
                </div>
              </div>

              <div className="h-12 w-px bg-white/10" />

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-500">
                  Current view
                </p>

                <p className="mt-2 font-mono text-sm font-semibold text-cyan-300">
                  {String(visibleProjects.length).padStart(2, '0')} PROJECTS
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ==================================================
            CATEGORY FILTERS
        ================================================== */}

        <div className="mb-9 overflow-x-auto pb-2">
          <LayoutGroup>
            <div className="flex min-w-max flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = activeFilter === category;

                return (
                  <motion.button
                    key={category}
                    type="button"
                    onClick={() => setActiveFilter(category)}
                    whileHover={
                      reducedMotion ? {} : { y: -2 }
                    }
                    whileTap={
                      reducedMotion ? {} : { scale: 0.96 }
                    }
                    aria-pressed={isActive}
                    className={`relative overflow-hidden rounded-full border px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.15em] transition-colors duration-300 sm:text-[10px] ${
                      isActive
                        ? 'border-cyan-300/40 text-cyan-100'
                        : 'border-white/10 bg-slate-900/50 text-slate-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeProjectFilter"
                        className="absolute inset-0 rounded-full bg-cyan-400/10"
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    <span className="relative z-10">
                      {category}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        {/* ==================================================
            PROJECT GRID
        ================================================== */}

        <motion.div
          layout
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-7 sm:flex-row"
        >
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />

            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">
              Electrical engineering portfolio
            </span>
          </div>

          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-600">
            Designed with precision.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
