import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Scene3D from '@/components/3d/Scene3D';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Scene3D />
      </div>
      
      {/* Content */}
      <Container className="text-center relative z-10">
        <h1 className="text-9xl font-bold text-white mb-4">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-blue-100 mb-6">
          Landing Page Not Found
        </h2>
        <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
          The landing page you're looking for doesn't exist or may have been moved. 
          Let's get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="shadow-lg shadow-blue-500/25">
              Go Home
            </Button>
          </Link>
          <Link href="/demo">
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              View Demo
            </Button>
          </Link>
        </div>
      </Container>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}
