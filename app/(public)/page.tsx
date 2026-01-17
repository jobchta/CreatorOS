'use client';

import { HeroSection } from '@/components/HeroSection';
import { StatsSection } from '@/components/StatsSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { ToolsSection } from '@/components/ToolsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { CTASection } from '@/components/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-x-hidden">
      {/* Main content sections - all responsive */}
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ToolsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
