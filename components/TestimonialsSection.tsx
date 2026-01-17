'use client';

export const TestimonialsSection = () => {
  const testimonials = [
    { quote: 'Replaced 5 different tools. The deal pipeline alone is worth 10x the price.', author: 'Alex Chen', role: 'Tech • 250K', avatar: 'A', color: 'bg-rose-500' },
    { quote: 'The rate calculator helped me 3x my brand deals. Finally, data-backed negotiations.', author: 'Maya Jordan', role: 'Lifestyle • $50K+', avatar: 'M', color: 'bg-emerald-500' },
    { quote: 'Clean, fast, powerful. The only creator tool I\'ve actually stuck with.', author: 'Chris Park', role: 'Finance • 180K', avatar: 'C', color: 'bg-amber-500' },
  ];

  return (
    <section className="py-16 md:py-20" aria-label="Testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            <span className="text-white">Loved by </span>
            <span className="text-emerald-400">creators</span>
          </h2>
        </div>

        {/* Testimonials Grid - Stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-gray-700/50 bg-gray-900/50 hover:border-gray-600 transition-all flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3 md:mb-4 text-amber-400 text-base md:text-xl">★★★★★</div>

              {/* Quote */}
              <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6 flex-grow italic leading-relaxed">"{t.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 md:gap-4 pt-3 md:pt-4 border-t border-gray-700/50">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm md:text-lg`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.author}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
