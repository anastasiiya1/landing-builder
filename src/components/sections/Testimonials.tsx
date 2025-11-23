"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { getImageWithFallback } from "@/lib/image-utils";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import StarRating from "@/components/ui/StarRating";
import {
  getStaticColorClass,
  getStaticRingClass,
  getStaticHoverClass,
  getStaticAccentClass,
} from "@/lib/color-utils";

/* eslint-disable @next/next/no-img-element */

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  companyName?: string;
}

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) => {
  return (
    <Card index={index} delay={index * 0.2} hoverScale={true}>
      {/* Quote icon with modern gradient */}
      <div className="absolute top-0 right-0 opacity-30">
        <svg
          className={`w-8 h-8 ${getStaticColorClass(index)}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
        </svg>
      </div>

      <div className="relative">
        <StarRating rating={testimonial.rating} colorIndex={index} />

        <p className="text-gray-300 mt-6 mb-8 leading-relaxed text-lg italic">
          &ldquo;{testimonial.content}&rdquo;
        </p>

        <div className="flex items-center">
          <div className="relative w-14 h-14 mr-4">
            <img
              src={getImageWithFallback(testimonial.image, "avatar")}
              alt={testimonial.name}
              className={`w-full h-full object-cover rounded-full ring-2 ${getStaticRingClass(
                index
              )}`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const fallback =
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80";
                if (target.src !== fallback) {
                  target.src = fallback;
                }
              }}
            />
          </div>
          <div>
            <h4
              className={`font-semibold text-lg transition-colors duration-300 ${getStaticHoverClass(
                index
              )}`}
            >
              {testimonial.name}
            </h4>
            <p className="text-sm text-gray-400">
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom accent line with matching gradient */}
      <div
        className={`absolute bottom-[-12px] left-0 right-0 h-1 bg-gradient-to-r ${getStaticAccentClass(
          index
        )} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
    </Card>
  );
};

export default function Testimonials({
  testimonials,
  companyName = "LandingBuilder",
}: TestimonialsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="testimonials">
      {/* 3D Purple Warning Tape - Bottom Left to Top Right */}
      <div
        className="absolute overflow-hidden pointer-events-none"
        style={{
          left: "50%",
          top: "0",
          width: "100vw",
          height: "100%",
          transform: "translateX(-50%)",
        }}
      >
        {/* Main 3D Warning Tape */}
        <div
          className="absolute"
          style={{
            width: "200vw",
            height: "120px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(45deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* 3D Tape with depth layers */}
          <motion.div
            className="relative w-full h-full"
            animate={{
              rotateX: [0, 2, 0, -2, 0],
              rotateY: [0, 1, 0, -1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Main tape surface */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-600/25 via-violet-600/30 to-purple-700/25 border-t-4 border-b-4 border-purple-500/40 shadow-2xl">
              {/* 3D highlight on top */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              {/* 3D shadow on bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-black/30 to-transparent" />
            </div>

            {/* Depth layer 1 */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-purple-800/20 to-purple-900/20 border-t-2 border-b-2 border-purple-600/30"
              style={{ transform: "translateZ(-5px)" }}
            />

            {/* Depth layer 2 */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-purple-900/15 to-black/20 border-t border-b border-purple-700/20"
              style={{ transform: "translateZ(-10px)" }}
            />

            {/* Scrolling text container */}
            <div className="absolute inset-0 flex items-center overflow-hidden">
              <motion.div
                className="flex items-center space-x-20 whitespace-nowrap"
                initial={{ x: 0 }}
                animate={{
                  x: [0, "-50%"],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
                style={{
                  width: "200%",
                }}
              >
                {/* First set of text */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={`first-${i}`}
                    className="flex items-center space-x-20"
                  >
                    <span className="text-2xl font-bold text-white/80 tracking-wider drop-shadow-lg">
                      {companyName}
                    </span>
                    <div className="w-4 h-4 bg-dynamic-accent/70 rotate-45 shadow-lg" />
                    <span className="text-2xl font-bold text-white/80 tracking-wider drop-shadow-lg">
                      Create Your Landing
                    </span>
                    <div className="w-3 h-3 bg-dynamic-secondary/70 rounded-full shadow-lg" />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={`second-${i}`}
                    className="flex items-center space-x-20"
                  >
                    <span className="text-2xl font-bold text-white/80 tracking-wider drop-shadow-lg">
                      {companyName}
                    </span>
                    <div className="w-4 h-4 bg-dynamic-accent/70 rotate-45 shadow-lg" />
                    <span className="text-2xl font-bold text-white/80 tracking-wider drop-shadow-lg">
                      Create Your Landing
                    </span>
                    <div className="w-3 h-3 bg-dynamic-secondary/70 rounded-full shadow-lg" />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Ambient lighting effects */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-l from-violet-500/8 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Client Reviews
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            99% satisfied clients trust our expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
