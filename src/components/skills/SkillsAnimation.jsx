import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 1150;

function createParticlePositions() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);

  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    const radius = 2.45 + Math.random() * 2.25;
    const theta = Math.random() * Math.PI * 2;
    const vertical = Math.random() * 2 - 1;
    const horizontal = Math.sqrt(1 - vertical * vertical);

    positions[index * 3] = radius * horizontal * Math.cos(theta);
    positions[index * 3 + 1] = radius * vertical;
    positions[index * 3 + 2] = radius * horizontal * Math.sin(theta);
  }

  return positions;
}

function ParticleHalo({ activeColor }) {
  const pointsRef = useRef(null);
  const geometry = useMemo(() => {
    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(createParticlePositions(), 3),
    );
    return bufferGeometry;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.018;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.055;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={activeColor}
        size={0.019}
        transparent
        opacity={0.62}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function EnergyRibbons({ activeColor }) {
  const ribbonsRef = useRef(null);

  useFrame((state, delta) => {
    if (!ribbonsRef.current) return;
    ribbonsRef.current.rotation.y += delta * 0.11;
    ribbonsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.19) * 0.12;
  });

  return (
    <group ref={ribbonsRef}>
      <mesh rotation={[0.82, 0.16, 0.32]}>
        <torusKnotGeometry args={[1.62, 0.012, 220, 10, 2, 5]} />
        <meshBasicMaterial color={activeColor} transparent opacity={0.48} />
      </mesh>

      <mesh rotation={[1.22, 0.72, -0.52]}>
        <torusKnotGeometry args={[1.88, 0.008, 200, 8, 3, 4]} />
        <meshBasicMaterial color="#477dff" transparent opacity={0.28} />
      </mesh>

      <mesh rotation={[0.18, 1.04, 0.86]}>
        <torusGeometry args={[2.22, 0.006, 8, 180]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.24} />
      </mesh>

      <mesh rotation={[1.48, -0.34, 0.18]}>
        <torusGeometry args={[2.42, 0.004, 8, 180]} />
        <meshBasicMaterial color={activeColor} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function LightPulse({ activeColor }) {
  const pulseRef = useRef(null);

  useFrame((state) => {
    if (!pulseRef.current) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.35) * 0.06;
    pulseRef.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={pulseRef}>
      <sphereGeometry args={[0.98, 32, 32]} />
      <meshBasicMaterial
        color={activeColor}
        transparent
        opacity={0.045}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * Abstract 3D atmosphere for the skills visualisation.
 * Render this component inside an existing React Three Fiber Canvas.
 * It intentionally contains no literal electronic-component models.
 */
export default function SkillsAnimation({ activeColor = '#22d3ee' }) {
  return (
    <group>
      <ParticleHalo activeColor={activeColor} />
      <EnergyRibbons activeColor={activeColor} />
      <LightPulse activeColor={activeColor} />
    </group>
  );
}
