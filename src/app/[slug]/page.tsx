import { notFound } from 'next/navigation';
import { getLanding } from '@/lib/supabase/getLanding';
import HeroSection from '@/components/sections/HeroSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FooterSection from '@/components/sections/FooterSection';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch landing page data from Supabase
  const landingData = await getLanding(slug);

  // Show 404 if no data found
  if (!landingData) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <HeroSection data={landingData} />
      <BenefitsSection benefits={landingData.benefits} />
      <TestimonialsSection testimonials={landingData.testimonials} />
      <FooterSection contact={landingData.contact} />
    </div>
  );
}

// Generate metadata dynamically for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const landingData = await getLanding(slug);

  if (!landingData) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: landingData.title,
    description: landingData.description,
    openGraph: {
      title: landingData.title,
      description: landingData.description,
      images: [landingData.hero_image],
    },
    twitter: {
      card: 'summary_large_image',
      title: landingData.title,
      description: landingData.description,
      images: [landingData.hero_image],
    },
  };
}

// Optional: Generate static params for known slugs
export async function generateStaticParams() {
  // In a real application, you might want to fetch all slugs from the database
  // For now, return an empty array to use ISR (Incremental Static Regeneration)
  return [];
}
