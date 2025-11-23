"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface CreateLandingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

const colorPalettes: { name: string; colors: ColorPalette }[] = [
  {
    name: "Purple Dream",
    colors: {
      primary: "#8B5CF6",
      secondary: "#A855F7",
      accent: "#EC4899",
      background: "#000000",
    },
  },
  {
    name: "Ocean Breeze",
    colors: {
      primary: "#06B6D4",
      secondary: "#0EA5E9",
      accent: "#3B82F6",
      background: "#0F172A",
    },
  },
  {
    name: "Sunset Glow",
    colors: {
      primary: "#F59E0B",
      secondary: "#EF4444",
      accent: "#EC4899",
      background: "#1F2937",
    },
  },
  {
    name: "Forest Green",
    colors: {
      primary: "#10B981",
      secondary: "#059669",
      accent: "#34D399",
      background: "#064E3B",
    },
  },
  {
    name: "Monochrome",
    colors: {
      primary: "#6B7280",
      secondary: "#4B5563",
      accent: "#9CA3AF",
      background: "#111827",
    },
  },
];

const defaultBenefits = [
  {
    icon: "🚀",
    title: "Fast Setup",
    description: "Get your landing page up and running in minutes",
  },
  {
    icon: "🎨",
    title: "Beautiful Design",
    description: "Modern, responsive design that converts visitors",
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    description: "Optimized for speed and performance",
  },
  {
    icon: "📱",
    title: "Mobile Ready",
    description: "Looks perfect on all devices and screen sizes",
  },
];

const defaultTestimonials = [
  {
    name: "Alex Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content:
      "This landing page builder exceeded our expectations. The conversion rates improved by 40%!",
    rating: 5,
  },
  {
    name: "Sarah Wilson",
    role: "Founder",
    company: "StartupXYZ",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content:
      "Amazing tool! Created our landing page in under 30 minutes with professional results.",
    rating: 5,
  },
];

export default function CreateLandingModal({
  isOpen,
  onClose,
}: CreateLandingModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    buttonText: "Create Your Own Landing",
    heroImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    email: "",
    phone: "",
    address: "",
    companyName: "",
  });

  const [selectedPalette, setSelectedPalette] = useState<ColorPalette>(
    colorPalettes[0].colors
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [createdLanding, setCreatedLanding] = useState<{
    slug: string;
    title: string;
  } | null>(null);

  // Block body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, onClose]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const slug = generateSlug(formData.title);

      const landingData = {
        slug,
        title: formData.title,
        button_text: formData.buttonText,
        hero_image: formData.heroImage,
        benefits: defaultBenefits,
        testimonials: defaultTestimonials,
        contact: {
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          social: {
            twitter: "",
            facebook: "",
            linkedin: "",
            instagram: "",
          },
        },
        color_palette: selectedPalette,
        company_name: formData.companyName || "LandingBuilder",
        liquid_glass_enabled: true,
      };

      const { data, error } = await supabase
        .from("landings")
        .insert([landingData])
        .select();

      if (error) {
        console.error("Error creating landing:", error);
        setSubmitStatus("error");
      } else {
        setSubmitStatus("success");
        setCreatedLanding({ slug, title: formData.title });
        // Don't auto-close modal, let user choose what to do
      }
    } catch (error) {
      console.error("Error creating landing:", error);
      setSubmitStatus("error");
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-black/95 backdrop-blur-md rounded-3xl border border-purple-500/20 z-50 flex flex-col max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)] lg:max-h-[calc(100vh-8rem)]"
            style={{
              boxShadow: `
                0 0 0 1px rgba(168, 85, 247, 0.1),
                0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 10px 15px -3px rgba(0, 0, 0, 0.1),
                0 20px 25px -5px rgba(0, 0, 0, 0.1),
                0 0 30px rgba(147, 51, 234, 0.25),
                0 0 60px rgba(168, 85, 247, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Create Your Landing Page
                </h2>
                <p className="text-gray-400">
                  Build a professional landing page in minutes
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Basic Information
                  </h3>

                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Landing Page Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="My Awesome Landing Page"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="buttonText"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Call-to-Action Button Text
                    </label>
                    <input
                      type="text"
                      id="buttonText"
                      name="buttonText"
                      value={formData.buttonText}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="Get Started Today"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="Your Company Name"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Contact Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="contact@company.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Business Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="123 Business St, City, State 12345"
                    />
                  </div>
                </div>

                {/* Color Palette Selection */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Choose Color Palette
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {colorPalettes.map((palette, index) => (
                      <motion.div
                        key={palette.name}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          selectedPalette === palette.colors
                            ? "border-purple-500 bg-purple-500/10"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        }`}
                        onClick={() => setSelectedPalette(palette.colors)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="flex space-x-1">
                            <div
                              className="w-6 h-6 rounded-full"
                              style={{
                                backgroundColor: palette.colors.primary,
                              }}
                            />
                            <div
                              className="w-6 h-6 rounded-full"
                              style={{
                                backgroundColor: palette.colors.secondary,
                              }}
                            />
                            <div
                              className="w-6 h-6 rounded-full"
                              style={{ backgroundColor: palette.colors.accent }}
                            />
                          </div>
                          {selectedPalette === palette.colors && (
                            <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <h4 className="text-white font-medium">
                          {palette.name}
                        </h4>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Submit Button or Action Buttons */}
                <div className="pt-6">
                  {submitStatus === "success" && createdLanding ? (
                    <div className="space-y-4">
                      {/* Success Message */}
                      <div className="p-4 bg-green-900/50 border border-green-700/50 rounded-xl text-green-400">
                        <div className="flex items-center gap-2 mb-2">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-semibold">
                            Landing Created Successfully!
                          </span>
                        </div>
                        <p className="text-sm text-green-300">
                          Your landing page &quot;{createdLanding.title}&quot;
                          has been created and is ready to view.
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            // Reset form and close modal
                            setFormData({
                              title: "",
                              buttonText: "Create Your Own Landing",
                              heroImage:
                                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
                              email: "",
                              phone: "",
                              address: "",
                              companyName: "",
                            });
                            setSelectedPalette(colorPalettes[0].colors);
                            setSubmitStatus("idle");
                            setCreatedLanding(null);
                            onClose();
                          }}
                          className="flex-1 px-6 py-3 text-gray-400 hover:text-white transition-colors rounded-lg border border-gray-600 hover:border-gray-500"
                        >
                          Close
                        </button>
                        <motion.button
                          type="button"
                          onClick={() => {
                            if (createdLanding) {
                              window.open(`/${createdLanding.slug}`, "_blank");
                              // Reset and close modal after opening
                              setTimeout(() => {
                                setFormData({
                                  title: "",
                                  buttonText: "Create Your Own Landing",
                                  heroImage:
                                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
                                  email: "",
                                  phone: "",
                                  address: "",
                                  companyName: "",
                                });
                                setSelectedPalette(colorPalettes[0].colors);
                                setSubmitStatus("idle");
                                setCreatedLanding(null);
                                onClose();
                              }, 500);
                            }
                          }}
                          className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-xl hover:from-green-500 hover:to-emerald-500 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Go to Your Landing →
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={
                        isSubmitting || !formData.title || !formData.email
                      }
                      className="w-full px-8 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Creating Landing Page...</span>
                        </div>
                      ) : submitStatus === "error" ? (
                        <div className="flex items-center justify-center space-x-2">
                          <svg
                            className="w-5 h-5 text-red-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Try Again</span>
                        </div>
                      ) : (
                        "Create My Landing Page"
                      )}
                    </motion.button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
