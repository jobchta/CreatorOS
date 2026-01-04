import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-500">
              LogicLoom
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/tools/rate-calculator" className="hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium">
                  Rate Calculator
                </Link>
                <Link href="/tools/engagement-analyzer" className="hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium">
                  Engagement Analyzer
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link href="#" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
