'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="py-16 md:py-20 border-t border-gray-800/50" aria-label="Call to action">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white">
            Ready to build your <span className="text-emerald-400">empire</span>?
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-400 mb-6 md:mb-8 max-w-xs md:max-w-2xl mx-auto leading-relaxed px-4">
            Join 12,000+ creators who've transformed their content into real businesses.
          </p>

          {/* CTA Buttons - Full width on mobile */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 h-12 md:h-14 bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
            >
              <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Start building free</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 h-12 md:h-14 border border-gray-600 text-gray-300 font-medium rounded-xl hover:border-gray-500 hover:bg-white/5 transition-all"
            >
              <span className="text-sm md:text-base">View Pricing</span>
            </Link>
          </div>

          <p className="text-gray-500 text-xs md:text-sm mt-4 md:mt-6">No credit card required</p>
        </div>
      </div>
    </section>
  );
};
