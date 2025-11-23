'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Float } from '@react-three/drei';
import LiquidGlassSphere from './LiquidGlassSphere';

interface Scene3DProps {
  className?: string;
  enableControls?: boolean;
}

function Scene3DContent() {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <LiquidGlassSphere position={[0, 0, 0]} scale={1.5} />
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <LiquidGlassSphere position={[3, -1, -2]} scale={0.8} />
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.7} floatIntensity={0.7}>
        <LiquidGlassSphere position={[-2, 1, -1]} scale={0.6} />
      </Float>
    </>
  );
}

export default function Scene3D({ className = '', enableControls = false }: Scene3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene3DContent />
          {enableControls && <OrbitControls enableZoom={false} />}
        </Suspense>
      </Canvas>
    </div>
  );
}
