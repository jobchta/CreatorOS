'use client';

const icons = { '💰': '💰', '👥': '👥', '📱': '📱', '⭐': '⭐' };

export const StatsSection = () => {
  const stats = [
    { icon: '💰', value: '$5M+', label: 'Revenue tracked' },
    { icon: '👥', value: '12K+', label: 'Creators' },
    { icon: '📱', value: '500K+', label: 'Posts scheduled' },
    { icon: '⭐', value: '4.9★', label: 'Average rating' },
  ];

  return (
    <section className="py-16 border-t border-gray-800/50" aria-label="Statistics">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-box p-6 md:p-8 rounded-xl border border-gray-700 bg-gray-900/40 hover:bg-gray-900/60 transition-colors">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
