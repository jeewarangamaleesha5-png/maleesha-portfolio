import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Activity, Atom, Magnet, Move3D, Waves } from 'lucide-react';
import { skillGroups } from "./skills/skillsData.js";
const MotionDiv = motion.div;

const FIELD_COLORS = ['#22D3EE', '#60A5FA', '#818CF8', '#A78BFA'];

function createCoilCurve() {
  const points = [];
  const turns = 18;
  const samples = 1800;
  const radius = 0.255;
  const height = 1.92;

  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const angle = t * Math.PI * 2 * turns;
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        (t - 0.5) * height,
        Math.sin(angle) * radius,
      ),
    );
  }

  return new THREE.CatmullRomCurve3(points);
}

function createFluxCurve(phi, scale = 1) {
  const points = [];
  const samples = 260;

  for (let i = 0; i <= samples; i += 1) {
    const t = (i / samples) * Math.PI * 2;
    const radial = (0.48 + 1.72 * (0.5 - 0.5 * Math.cos(t))) * scale;
    const y = 1.58 * Math.sin(t) * scale;

    points.push(
      new THREE.Vector3(
        Math.cos(phi) * radial,
        y,
        Math.sin(phi) * radial,
      ),
    );
  }

  return new THREE.CatmullRomCurve3(points, true, 'centripetal');
}

function MovingCurrent({ curve, offset = 0, color = '#FBBF24' }) {
  const particleRef = useRef(null);
  const lightRef = useRef(null);

  useFrame(({ clock }) => {
    if (!particleRef.current) return;
    const progress = (clock.elapsedTime * 0.105 + offset) % 1;
    const point = curve.getPointAt(progress);
    particleRef.current.position.copy(point);
    if (lightRef.current) lightRef.current.position.copy(point);
  });

  return (
    <>
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={3.2}
          toneMapped={false}
        />
      </mesh>
      <pointLight ref={lightRef} color={color} intensity={0.8} distance={0.8} />
    </>
  );
}

