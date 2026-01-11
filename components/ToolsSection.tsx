'use client';

import Link from 'next/link';
import { ArrowRight, Calculator, Activity, DollarSign } from 'lucide-react';

export const ToolsSection = () => {
  return (
    <section className="py-20 relative z-10" id="tools">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="display-section text-white mb-6">
            <span className="text-gradient-vibrant">Power Tools</span> for Creators
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Stop guessing. Start growing. Use our free tools to analyze, calculate, and optimize your creator business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Rate Calculator Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative glass-card p-8 h-full flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-6 shadow-lg shadow-pink-500/20">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Rate Calculator</h3>
              <p className="text-slate-400 mb-6 flex-grow">
                Determine exactly what to charge brands for sponsored content based on your niche and engagement.
              </p>
              <Link
                href="/tools/rate-calculator"
                className="inline-flex items-center text-pink-400 font-semibold group-hover:text-pink-300 transition-colors"
              >
                Calculate Rate <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Engagement Analyzer Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative glass-card p-8 h-full flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Engagement Analyzer</h3>
              <p className="text-slate-400 mb-6 flex-grow">
                Deep dive into your audience metrics to prove your value to sponsors and improve your content.
              </p>
              <Link
                href="/tools/engagement-analyzer"
                className="inline-flex items-center text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors"
              >
                Analyze Profile <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
