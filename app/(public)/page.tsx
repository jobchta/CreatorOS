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
import { useMouseTracking } from '@/hooks/useMouseTracking';

export default function Home() {
  const { mousePos } = useMouseTracking();

  return (
    <>
      <HeroSection mousePos={mousePos} />
      <StatsSection />
      <FeaturesSection />
      <ToolsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
