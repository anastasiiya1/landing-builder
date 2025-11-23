"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import LiquidGlassSphere from "./3d/LiquidGlassSphere";

export default function LiquidGlassEffect() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Don't render on server side
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <LiquidGlassSphere position={[1, 0, 0]} scale={1.2} />
      </Canvas>
    </div>
  );
}
