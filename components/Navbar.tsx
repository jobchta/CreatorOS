'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
                <Link href="/pricing" className="hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium">
                  Pricing
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center gap-4 md:ml-6">
              <Link href="/login" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Sign In
              </Link>
              <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/tools/rate-calculator" className="text-slate-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Rate Calculator
            </Link>
            <Link href="/tools/engagement-analyzer" className="text-slate-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Engagement Analyzer
            </Link>
            <Link href="/pricing" className="text-slate-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Pricing
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-slate-700">
            <div className="px-5 space-y-3">
              <Link href="/login" className="block w-full text-center text-slate-300 hover:text-white px-3 py-2 rounded-md text-base font-medium bg-slate-800">
                Sign In
              </Link>
              <Link href="/signup" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
