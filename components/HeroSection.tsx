'use client';

import { FC } from 'react';
import Link from 'next/link';

export const HeroSection: FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Floating Animated Orbs */}
      <div className="absolute top-20 left-10 orb orb-coral orb-delay-1 opacity-20" />
      <div className="absolute top-40 right-20 orb orb-teal orb-delay-2 opacity-20" />
      <div className="absolute bottom-20 left-1/3 orb orb-amber orb-delay-3 opacity-10" />

      <div className="container relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8 reveal">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-medium text-gray-300 tracking-wide">AI-POWERED CREATOR OS</span>
        </div>

        {/* Hero Text */}
        <h1 className="display-hero mb-6 reveal delay-100">
          <span className="block text-white">Your creator</span>
          <span className="text-gradient-vibrant">empire awaits.</span>
        </h1>

        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed reveal delay-200">
          The operating system that turns content creators into <span className="text-white font-semibold">thriving businesses</span>.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 reveal delay-300">
          <Link href="/signup" className="btn-rainbow group">
            <span>Launch your empire</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link href="/tools" className="btn-ghost group">
            <span>Explore Free Tools</span>
          </Link>
        </div>

        {/* Social Proof */}
        <div className="glass-card inline-flex flex-wrap items-center justify-center gap-8 p-6 md:p-8 reveal delay-400 border-white/5">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#0a0a0f] bg-slate-800 flex items-center justify-center text-xs font-bold`}>
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-lg leading-none">12,000+</div>
              <div className="text-gray-500 text-xs uppercase tracking-wider font-medium mt-1">Creators</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
