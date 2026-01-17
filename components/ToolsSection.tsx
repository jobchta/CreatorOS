'use client';

import Link from 'next/link';
import { DollarSign, TrendingUp, FileImage, AtSign, Wand2 } from 'lucide-react';

export const ToolsSection = () => {
  const tools = [
    {
      name: 'Rate Calculator',
      description: 'Know your worth with data-backed rates',
      href: '/tools/rate-calculator',
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      name: 'AI Caption Generator',
      description: 'Generate scroll-stopping captions instantly',
      href: '/tools/caption-generator',
      icon: Wand2,
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Media Kit Builder',
      description: 'Create professional media kits in minutes',
      href: '/tools/media-kit',
      icon: FileImage,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'Engagement Analyzer',
      description: 'Deep insights into your performance',
      href: '/tools/engagement-analyzer',
      icon: TrendingUp,
      color: 'from-rose-500 to-orange-500'
    },
    {
      name: 'Email Signature',
      description: 'Professional signatures for brand emails',
      href: '/tools/email-signature',
      icon: AtSign,
      color: 'from-cyan-500 to-blue-500'
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-black/30" aria-label="Free Tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-block mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs md:text-sm font-medium">
            Free Forever
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-white">
            Power Tools
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-xs md:max-w-xl mx-auto">
            Essential tools for every creator. No signup required.
          </p>
        </div>

        {/* Tools Grid - 2 cols on mobile, 3 on tablet, 5 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="group p-4 md:p-5 rounded-xl border border-gray-700/50 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-900/80 transition-all text-center"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${tool.color} mb-3 md:mb-4 group-hover:scale-110 transition-transform`}>
                <tool.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-gray-500 hidden md:block">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
