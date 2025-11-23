"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import GalleryModal from "@/components/GalleryModal";
import CreateLandingModal from "@/components/CreateLandingModal";
import { createClient } from "@supabase/supabase-js";
import { FacebookPixel } from "@/lib/facebook-pixel";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface HeroProps {
  title: string;
  buttonText: string;
  heroImage: string;
  onButtonClick?: () => void;
}

export default function Hero({ title, buttonText, onButtonClick }: HeroProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [landingCount, setLandingCount] = useState(0);

  const fetchLandingCount = async () => {
    try {
      const { count, error } = await supabase
        .from("landings")
        .select("*", { count: "exact", head: true });

      if (error) {
        console.error("Error fetching landing count:", error);
      } else {
        setLandingCount(count || 0);
      }
    } catch (error) {
      console.error("Error fetching landing count:", error);
    }
  };

  useEffect(() => {
    const loadLandingCount = async () => {
      await fetchLandingCount();
    };
    loadLandingCount();
  }, []);
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-16"
    >
      {/* 3D Color Explosion Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Dynamic Fading Color Elements */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`color-fade-${i}`}
            className={`absolute rounded-full blur-2xl ${
              i % 3 === 0
                ? "bg-dynamic-primary/20"
                : i % 3 === 1
                ? "bg-dynamic-secondary/20"
                : "bg-dynamic-accent/20"
            }`}
            style={{
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              left: `${20 + i * 15}%`,
              top: `${15 + i * 12}%`,
            }}
            animate={{
              opacity: [0, 0.3, 0.1, 0.4, 0],
              scale: [0.8, 1.2, 0.9, 1.1, 0.8],
              x: [0, 50, -30, 40, 0],
              y: [0, -40, 30, -20, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}

        {/* Floating gradient orbs */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`gradient-orb-${i}`}
            className={`
				absolute w-32 h-32 rounded-full blur-xl
              bg-gradient-to-br ${
                i % 3 === 0
                  ? "from-dynamic-primary/30 to-dynamic-secondary/10"
                  : i % 3 === 1
                  ? "from-dynamic-secondary/30 to-dynamic-accent/10"
                  : "from-dynamic-accent/30 to-dynamic-primary/10"
              }
            `}
            style={{
              left: `${10 + i * 25}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              opacity: [0.1, 0.5, 0.2, 0.6, 0.1],
              rotate: [0, 180, 360],
              scale: [1, 1.3, 0.7, 1.2, 1],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}

        {/* Main explosion center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Rotating color rings */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1, 0.8, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
            className="w-[800px] h-[800px] rounded-full border-3 border-dynamic-accent/2"
          />

          <motion.div
            animate={{
              rotate: -360,
              scale: [0.8, 1, 1.1, 1, 0.8],
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dynamic-secondary/10"
          />

          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 0.7, 1.3, 1],
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border-2 border-cyan-500/10"
          />
        </div>

        {/* Floating color particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 rounded-full ${
              i % 3 === 0
                ? "bg-dynamic-primary/40"
                : i % 3 === 1
                ? "bg-dynamic-secondary/40"
                : "bg-dynamic-accent/40"
            } blur-sm`}
            style={{
              left: `${20 + ((i * 60) % 60)}%`,
              top: `${15 + ((i * 70) % 70)}%`,
            }}
            animate={{
              x: [0, Math.cos(i * 0.5) * 100, 0],
              y: [0, Math.sin(i * 0.7) * 100, 0],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Large floating orbs with 3D effect */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 100%)",
          }}
          animate={{
            scale: [1, 1.3, 0.8, 1],
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(219, 39, 119, 0.2) 50%, transparent 100%)",
          }}
          animate={{
            scale: [0.8, 1.2, 1, 0.9, 0.8],
            x: [0, -60, 40, 0],
            y: [0, 50, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(14, 165, 233, 0.2) 50%, transparent 100%)",
          }}
          animate={{
            scale: [1, 0.7, 1.4, 1],
            x: [0, 80, -50, 0],
            y: [0, -60, 40, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse at 20% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(ellipse at 80% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
              "radial-gradient(ellipse at 50% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)",
              "radial-gradient(ellipse at 30% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content Container with Glass Effect */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-left space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white"
              style={{
                textShadow: "0 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: "easeOut",
                type: "spring",
                stiffness: 80,
              }}
              className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-xl"
            >
              Experience premium solutions designed for modern businesses that
              value quality and innovation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="pt-4"
            >
              <button
                onClick={() => {
  FacebookPixel.trackLead({ button: "create-landing" });
  setIsCreateModalOpen(true);
}}
                className="
                  group inline-flex items-center justify-center gap-3
                  px-8 py-4 
                  text-lg font-semibold 
                  text-white bg-dynamic-primary
                  backdrop-blur-md
                  rounded-2xl
                  transition-all duration-300 ease-in-out
                  hover:bg-dynamic-secondary hover:scale-105 hover:shadow-xl hover:shadow-dynamic-accent/30
                  active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-dynamic-accent/50
                  cursor-pointer
                "
              >
                {buttonText}
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="relative space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    Premium Experience
                  </div>
                  <div className="text-gray-300">
                    Discover excellence in every detail
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4">
                    <div className="text-2xl font-bold text-dynamic-accent">
                      10+
                    </div>
                    <div className="text-sm text-gray-300">
                      Years Experience
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-2xl font-bold text-dynamic-accent">
                      {landingCount}+
                    </div>
                    <div className="text-sm text-gray-300">
                      Landings Created
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
  FacebookPixel.trackEvent("ViewGalleryClick", { button: "gallery" });
  setIsGalleryOpen(true);
}}
                    className="
                      w-full px-6 py-3 
                      bg-white/10 backdrop-blur-md 
                    
                      rounded-xl text-white text-sm font-medium
                      hover:bg-white/20 hover:scale-105 
                      transition-all duration-300
                      group flex items-center justify-center gap-2
                      cursor-pointer
                    "
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    View Gallery
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center backdrop-blur-sm bg-white/10"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/90 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />

      <CreateLandingModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          fetchLandingCount();
        }}
      />
    </section>
  );
}