function Solenoid() {
  const coilCurve = useMemo(() => createCoilCurve(), []);
  const coilGeometry = useMemo(
    () => new THREE.TubeGeometry(coilCurve, 1500, 0.026, 10, false),
    [coilCurve],
  );
  const glowGeometry = useMemo(
    () => new THREE.TubeGeometry(coilCurve, 1500, 0.052, 8, false),
    [coilCurve],
  );

  return (
    <group>
      {/* Magnetic core */}
      <mesh>
        <cylinderGeometry args={[0.19, 0.19, 2.18, 64]} />
        <meshPhysicalMaterial
          color="#142B45"
          metalness={0.9}
          roughness={0.24}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Core end caps */}
      {[-1.105, 1.105].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[0.205, 0.205, 0.075, 64]} />
          <meshStandardMaterial color="#8CA9C5" metalness={0.95} roughness={0.2} />
        </mesh>
      ))}

      {/* Soft energized halo behind the copper winding */}
      <mesh geometry={glowGeometry}>
        <meshBasicMaterial
          color="#F59E0B"
          transparent
          opacity={0.13}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Copper winding */}
      <mesh geometry={coilGeometry}>
        <meshStandardMaterial
          color="#D97732"
          metalness={0.92}
          roughness={0.24}
          emissive="#7C2D12"
          emissiveIntensity={0.65}
        />
      </mesh>

      {/* Current carriers moving along the conductor */}
      <MovingCurrent curve={coilCurve} offset={0.04} />
      <MovingCurrent curve={coilCurve} offset={0.38} color="#FDE68A" />
      <MovingCurrent curve={coilCurve} offset={0.72} />

      {/* End terminals */}
      {[-1.02, 1.02].map((y) => (
        <mesh key={`terminal-${y}`} position={[0, y, 0]}>
          <sphereGeometry args={[0.075, 20, 20]} />
          <meshStandardMaterial
            color="#E5B66D"
            metalness={0.95}
            roughness={0.18}
            emissive="#92400E"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function MagneticFluxLine({ index }) {
  const particleRef = useRef(null);
  const phi = (index / 9) * Math.PI * 2;
  const color = FIELD_COLORS[index % FIELD_COLORS.length];

  const curve = useMemo(() => createFluxCurve(phi, 1 + (index % 3) * 0.045), [phi, index]);
  const lineGeometry = useMemo(
    () => new THREE.TubeGeometry(curve, 280, 0.009, 7, true),
    [curve],
  );
  const glowGeometry = useMemo(
    () => new THREE.TubeGeometry(curve, 280, 0.032, 7, true),
    [curve],
  );

  useFrame(({ clock }) => {
    if (!particleRef.current) return;
    const progress = (clock.elapsedTime * (0.035 + (index % 3) * 0.006) + index * 0.113) % 1;
    const point = curve.getPointAt(progress);
    particleRef.current.position.copy(point);
    const pulse = 0.8 + Math.sin(clock.elapsedTime * 3.2 + index) * 0.2;
    particleRef.current.scale.setScalar(pulse);
  });

  return (
    <group>
      <mesh geometry={glowGeometry}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.105}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={lineGeometry}>
        <meshBasicMaterial color={color} transparent opacity={0.48} />
      </mesh>
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.035, 14, 14]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}

function FluxField() {
  return (
    <group>
      {Array.from({ length: 9 }, (_, index) => (
        <MagneticFluxLine key={index} index={index} />
      ))}
    </group>
  );
}

function FieldScene() {
  const rigRef = useRef(null);
  const haloRef = useRef(null);
  const ringRef = useRef(null);

  useFrame((state, delta) => {
    const pointerX = state.pointer.x || 0;
    const pointerY = state.pointer.y || 0;

    if (rigRef.current) {
      const targetY = pointerX * 0.34 + Math.sin(state.clock.elapsedTime * 0.16) * 0.11;
      const targetX = -pointerY * 0.2 + Math.sin(state.clock.elapsedTime * 0.12) * 0.045;
      rigRef.current.rotation.y = THREE.MathUtils.damp(
        rigRef.current.rotation.y,
        targetY,
        2.6,
        delta,
      );
      rigRef.current.rotation.x = THREE.MathUtils.damp(
        rigRef.current.rotation.x,
        targetX,
        2.6,
        delta,
      );
    }

    if (haloRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.035;
      haloRef.current.scale.setScalar(pulse);
    }

    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.08;
      ringRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
    }
  });

  return (
    <>
      <color attach="background" args={['#030817']} />
      <fog attach="fog" args={['#030817', 7, 15]} />
      <ambientLight intensity={0.62} />
      <pointLight position={[3.8, 3.4, 4]} color="#45DDF5" intensity={45} distance={10} />
      <pointLight position={[-4, -2, -3]} color="#625BFF" intensity={32} distance={10} />
      <spotLight
        position={[0, 5, 4]}
        angle={0.52}
        penumbra={0.8}
        intensity={55}
        color="#D9F7FF"
      />

      <Sparkles
        count={150}
        scale={[9, 6, 8]}
        size={1.5}
        speed={0.22}
        opacity={0.48}
        color="#69CFFF"
      />

      <group ref={rigRef} position={[0, 0.05, 0]}>
        {/* Broad magnetic envelope */}
        <mesh ref={haloRef}>
          <sphereGeometry args={[2.58, 48, 48]} />
          <meshBasicMaterial
            color="#0EA5E9"
            wireframe
            transparent
            opacity={0.035}
            depthWrite={false}
          />
        </mesh>

        {/* Tilted reference orbit */}
        <mesh ref={ringRef} rotation={[Math.PI / 2.8, 0.25, 0.2]}>
          <torusGeometry args={[2.42, 0.008, 8, 180]} />
          <meshBasicMaterial color="#2DD4BF" transparent opacity={0.38} />
        </mesh>

        <FluxField />
        <Solenoid />

        {/* Subtle axis markers */}
        {[-1, 1].map((direction) => (
          <group key={direction} position={[0, direction * 1.42, 0]}>
            <mesh>
              <sphereGeometry args={[0.065, 20, 20]} />
              <meshBasicMaterial
                color={direction > 0 ? '#67E8F9' : '#A78BFA'}
                toneMapped={false}
              />
            </mesh>
            <pointLight
              color={direction > 0 ? '#22D3EE' : '#8B5CF6'}
              intensity={2.2}
              distance={1.3}
            />
          </group>
        ))}
      </group>

      {/* Ground reference grid */}
      <gridHelper
        args={[18, 36, '#12304A', '#0A1A2D']}
        position={[0, -2.35, 0]}
      />
    </>
  );
}

function SkillMarquee({ items, reverse = false, duration = 58, className = '' }) {
  const pointerX = useMotionValue(0);
  const smoothX = useSpring(pointerX, {
    stiffness: 75,
    damping: 22,
    mass: 0.55,
  });
  const loopItems = [...items, ...items];

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - bounds.left) / bounds.width - 0.5;
    pointerX.set(position * -54);
  };

  const resetPointer = () => pointerX.set(0);

  return (
    <div
      className={`group overflow-hidden ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <MotionDiv style={{ x: smoothX }} className="w-max">
        <MotionDiv
          className="flex w-max items-center gap-3 py-2"
          animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
          transition={{ duration, ease: 'linear', repeat: Infinity }}
        >
          {loopItems.map((item, index) => (
            <span
              key={`${item.name}-${index}`}
              className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.08] bg-slate-900/65 px-4 py-2.5 text-xs font-medium tracking-wide text-slate-300 shadow-[0_5px_22px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-colors duration-300 group-hover:border-cyan-300/20 group-hover:text-white sm:text-sm"
            >
              <span
                className="h-1.5 w-1.5 rounded-full shadow-[0_0_10px_currentColor]"
                style={{ color: item.color, backgroundColor: item.color }}
              />
              {item.name}
            </span>
          ))}
        </MotionDiv>
      </MotionDiv>
    </div>
  );
}

function SkillsRunner() {
  const allSkills = useMemo(
    () =>
      skillGroups.flatMap((group) =>
        group.skills.map((name) => ({ name, color: group.color })),
      ),
    [],
  );

  const reverseSkills = useMemo(() => [...allSkills].reverse(), [allSkills]);

  return (
    <div className="relative mt-8 overflow-hidden rounded-[1.6rem] border border-cyan-400/10 bg-slate-950/55 py-3 backdrop-blur-xl sm:mt-10 sm:py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#030817] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#030817] to-transparent sm:w-24" />

      <div className="mb-2 flex items-center gap-2 px-4 sm:px-6">
        <Activity className="h-3.5 w-3.5 text-cyan-300" />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-100/55 sm:text-[10px]">
          Engineering skills // move pointer to influence motion
        </span>
      </div>

      <SkillMarquee items={allSkills} duration={72} />
      <SkillMarquee
        items={reverseSkills}
        reverse
        duration={88}
        className="mt-1"
      />
    </div>
  );
}

export default function Electromagnetism3D() {
  return (
    <section
      id="electromagnetism"
      className="relative z-10 isolate overflow-hidden bg-[#030817] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      {/* Ambient section lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-500/[0.075] blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-[360px] w-[360px] rounded-full bg-indigo-500/[0.08] blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.13] [background-image:radial-gradient(#4F91B8_0.7px,transparent_0.7px)] [background-size:24px_24px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <MotionDiv
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex flex-col justify-between gap-6 sm:mb-10 lg:flex-row lg:items-end"
        >
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 backdrop-blur-xl">
              <Magnet className="h-4 w-4 text-cyan-300" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-100/80 sm:text-xs">
                Electromagnetic field laboratory
              </span>
            </div>

            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-blue-200/55 sm:text-xs">
              Electrical engineering // interactive visualization
            </p>
            <h2 className="text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Electromagnetism
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                in Motion
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              Explore a live 3D solenoid visualization with animated current,
              magnetic flux paths and pointer-responsive motion.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3.5 py-2 text-[10px] font-mono uppercase tracking-[0.15em] text-slate-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_#34D399]" />
              Live 3D simulation
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3.5 py-2 text-[10px] font-mono uppercase tracking-[0.15em] text-slate-300">
              <Move3D className="h-3.5 w-3.5 text-cyan-300" />
              Mouse reactive
            </div>
          </div>
        </MotionDiv>

        {/* Main electromagnetic 3D stage */}
        <MotionDiv
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="relative h-[390px] overflow-hidden rounded-[1.8rem] border border-cyan-300/15 bg-[#030817] shadow-[0_25px_100px_rgba(0,0,0,0.4),0_0_55px_rgba(34,211,238,0.055)] sm:h-[500px] sm:rounded-[2.2rem] lg:h-[610px]"
        >
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#030817]/55 via-transparent to-[#030817]/30" />

          <div className="pointer-events-none absolute left-5 top-5 z-20 sm:left-8 sm:top-7">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-cyan-100/55 sm:text-[10px]">
              <Waves className="h-3.5 w-3.5 text-cyan-300" />
              Magnetic flux density // visual model
            </div>
            <p className="mt-2 text-xs font-semibold tracking-wide text-white/80 sm:text-sm">
              SOLENOID FIELD INTERACTION
            </p>
          </div>

          <div className="pointer-events-none absolute right-5 top-5 z-20 text-right sm:right-8 sm:top-7">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 sm:text-[10px]">
              Field state
            </p>
            <p className="mt-1 font-mono text-xs font-semibold text-emerald-300 sm:text-sm">
              ENERGIZED <span className="ml-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
            </p>
          </div>

          <Canvas
            camera={{ position: [0, 0.25, 6.8], fov: 39 }}
            dpr={[1, 1.6]}
            gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            fallback={
              <div className="flex h-full items-center justify-center px-6 text-center text-sm text-slate-400">
                WebGL is not available in this browser.
              </div>
            }
          >
            <FieldScene />
          </Canvas>

          <div className="pointer-events-none absolute bottom-5 left-5 z-20 flex flex-wrap gap-2 sm:bottom-7 sm:left-8">
            <span className="rounded-full border border-cyan-300/15 bg-slate-950/65 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-100/75 backdrop-blur-md">
              Current flow
            </span>
            <span className="rounded-full border border-blue-300/15 bg-slate-950/65 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-blue-100/75 backdrop-blur-md">
              Magnetic flux
            </span>
          </div>

          <div className="pointer-events-none absolute bottom-5 right-5 z-20 hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500 sm:flex sm:bottom-7 sm:right-8">
            <Atom className="h-3.5 w-3.5 text-violet-300/70" />
            Move pointer to rotate field
          </div>
        </MotionDiv>

        {/* Mouse-responsive engineering skills runner */}
        <SkillsRunner />
      </div>
    </section>
  );
}
