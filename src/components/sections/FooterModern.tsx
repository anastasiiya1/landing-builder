/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Facebook Pixel type declaration
declare global {
  interface Window {
    fbq?: (
      action: string,
      event: string,
      parameters?: Record<string, any>
    ) => void;
  }
}

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  social: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
}

interface FooterProps {
  contact: ContactInfo;
  companyName?: string;
}

export default function Footer({
  contact,
  companyName = "LandingBuilder",
}: FooterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Facebook Pixel Lead event tracking
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: "Contact Form Submission",
          content_category: "Lead Generation",
          value: 1,
          currency: "USD",
          lead_event_source: "website",
          predicted_ltv: 100,
        });

        // Also track as a custom event
        window.fbq("trackCustom", "ContactFormSubmit", {
          form_name: "Footer Contact Form",
          user_name: formData.name,
          user_phone: formData.phone,
          message_length: formData.comment.length,
        });
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success toast
      setShowToast(true);

      // Reset form
      setFormData({
        name: "",
        phone: "",
        comment: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.footer
      ref={sectionRef}
      initial={{ opacity: 0, x: 100 }}
      animate={sectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      id="contact"
      className="bg-black relative overflow-hidden py-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Soft Flowing Waves */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`footer-wave-${i}`}
            className={`absolute rounded-full blur-2xl ${
              [
                "bg-gradient-to-r from-purple-500/15 via-purple-400/20 to-purple-500/15",
                "bg-gradient-to-r from-cyan-500/15 via-cyan-400/20 to-cyan-500/15",
                "bg-gradient-to-r from-fuchsia-500/15 via-fuchsia-400/20 to-fuchsia-500/15",
                "bg-gradient-to-r from-purple-400/12 via-fuchsia-500/18 to-purple-400/12",
                "bg-gradient-to-r from-cyan-400/12 via-purple-500/18 to-cyan-400/12",
              ][i]
            }`}
            style={{
              width: `${200 + i * 80}px`,
              height: `${60 + i * 20}px`,
              left: `${-10 + i * 25}%`,
              top: `${10 + i * 15}%`,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            }}
            animate={{
              x: [0, 100, -50, 80, 0],
              y: [0, -30, 40, -20, 0],
              scaleX: [1, 1.3, 0.8, 1.2, 1],
              scaleY: [1, 0.7, 1.4, 0.9, 1],
              opacity: [0.4, 0.8, 0.3, 0.7, 0.4],
              borderRadius: [
                "50% 50% 50% 50% / 60% 60% 40% 40%",
                "60% 40% 60% 40% / 50% 70% 30% 50%",
                "40% 60% 40% 60% / 70% 30% 70% 30%",
                "70% 30% 70% 30% / 40% 60% 40% 60%",
                "50% 50% 50% 50% / 60% 60% 40% 40%",
              ],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}

        {/* Flowing Wave Ribbons */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`footer-wave-ribbon-${i}`}
            className={`absolute blur-xl ${
              [
                "bg-gradient-to-r from-transparent via-purple-500/25 to-transparent",
                "bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent",
                "bg-gradient-to-r from-transparent via-fuchsia-500/25 to-transparent",
                "bg-gradient-to-r from-transparent via-purple-400/20 to-transparent",
              ][i]
            }`}
            style={{
              width: `${300 + i * 50}px`,
              height: `${40 + i * 15}px`,
              right: `${-20 + i * 15}%`,
              bottom: `${20 + i * 20}%`,
              borderRadius: "100px",
              transform: `rotate(${15 + i * 10}deg)`,
            }}
            animate={{
              x: [0, -60, 40, -30, 0],
              y: [0, 25, -35, 20, 0],
              scaleX: [1, 1.4, 0.6, 1.3, 1],
              scaleY: [1, 0.8, 1.5, 0.7, 1],
              opacity: [0.3, 0.7, 0.2, 0.8, 0.3],
              rotate: [
                15 + i * 10,
                25 + i * 10,
                5 + i * 10,
                20 + i * 10,
                15 + i * 10,
              ],
            }}
            transition={{
              duration: 18 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2.5,
            }}
          />
        ))}

        {/* Dynamic Fading Color Elements */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`footer-color-fade-${i}`}
            className={`absolute rounded-full blur-2xl ${
              i % 3 === 0
                ? "bg-dynamic-primary/15"
                : i % 3 === 1
                ? "bg-dynamic-secondary/15"
                : "bg-dynamic-accent/15"
            }`}
            style={{
              width: `${150 + i * 40}px`,
              height: `${150 + i * 40}px`,
              left: `${15 + i * 20}%`,
              top: `${10 + i * 15}%`,
            }}
            animate={{
              opacity: [0, 0.25, 0.08, 0.3, 0],
              scale: [0.9, 1.1, 0.8, 1.2, 0.9],
              x: [0, -30, 20, -15, 0],
              y: [0, 25, -15, 30, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2.5,
            }}
          />
        ))}

        {/* Floating gradient orbs */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`footer-gradient-orb-${i}`}
            className={`absolute w-24 h-24 rounded-full blur-xl bg-gradient-to-tr ${
              i % 3 === 0
                ? "from-dynamic-accent/25 to-dynamic-primary/8"
                : i % 3 === 1
                ? "from-dynamic-primary/25 to-dynamic-secondary/8"
                : "from-dynamic-secondary/25 to-dynamic-accent/8"
            }`}
            style={{
              right: `${5 + i * 30}%`,
              bottom: `${15 + i * 25}%`,
            }}
            animate={{
              opacity: [0.05, 0.4, 0.15, 0.5, 0.05],
              rotate: [0, -120, -240, -360],
              scale: [1, 1.4, 0.8, 1.3, 1],
            }}
            transition={{
              duration: 14 + i * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 3,
            }}
          />
        ))}

        {/* Soft Wave Layers */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`footer-wave-layer-${i}`}
            className={`absolute blur-lg ${
              [
                "bg-gradient-to-br from-purple-500/20 via-purple-400/15 to-purple-600/10",
                "bg-gradient-to-br from-cyan-500/20 via-cyan-400/15 to-cyan-600/10",
                "bg-gradient-to-br from-fuchsia-500/20 via-fuchsia-400/15 to-fuchsia-600/10",
              ][i]
            } backdrop-blur-sm`}
            style={{
              width: `${180 + i * 60}px`,
              height: `${80 + i * 30}px`,
              left: `${25 + i * 20}%`,
              top: `${50 + i * 15}%`,
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            }}
            animate={{
              x: [0, 30, -20, 25, 0],
              y: [0, -20, 35, -15, 0],
              scaleX: [1, 1.2, 0.9, 1.3, 1],
              scaleY: [1, 0.8, 1.4, 0.7, 1],
              opacity: [0.5, 0.8, 0.3, 0.9, 0.5],
              borderRadius: [
                "60% 40% 30% 70% / 60% 30% 70% 40%",
                "40% 60% 70% 30% / 40% 70% 30% 60%",
                "70% 30% 40% 60% / 30% 60% 40% 70%",
                "30% 70% 60% 40% / 70% 40% 60% 30%",
                "60% 40% 30% 70% / 60% 30% 70% 40%",
              ],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
        {/* Static background elements (existing) */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-dynamic-primary/8 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-dynamic-accent/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side - Contact Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Let&apos;s Discuss
                <br />
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Your Project?
                </span>
              </h3>
              <p className="text-gray-300 text-lg">Get in touch with us</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-gray-300">{contact.email}</span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <span className="text-gray-300">{contact.phone}</span>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className="text-gray-300">{contact.address}</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.0956Z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                />
              </div>

              <div>
                <textarea
                  name="comment"
                  placeholder="Message"
                  rows={4}
                  value={formData.comment}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500/50 transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 hover:scale-105 hover:shadow-xl hover:shadow-violet-500/25 focus:outline-none focus:ring-2 focus:ring-violet-500/50 cursor-pointer ${
                  isSubmitting ? "opacity-75 cursor-not-allowed scale-95" : ""
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>

              <p className="text-sm text-gray-400 text-center">
                By clicking the button, I agree to the processing of personal
                data
              </p>
            </form>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="border-t border-white/10 pt-8 mt-16 text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L13.09 8.26L20 7L14 12L20 17L13.09 15.74L12 22L10.91 15.74L4 17L10 12L4 7L10.91 8.26L12 2Z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">{companyName}</span>
          </div>
          <p className="text-gray-400">
            &copy; 2025 {companyName}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
