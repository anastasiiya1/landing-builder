"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface BenefitsProps {
  benefits: Benefit[];
}

const BenefitCard = ({
  benefit,
  index,
}: {
  benefit: Benefit;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="
        group relative p-8 
        bg-white/5 backdrop-blur-md 
        rounded-3xl border border-white/10
        hover:bg-white/10 hover:border-white/20
        transition-all duration-300 ease-in-out
        overflow-hidden
      "
    >
      {/* Number indicator with modern gradient */}
      <div
        className={`absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r ${
          index % 4 === 0
            ? "from-violet-500 to-purple-500"
            : index % 4 === 1
            ? "from-purple-500 to-fuchsia-500"
            : index % 4 === 2
            ? "from-fuchsia-500 to-pink-500"
            : "from-cyan-500 to-blue-500"
        } flex items-center justify-center shadow-lg`}
      >
        <span className="text-white font-bold text-lg">{index + 1}</span>
      </div>

      {/* Subtle glow effect with modern colors */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          index % 4 === 0
            ? "from-violet-400/10 to-purple-400/5"
            : index % 4 === 1
            ? "from-purple-400/10 to-fuchsia-400/5"
            : index % 4 === 2
            ? "from-fuchsia-400/10 to-pink-400/5"
            : "from-cyan-400/10 to-blue-400/5"
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="relative">
        <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
          {benefit.icon}
        </div>
        <h3
          className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
            index % 4 === 0
              ? "text-violet-400 group-hover:text-violet-300"
              : index % 4 === 1
              ? "text-purple-400 group-hover:text-purple-300"
              : index % 4 === 2
              ? "text-fuchsia-400 group-hover:text-fuchsia-300"
              : "text-cyan-400 group-hover:text-cyan-300"
          }`}
        >
          {benefit.title}
        </h3>
        <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
      </div>

      {/* Bottom accent line with matching gradient */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
          index % 4 === 0
            ? "from-violet-500 to-purple-500"
            : index % 4 === 1
            ? "from-purple-500 to-fuchsia-500"
            : index % 4 === 2
            ? "from-fuchsia-500 to-pink-500"
            : "from-cyan-500 to-blue-500"
        } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
    </motion.div>
  );
};

export default function Benefits({ benefits }: BenefitsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.min(benefits.length, 4));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.min(benefits.length, 4)) % Math.min(benefits.length, 4)
    );
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-violet-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-fuchsia-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            4 Reasons Why It's Convenient
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              & Reliable to Work With Us
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the difference with our proven approach to excellence
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 gap-8">
          {benefits.slice(0, 4).map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: -currentSlide * 100 + "%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {benefits.slice(0, 4).map((benefit, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <BenefitCard benefit={benefit} index={index} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/10 transition-all duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {Array.from({ length: Math.min(benefits.length, 4) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-gradient-to-r from-violet-500 to-purple-500"
                        : "bg-white/20"
                    }`}
                  />
                )
              )}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/10 transition-all duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
