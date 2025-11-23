import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import Scene3D from '@/components/3d/Scene3D';
import type { LandingPage } from '@/types/landing';

interface HeroSectionProps {
  data: LandingPage;
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Scene3D />
      </div>
      
      {/* Content */}
      <Container className="relative z-10 text-center">
        <Reveal delay={0.2}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {data.title}
          </h1>
        </Reveal>
        
        <Reveal delay={0.4}>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </Reveal>
        
        <Reveal delay={0.6}>
          <p className="text-lg text-blue-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </Reveal>
        
        <Reveal delay={0.8}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="shadow-lg shadow-blue-500/25">
              Get Started
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              Learn More
            </Button>
          </div>
        </Reveal>
      </Container>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </section>
  );
}
