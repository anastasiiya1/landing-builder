"use client";

import { useEffect } from "react";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Benefits from "@/components/sections/Benefits";
import Testimonials from "@/components/sections/Testimonials";
import FooterModern from "@/components/sections/FooterModern";
import { FacebookPixel } from "@/lib/facebook-pixel";
import type { LandingPage } from "@/types/database";

interface ClientLandingWrapperProps {
  landingData: LandingPage;
}

export default function ClientLandingWrapper({
  landingData,
}: ClientLandingWrapperProps) {
  useEffect(() => {
    // Track page view
    FacebookPixel.trackPageView(landingData.slug);
  }, [landingData.slug]);

  // Apply dynamic color palette to CSS variables
  useEffect(() => {
    if (landingData.color_palette) {
      const root = document.documentElement;
      root.style.setProperty(
        "--color-primary",
        landingData.color_palette.primary
      );
      root.style.setProperty(
        "--color-secondary",
        landingData.color_palette.secondary
      );
      root.style.setProperty(
        "--color-accent",
        landingData.color_palette.accent
      );
      root.style.setProperty(
        "--color-background",
        landingData.color_palette.background
      );

      // Set glow colors with opacity for hover effects
      root.style.setProperty(
        "--color-primary-10",
        landingData.color_palette.primary + "1A"
      );
      root.style.setProperty(
        "--color-secondary-10",
        landingData.color_palette.secondary + "0D"
      );
    }
  }, [landingData.color_palette]);

  const handleHeroButtonClick = () => {
    FacebookPixel.trackLead({
      slug: landingData.slug,
      title: landingData.title,
    });
  };

  return (
    <div className="min-h-screen bg-black w-full">
      {/* Fixed Header */}
      <Header logo={landingData.company_name || "LandingBuilder"} />

      {/* Main Content */}
      <main className="w-full">
        {/* Hero Section */}
        <Hero
          title={landingData.title}
          buttonText={landingData.button_text}
          heroImage={landingData.hero_image}
          onButtonClick={handleHeroButtonClick}
        />

        {/* Benefits Section */}
        <Benefits benefits={landingData.benefits} />

        {/* Testimonials Section */}
        <Testimonials
          testimonials={landingData.testimonials}
          companyName={landingData.company_name || "LandingBuilder"}
        />
      </main>

      {/* Footer with Contact Form */}
      <FooterModern
        contact={landingData.contact}
        companyName={landingData.company_name || "LandingBuilder"}
      />
    </div>
  );
}
