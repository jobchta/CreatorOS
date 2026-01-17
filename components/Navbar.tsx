'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add glass effect only when scrolled
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/5 py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              <span className="text-white">Logic</span>
              <span className="text-gradient-vibrant">Loom</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-1">
                <NavLink href="/simulator">Simulator</NavLink>
                <NavLink href="/tools/rate-calculator">Rate Calculator</NavLink>
                <NavLink href="/pricing">Pricing</NavLink>
              </div>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="btn-teal !py-2 !px-5 !text-sm !rounded-lg hover:shadow-lg hover:shadow-teal-500/20"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-300 hover:text-white transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass border-b border-white/10 animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <MobileNavLink href="/tools/rate-calculator">Rate Calculator</MobileNavLink>
            <MobileNavLink href="/tools/engagement-analyzer">Analyzer</MobileNavLink>
            <MobileNavLink href="/pricing">Pricing</MobileNavLink>
            <div className="h-px bg-white/10 my-4" />
            <MobileNavLink href="/login">Sign In</MobileNavLink>
            <Link
              href="/signup"
              className="block w-full text-center btn-teal mt-4"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// Helper Components for clean code
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="block px-3 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
  >
    {children}
  </Link>
);
