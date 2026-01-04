import RateCalculator from "@/components/tools/RateCalculator";

export default function RateCalculatorPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Know Your Worth
        </h1>
        <p className="mt-4 text-xl text-slate-400">
          Stop guessing. Use our data-backed calculator to determine exactly what you should charge brands for sponsored content.
        </p>
      </div>
      <RateCalculator />
    </div>
  );
}
