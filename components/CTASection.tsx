'use client';

export const CTASection = () => {
  return (
    <section className="py-20 border-t border-gray-800/50" aria-label="Call to action">
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to build your <span className="text-emerald-400">empire</span>?</h2>
        <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">Join 12,000+ creators who've transformed their content into real businesses.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105">
            👑 Start building free
          </button>
          <button className="px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-gray-500 hover:bg-white/5 transition-colors">
            Learn More
          </button>
        </div>
        
        <p className="text-gray-500 text-sm mt-6">No credit card required</p>
      </div>
    </section>
  );
};
