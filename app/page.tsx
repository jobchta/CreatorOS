import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-slate-900 to-slate-950 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            The Business OS for Creators
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Stop Playing Content Creator.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Start Running a Media Business.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400">
            LogicLoom replaces your messy spreadsheets, Notion docs, and 5 different subscription tools with one unified business operating system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/tools/rate-calculator" className="inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all">
              Try Free Tools <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="#" className="inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all border border-slate-700">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="w-full py-20 bg-slate-950 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
              <TrendingUp className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Data-Driven Growth</h3>
              <p className="text-slate-400">
                Stop guessing what works. Unified analytics across Instagram, TikTok, and YouTube in one dashboard.
              </p>
            </div>
            <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
              <ShieldCheck className="w-10 h-10 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Secure Business Logic</h3>
              <p className="text-slate-400">
                Your data is your asset. We provide enterprise-grade tools to manage brand deals, invoices, and payments.
              </p>
            </div>
            <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
              <CheckCircle2 className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Zero AI Gimmicks</h3>
              <p className="text-slate-400">
                We don&apos;t generate fake videos. We give you the real tools to manage your actual business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools Teaser */}
      <section className="w-full py-20 bg-slate-900 border-y border-slate-800 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Free Tools to Get Started</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/tools/rate-calculator" className="group block p-8 bg-slate-950 rounded-2xl border border-slate-800 hover:border-blue-500 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Rate Calculator</h3>
              <p className="text-slate-400">Calculate exactly how much you should charge brands for sponsored posts.</p>
            </Link>
            <Link href="/tools/engagement-analyzer" className="group block p-8 bg-slate-950 rounded-2xl border border-slate-800 hover:border-purple-500 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Engagement Analyzer</h3>
              <p className="text-slate-400">Check the health of your account and spot fake followers or viral potential.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
