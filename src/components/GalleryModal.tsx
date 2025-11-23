"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface LandingPagePreview {
  id: string;
  slug: string;
  title: string;
  hero_image: string;
  created_at: string;
}

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GalleryModal({ isOpen, onClose }: GalleryModalProps) {
  const [landingPages, setLandingPages] = useState<LandingPagePreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLandingPages = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("landings")
        .select("id, slug, title, hero_image, created_at")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setLandingPages(data || []);
    } catch (err) {
      console.error("Error fetching landing pages:", err);
      setError("Failed to load landing pages");
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    if (isOpen) {
      fetchLandingPages();
    }
  }, [isOpen]);

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

  const getImageWithFallback = (imageUrl: string) => {
    return (
      imageUrl ||
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
            <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Landing Pages Gallery
                </h2>
                <p className="text-gray-400">
                  Browse our previous work and get inspired
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
              {loading && (
                <div className="flex items-center justify-center h-64">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading gallery...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="text-red-400 mb-2">⚠️ {error}</div>
                    <button
                      onClick={fetchLandingPages}
                      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors duration-300 cursor-pointer"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {!loading && !error && landingPages.length === 0 && (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center text-gray-400">
                    <div className="text-4xl mb-4">🎨</div>
                    <div className="text-lg">No landing pages found</div>
                    <div className="text-sm">
                      Create your first landing page to see it here!
                    </div>
                  </div>
                </div>
              )}

              {!loading && !error && landingPages.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {landingPages.map((page, index) => (
                    <motion.div
                      key={page.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300"
                      style={{
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `
                          0 0 0 1px rgba(168, 85, 247, 0.2),
                          0 4px 6px -1px rgba(0, 0, 0, 0.1),
                          0 10px 15px -3px rgba(0, 0, 0, 0.1),
                          0 0 20px rgba(147, 51, 234, 0.2),
                          0 0 40px rgba(168, 85, 247, 0.1)
                        `;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {/* Image */}
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={getImageWithFallback(page.hero_image)}
                          alt={page.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Visit Button */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <a
                            href={`/${page.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-white/90 text-gray-900 text-sm font-medium rounded-lg hover:bg-white transition-colors duration-300 cursor-pointer"
                          >
                            Visit →
                          </a>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-violet-400 transition-colors duration-300">
                          {page.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>/{page.slug}</span>
                          <span>{formatDate(page.created_at)}</span>
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-violet-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
