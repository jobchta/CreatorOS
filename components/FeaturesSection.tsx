'use client';

export const FeaturesSection = () => {
  const features = [
    { title: 'Unified Analytics', description: 'All platforms, one beautiful dashboard', icon: '📊', color: 'from-rose-500 to-pink-500' },
    { title: 'Deal Pipeline', description: 'Track every brand deal from pitch to payment', icon: '💰', color: 'from-emerald-500 to-teal-500' },
    { title: 'Content Calendar', description: 'Plan, schedule, and never miss a post', icon: '📅', color: 'from-cyan-500 to-blue-500' },
    { title: 'AI Assistant', description: 'Get suggestions, automate tasks, and grow faster', icon: '✨', color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-black/50 to-transparent" aria-label="Features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-block mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs md:text-sm font-medium">
            Features
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-white">
            Everything you need
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-xs md:max-w-2xl mx-auto px-4">
            From analytics to brand deals, we've got your entire creator business covered.
          </p>
        </div>

        {/* Feature Cards Grid - Stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-gray-700/50 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-900/80 transition-all group"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg bg-gradient-to-br ${feature.color} mb-4 md:mb-6`}>
                <span className="text-lg md:text-xl lg:text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-emerald-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
