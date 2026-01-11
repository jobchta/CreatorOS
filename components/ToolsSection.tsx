export const ToolsSection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12">Power Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-slate-800 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Analytics</h3>
          <p className="text-slate-400">Track your progress with detailed analytics.</p>
        </div>
        <div className="p-6 bg-slate-800 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Automation</h3>
          <p className="text-slate-400">Automate repetitive tasks and save time.</p>
        </div>
        <div className="p-6 bg-slate-800 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Collaboration</h3>
          <p className="text-slate-400">Work together with your team in real-time.</p>
        </div>
      </div>
    </div>
  </section>
);
