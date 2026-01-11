'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { StatsSection } from '@/components/StatsSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { ToolsSection } from '@/components/ToolsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { CTASection } from '@/components/CTASection';
import Footer from '@/components/Footer';
import { useMouseTracking } from '@/hooks/useMouseTracking';
import { useClientOnly } from '@/hooks/useClientOnly';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isClient = useClientOnly();
  const { mousePos } = useMouseTracking();

  // Close mobile menu on navigation
  const handleNavigation = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <div className="min-h-screen relative bg-bg overflow-x-hidden">
      {/* Aurora background */}
      <div className="aurora" aria-hidden="true" />
      
      {/* Floating orbs */}
      <div className="orb orb-coral orb-delay-1" aria-hidden="true" />
      <div className="orb orb-teal orb-delay-2" aria-hidden="true" />
      <div className="orb orb-amber orb-delay-3" aria-hidden="true" />
      <div className="orb orb-emerald orb-delay-4" aria-hidden="true" />
      
      {/* Grain texture */}
      <div className="grain" aria-hidden="true" />
      
      {/* Mouse spotlight */}
      {isClient && (
        <div
          className="spotlight"
          style={{
            left: mousePos.x,
            top: mousePos.y,
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Main content */}
      <Navigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onNavigate={handleNavigation}
      />
      
      <HeroSection mousePos={mousePos} />
      <StatsSection />
      <FeaturesSection />
      <ToolsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
