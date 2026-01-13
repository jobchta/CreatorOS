'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-glass border-b border-white/5 backdrop-blur-xl py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              <span className="text-white">Logic</span>
              <span className="bg-gradient-to-br from-coral via-amber via-teal via-cyan to-rose bg-[length:400%_400%] animate-[gradient-flow_8s_ease_infinite] bg-clip-text text-transparent">Loom</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-1">
                <NavLink href="/tools/rate-calculator">Rate Calculator</NavLink>
                <NavLink href="/tools/engagement-analyzer">Analyzer</NavLink>
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
            <Button
              href="/signup"
              variant="teal"
              className="!py-2 !px-5 !text-sm !rounded-lg hover:shadow-lg hover:shadow-teal-500/20"
            >
              Get Started
            </Button>
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
        <div className="md:hidden absolute top-full left-0 w-full bg-glass border-b border-white/10 backdrop-blur-xl animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <MobileNavLink href="/tools/rate-calculator">Rate Calculator</MobileNavLink>
            <MobileNavLink href="/tools/engagement-analyzer">Analyzer</MobileNavLink>
            <MobileNavLink href="/pricing">Pricing</MobileNavLink>
            <div className="h-px bg-white/10 my-4" />
            <MobileNavLink href="/login">Sign In</MobileNavLink>
            <Button
              href="/signup"
              variant="teal"
              className="w-full text-center mt-4"
            >
              Get Started
            </Button>
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
