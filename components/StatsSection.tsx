'use client';

export const StatsSection = () => {
  const stats = [
    { icon: '💰', value: '$5M+', label: 'Revenue tracked' },
    { icon: '👥', value: '12K+', label: 'Creators' },
    { icon: '📱', value: '500K+', label: 'Posts scheduled' },
    { icon: '⭐', value: '4.9★', label: 'Average rating' },
  ];

  return (
    <section className="py-12 md:py-16 border-t border-gray-800/50 bg-black/50" aria-label="Statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 md:p-6 lg:p-8 rounded-xl border border-gray-700/50 bg-gray-900/40 hover:bg-gray-900/60 transition-colors text-center"
            >
              <div className="text-2xl md:text-4xl mb-2 md:mb-3">{stat.icon}</div>
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-emerald-400 mb-1 md:mb-2">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
