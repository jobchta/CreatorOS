import EngagementAnalyzer from "@/components/tools/EngagementAnalyzer";

export default function EngagementAnalyzerPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Check Your Pulse
        </h1>
        <p className="mt-4 text-xl text-slate-400">
          Vanity metrics lie. Engagement tells the truth. Find out if your audience is actually listening.
        </p>
      </div>
      <EngagementAnalyzer />
    </div>
  );
}
