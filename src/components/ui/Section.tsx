"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export default function Section({
  children,
  id,
  className = "",
  delay = 0.2,
}: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      id={id}
      className={`py-20 bg-black relative overflow-hidden ${className}`}
    >
      {children}
    </motion.section>
  );
}
