import BestTimeCalculator from "@/components/tools/BestTimeCalculator";

export default function BestTimePage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          When Should You Post?
        </h1>
        <p className="mt-4 text-xl text-slate-400">
          Maximize your reach by hitting publish when your audience is most active.
        </p>
      </div>
      <BestTimeCalculator />
    </div>
  );
}
