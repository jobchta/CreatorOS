'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

export const HeroSection: FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">

      {/* Background Effects - Desktop orbs larger */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 md:top-20 md:left-10 w-32 h-32 md:w-64 md:h-64 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute top-20 right-5 md:top-40 md:right-20 w-40 h-40 md:w-80 md:h-80 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-48 h-48 md:w-96 md:h-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* Main Content Container - Properly constrained */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6 md:mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs md:text-sm font-medium text-gray-300 tracking-wide">
              AI-POWERED CREATOR OS
            </span>
          </div>

          {/* Main Heading - Mobile-first text scaling */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="block text-white">Your creator</span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              empire awaits.
            </span>
          </h1>

          {/* Subtitle - Responsive text and spacing */}
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-10 max-w-xs sm:max-w-md md:max-w-2xl mx-auto leading-relaxed px-2">
            The operating system that turns content creators into
            <span className="text-white font-semibold"> thriving businesses</span>.
            Analytics. Deals. Calendar. All in one.
          </p>

          {/* CTA Buttons - Stack on mobile, row on desktop */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto justify-center items-center mb-12 md:mb-16">
            <Link
              href="/signup"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 h-12 md:h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25"
            >
              <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Launch your empire</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
            <Link
              href="/tools"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 h-12 md:h-14 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all"
            >
              <Play className="w-4 h-4" />
              <span className="text-sm md:text-base">Explore Free Tools</span>
            </Link>
          </div>

          {/* Social Proof Card - Responsive layout */}
          <div className="w-full max-w-lg md:max-w-xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">

              {/* Avatar Stack + Count */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex -space-x-2 md:-space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-900 flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 60%), hsl(${i * 60 + 30}, 70%, 40%))` }}
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="text-white font-bold text-base md:text-lg leading-none">12,000+</div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider font-medium mt-0.5">Creators</div>
                </div>
              </div>

              {/* Divider - Hidden on mobile */}
              <div className="hidden sm:block w-px h-10 bg-white/10" />

              {/* Rating */}
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex text-amber-400 text-sm md:text-lg">★★★★★</div>
                <div className="text-left">
                  <div className="text-white font-bold text-base md:text-lg leading-none">4.9/5</div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider font-medium mt-0.5">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
