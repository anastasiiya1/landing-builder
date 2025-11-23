"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

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
  return (
    <Card index={index} glowEffect={true}>
      {/* Number indicator with modern gradient */}
      {/* <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-dynamic-primary flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-lg">{index + 1}</span>
      </div> */}

      {/* Subtle glow effect with modern colors */}
      <div className="absolute inset-0 bg-dynamic-glow opacity-0 transition-opacity duration-500" />

      <div className="relative">
        <div className="flex gap-4 align-middle text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
          {benefit.icon}
          <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-dynamic-accent transition-colors duration-300">
            {benefit.title}
          </h3>
        </div>

        <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
      </div>

      {/* Bottom accent line with matching gradient */}
      <div className="absolute bottom-[-12px] left-0 right-0 h-1 bg-dynamic-accent transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
    </Card>
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
    <Section id="benefits">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-dynamic-glow rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-dynamic-glow rounded-full blur-3xl animate-pulse delay-1000" />
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
            4 Reasons Why It&apos;s Convenient
            <br />
            <span className="text-dynamic-accent">
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
              className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
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
                        ? "bg-dynamic-accent"
                        : "bg-white/20"
                    }`}
                  />
                )
              )}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
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
    </Section>
  );
}
