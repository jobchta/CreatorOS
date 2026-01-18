'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Play, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Play, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection: FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950/50">

      {/* Enhanced Animated Background Effects using Globals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-coral top-[10%] left-[10%] delay-100" />
        <div className="orb orb-teal top-[20%] right-[15%] delay-300" />
        <div className="orb orb-amber bottom-[15%] left-[20%] delay-500" />

        {/* Additional Spotlight for depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-24 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 mb-8 reveal hover:border-white/10 transition-colors cursor-default">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-sm font-semibold text-slate-300 tracking-wide uppercase">
            AI-Powered Creator OS
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="display-hero mb-6 reveal-scale delay-200">
          <span className="block text-white">Your creator</span>
          <span className="text-gradient-vibrant">
            empire awaits.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed reveal delay-300">
          The operating system that turns content creators into
          <span className="text-white font-medium"> thriving businesses</span>.
          Analytics. Deals. Calendar. All in one.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 reveal delay-400">
          <Link href="/signup" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto btn-rainbow group border-0">
              <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
              <span className="relative z-10">Launch your empire</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </Link>

          <Link href="/tools" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto btn-ghost hover:text-white group">
              <Play className="w-4 h-4 fill-current" />
              Explore Free Tools
            </button>
          </Link>
        </div>

        {/* Social Proof & Note Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto reveal delay-500">

          {/* Founder's Note - Authentic Social Proof */}
          <div className="glass-card p-6 text-left relative overflow-hidden group hover:border-purple-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Quote className="w-12 h-12 text-purple-500" />
            </div>

            <p className="text-lg text-slate-200 leading-relaxed mb-4 italic font-medium">
              "I built LogicLoom because I was tired of using spreadsheets to track brand deals.
              This is the tool I wish I had when I started monetizing."
            </p>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-purple-500/20">
                RK
              </div>
              <div>
                <p className="text-sm font-bold text-white">Rahul Kotian</p>
                <p className="text-xs text-purple-400 font-medium">Founder, LogicLoom</p>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="glass-card p-6 flex flex-col justify-center items-center md:items-start space-y-4 hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-bold text-white ring-2 ring-transparent group-hover:ring-emerald-500/20 transition-all"
                    style={{ background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 60%), hsl(${i * 60 + 30}, 70%, 40%))` }}
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white leading-none">12,000+</div>
                <div className="text-emerald-400 text-xs uppercase tracking-wider font-bold mt-1">Active Creators</div>
              </div>
            </div>

            <div className="w-full h-px bg-white/10" />

            <div className="flex items-center gap-3">
              <div className="text-amber-400 flex gap-0.5 text-lg">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i} className="animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>{star}</span>
                ))}
              </div>
              <span className="text-slate-400 text-sm font-medium">4.9/5 Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

