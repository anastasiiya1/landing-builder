"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { getImageWithFallback } from "@/lib/image-utils";

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

const StarRating = ({
  rating,
  colorIndex = 0,
}: {
  rating: number;
  colorIndex?: number;
}) => {
  const starColors = [
    "text-violet-400",
    "text-purple-400",
    "text-fuchsia-400",
    "text-cyan-400",
  ];

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 transition-colors duration-300 ${
            index < rating ? starColors[colorIndex % 4] : "text-gray-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="
        group relative p-8
        bg-white/5 backdrop-blur-md 
        rounded-3xl border border-white/10
        hover:bg-white/10 hover:border-white/20
        transition-all duration-300 ease-in-out
        overflow-hidden
      "
    >
      {/* Quote icon with modern gradient */}
      <div className="absolute top-6 right-6 opacity-30">
        <svg
          className={`w-8 h-8 ${
            index % 4 === 0
              ? "text-violet-400"
              : index % 4 === 1
              ? "text-purple-400"
              : index % 4 === 2
              ? "text-fuchsia-400"
              : "text-cyan-400"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
        </svg>
      </div>

      {/* Subtle glow effect with modern colors */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          index % 4 === 0
            ? "from-violet-400/5 to-purple-400/5"
            : index % 4 === 1
            ? "from-purple-400/5 to-fuchsia-400/5"
            : index % 4 === 2
            ? "from-fuchsia-400/5 to-pink-400/5"
            : "from-cyan-400/5 to-blue-400/5"
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

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
              className={`w-full h-full object-cover rounded-full ring-2 ${
                index % 4 === 0
                  ? "ring-violet-400/30"
                  : index % 4 === 1
                  ? "ring-purple-400/30"
                  : index % 4 === 2
                  ? "ring-fuchsia-400/30"
                  : "ring-cyan-400/30"
              }`}
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
              className={`font-semibold text-lg transition-colors duration-300 ${
                index % 4 === 0
                  ? "text-white group-hover:text-violet-400"
                  : index % 4 === 1
                  ? "text-white group-hover:text-purple-400"
                  : index % 4 === 2
                  ? "text-white group-hover:text-fuchsia-400"
                  : "text-white group-hover:text-cyan-400"
              }`}
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

export default function Testimonials({
  testimonials,
  companyName = "LandingBuilder",
}: TestimonialsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 100 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      id="testimonials"
      className="py-20 bg-black relative overflow-hidden"
    >
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
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-violet-500/5" />
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
    </motion.section>
  );
}
