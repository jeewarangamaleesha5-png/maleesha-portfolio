import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { skillGroups } from './skillsData';
import SkillsAnimation from './SkillsAnimation';

function OrbitalNodes({ activeGroup }) {
  const orbitRef = useRef(null);

  useFrame((state, delta) => {
    if (!orbitRef.current) return;
    orbitRef.current.rotation.y += delta * 0.105;
    orbitRef.current.rotation.x = THREE.MathUtils.damp(
      orbitRef.current.rotation.x,
      state.pointer.y * 0.12,
      2.2,
      delta,
    );
    orbitRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.22) * 0.045;
  });

  return (
    <group ref={orbitRef}>
      {skillGroups.map((group, index) => {
        const angle = (index / skillGroups.length) * Math.PI * 2 + 0.25;
        const radius = 2.42;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.72;
        const z = Math.sin(angle * 2) * 0.2;
        const isActive = group.id === activeGroup;
        const nodeSize = isActive ? 0.19 : 0.105;

        return (
          <group key={group.id} position={[x, y, z]}>
            <mesh>
              <sphereGeometry args={[nodeSize * 2.1, 20, 20]} />
              <meshBasicMaterial
                color={group.color}
                transparent
                opacity={isActive ? 0.12 : 0.055}
                depthWrite={false}
              />
            </mesh>
            <mesh>
              <icosahedronGeometry args={[nodeSize, 1]} />
              <meshPhysicalMaterial
                color={group.color}
                emissive={group.color}
                emissiveIntensity={isActive ? 1.7 : 0.7}
                metalness={0.45}
                roughness={0.18}
                clearcoat={1}
              />
            </mesh>
            {isActive && (
              <mesh rotation={[Math.PI / 2, 0.2, 0]}>
                <torusGeometry args={[0.27, 0.009, 8, 48]} />
                <meshBasicMaterial color={group.color} transparent opacity={0.8} />
              </mesh>
            )}
          </group>
        );
      })}

      <mesh rotation={[0.9, 0.2, 0.1]}>
        <torusGeometry args={[2.42, 0.006, 8, 180]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.34} />
      </mesh>
    </group>
  );
}

function HolographicCore({ activeColor }) {
  const coreRef = useRef(null);
  const wireRef = useRef(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.24;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.34) * 0.12;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.14;
      wireRef.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <group>
      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[0.82, 3]} />
          <meshPhysicalMaterial
            color="#071a31"
            emissive={activeColor}
            emissiveIntensity={0.32}
            metalness={0.72}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>
        <mesh scale={1.012}>
          <icosahedronGeometry args={[0.82, 2]} />
          <meshBasicMaterial
            color={activeColor}
            wireframe
            transparent
            opacity={0.42}
          />
        </mesh>
      </group>

      <group ref={wireRef}>
        <mesh rotation={[0.7, 0.2, 0.4]}>
          <torusKnotGeometry args={[1.06, 0.018, 160, 10, 2, 3]} />
          <meshBasicMaterial color={activeColor} transparent opacity={0.68} />
        </mesh>
        <mesh rotation={[1.35, 0.8, -0.25]}>
          <torusGeometry args={[1.23, 0.009, 8, 120]} />
          <meshBasicMaterial color="#93c5fd" transparent opacity={0.48} />
        </mesh>
      </group>
    </group>
  );
}

function Scene({ activeGroup }) {
  const selected = skillGroups.find((group) => group.id === activeGroup) ?? skillGroups[0];

  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[3.8, 3.2, 4]} intensity={34} color={selected.color} />
      <pointLight position={[-4, -2.5, -3]} intensity={22} color="#355dff" />
      <pointLight position={[0, 4, -2]} intensity={12} color="#a78bfa" />

      <SkillsAnimation activeColor={selected.color} />
      <OrbitalNodes activeGroup={selected.id} />
      <HolographicCore activeColor={selected.color} />
    </>
  );
}

/** One responsive Canvas combining the skill orbit and abstract energy animation. */
export default function SkillsSpinner({ activeGroup = 'power', className = '' }) {
  return (
    <div className={`relative h-[350px] w-full sm:h-[440px] lg:h-[540px] ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,116,144,0.18),transparent_58%)]" />
      <Canvas
        camera={{ position: [0, 0, 7.4], fov: 42 }}
        dpr={[1, 1.45]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
        }}
        fallback={
          <div className="flex h-full items-center justify-center px-6 text-center text-sm text-slate-400">
            Interactive 3D visualisation is unavailable in this browser.
          </div>
        }
      >
        <Suspense fallback={null}>
          <Scene activeGroup={activeGroup} />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 sm:bottom-5 sm:left-6 sm:right-6">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-100/55 sm:text-[10px]">
          Interactive field · Move pointer to influence
        </span>
        <span className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-300/65 backdrop-blur-md">
          Live 3D
        </span>
      </div>
    </div>
  );
}
