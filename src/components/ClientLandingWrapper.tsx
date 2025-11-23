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

  const handleHeroButtonClick = () => {
    FacebookPixel.trackLead({
      slug: landingData.slug,
      title: landingData.title,
    });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Fixed Header */}
      <Header logo="GreenSpace" />

      {/* Main Content */}
      <main>
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
        <Testimonials testimonials={landingData.testimonials} />
      </main>

      {/* Footer with Contact Form */}
      <FooterModern contact={landingData.contact} />
    </div>
  );
}
