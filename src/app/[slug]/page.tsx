import { notFound } from "next/navigation";
import { getLanding } from "@/lib/supabase/getLanding";
import ClientLandingWrapper from "@/components/ClientLandingWrapper";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  const landingData = await getLanding(slug);

  if (!landingData) {
    notFound();
  }

  return <ClientLandingWrapper landingData={landingData} />;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const landingData = await getLanding(slug);

  if (!landingData) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: landingData.title,
    description: `Landing page for ${landingData.title}`,
    openGraph: {
      title: landingData.title,
      description: `Landing page for ${landingData.title}`,
      images: [landingData.hero_image],
    },
    twitter: {
      card: "summary_large_image",
      title: landingData.title,
      description: `Landing page for ${landingData.title}`,
      images: [landingData.hero_image],
    },
  };
}

export async function generateStaticParams() {
  return [];
}
