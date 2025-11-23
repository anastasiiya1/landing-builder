'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface LiquidGlassSphereProps {
  position?: [number, number, number];
  scale?: number;
}

export default function LiquidGlassSphere({
  position = [0, 0, 0],
  scale = 1
}: LiquidGlassSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create glass material
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0.7, 0.9, 1.0),
      metalness: 0,
      roughness: 0,
      transmission: 0.9,
      transparent: true,
      opacity: 0.8,
      reflectivity: 0.2,
      ior: 1.4,
    });
  }, []);

  // Animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <Sphere
      ref={meshRef}
      args={[1, 64, 32]}
      position={position}
      scale={scale}
      material={glassMaterial}
    />
  );
}
