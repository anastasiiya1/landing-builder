"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  index?: number;
  className?: string;
  delay?: number;
  glowEffect?: boolean;
  hoverScale?: boolean;
}

export default function Card({
  children,
  index = 0,
  className = "",
  delay,
  glowEffect = false,
  hoverScale = false,
}: CardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const baseDelay = delay !== undefined ? delay : index * 0.1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.9 }
      }
      transition={{ duration: 0.6, delay: baseDelay }}
      className={`
        group relative p-8
        bg-white/5 backdrop-blur-md 
        rounded-3xl border border-white/10
        hover:bg-white/10 hover:border-white/20
        transition-all duration-300 ease-in-out
        overflow-hidden
        ${hoverScale ? "hover:scale-[1.02]" : ""}
        ${className}
      `}
    >
      {glowEffect && (
        <div className="absolute inset-0 bg-dynamic-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
