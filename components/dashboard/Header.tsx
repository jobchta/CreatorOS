'use client';

import { Bell, Search, Plus, ChevronDown, Command, Sparkles, Wand2, Menu } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-20 border-b border-white/5 bg-black/40 backdrop-blur-xl px-4 md:px-8 flex items-center justify-between relative shrink-0">
      {/* Multi-color subtle glow line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-rose-500/40 to-transparent" />

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 mr-2 text-white/60 hover:text-white"
        onClick={onMenuClick}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Search with teal accent */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-teal-400 transition-colors" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-12 pr-4 md:pr-24 py-3.5 text-sm bg-white/5 border border-white/10 rounded-2xl focus:shadow-lg focus:bg-white/10 transition-all outline-none focus:border-teal-500/50 focus:shadow-teal-500/10 placeholder-white/20"
          />

          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1.5">
            <kbd className="kbd"><Command className="w-3 h-3" /></kbd>
            <kbd className="kbd">K</kbd>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 md:gap-4 ml-2">
        {/* AI button with amber accent - hidden on small mobile */}
        <button className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all group hover:scale-[1.02] bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20">
          <Wand2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span className="hidden lg:inline">AI Assist</span>
        </button>

        {/* New button with rainbow gradient */}
        <button className="btn-rainbow !py-2.5 md:!py-3 !px-3 md:!px-5 text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span className="hidden md:inline">Create</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2.5 md:p-3 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full border-2 border-black animate-pulse bg-rose-500" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 p-1 md:p-2 md:pl-4 rounded-xl md:bg-white/5 md:border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
          <div className="text-right hidden lg:block">
            <div className="text-sm font-medium text-white">Creator</div>
            <div className="text-xs text-white/40">Pro Member</div>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-lg bg-gradient-to-br from-coral-500 via-amber-500 to-teal-500 shadow-coral-500/20">
            C
          </div>
          <ChevronDown className="w-4 h-4 text-white/30 hidden md:block" />
        </button>
      </div>
    </header>
  );
}
