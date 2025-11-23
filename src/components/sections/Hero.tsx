"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import GalleryModal from "@/components/GalleryModal";

interface HeroProps {
  title: string;
  buttonText: string;
  heroImage: string;
  onButtonClick?: () => void;
}

export default function Hero({ title, buttonText, onButtonClick }: HeroProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-16">
      {/* Modern Abstract Background */}
      <div className="absolute inset-0 z-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-fuchsia-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-cyan-600/5 to-transparent" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      {/* Content Container with Glass Effect */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Botanical Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Main Content */}
          <div className="text-left space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white"
              style={{
                textShadow: "0 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
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
                onClick={onButtonClick}
                className="
                  group inline-flex items-center justify-center gap-3
                  px-8 py-4 
                  text-lg font-semibold 
                  text-white bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600
                  backdrop-blur-md
                  border border-violet-500/30
                  rounded-2xl
                  transition-all duration-300 ease-in-out
                  hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 hover:scale-105 hover:shadow-xl hover:shadow-violet-500/30
                  active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-violet-500/50
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

          {/* Right Side - Glass Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute top-6 right-6 w-20 h-20 opacity-20">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-green-400"
                >
                  <path
                    fill="currentColor"
                    d="M50,10 C30,10 10,30 10,50 C10,70 30,90 50,90 C70,90 90,70 90,50 C90,30 70,10 50,10 Z M50,20 L60,35 L75,35 L63,47 L68,62 L50,52 L32,62 L37,47 L25,35 L40,35 Z"
                  />
                </svg>
              </div>

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
                    <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                      10+
                    </div>
                    <div className="text-sm text-gray-300">
                      Years Experience
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                      500+
                    </div>
                    <div className="text-sm text-gray-300">
                      Projects Completed
                    </div>
                  </div>
                </div>

                {/* View Gallery Button */}
                <div className="pt-4">
                  <button
                    onClick={() => setIsGalleryOpen(true)}
                    className="
                      w-full px-6 py-3 
                      bg-white/10 backdrop-blur-md 
                      border border-white/20 
                      rounded-xl text-white text-sm font-medium
                      hover:bg-white/20 hover:scale-105 
                      transition-all duration-300
                      group flex items-center justify-center gap-2
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

      {/* Scroll indicator */}
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
    </section>
  );
}
