import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 1500;
const particles = new Float32Array(COUNT * 3);

for (let i = 0; i < COUNT; i++) {
  particles[i * 3] = (Math.random() - 0.5) * 10;
  particles[i * 3 + 1] = (Math.random() - 0.5) * 10;
  particles[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

function ParticleField() {
  const pointsRef = useRef(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particles, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.03;

    const { x, y } = state.mouse;
    pointsRef.current.rotation.y += x * 0.01;
    pointsRef.current.rotation.x += -y * 0.01;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.015}
        color="#60a5fa"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-50 bg-[#020617]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <fog attach="fog" args={['#020617', 5, 10]} />
        <ParticleField />
      </Canvas>
    </div>
  );
}