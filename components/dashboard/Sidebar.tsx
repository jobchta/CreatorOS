'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Briefcase,
  Users,
  DollarSign,
  Settings,
  ChevronRight,
  Sparkles,
  Zap,
  TrendingUp,
  Crown,
  Gift,
  X,
  FileImage,
  AtSign,
  Wand2
} from 'lucide-react';
import { useEffect } from 'react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard, color: '#ff6b6b' },
  { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar, color: '#ffc857' },
  { name: 'Deals', href: '/dashboard/deals', icon: Briefcase, color: '#10b981' },
  { name: 'Collabs', href: '/dashboard/collabs', icon: Users, color: '#22d3ee' },
  { name: 'Monetization', href: '/dashboard/monetization', icon: DollarSign, color: '#00d9c0' },
];

const tools = [
  { name: 'Rate Calculator', href: '/tools/rate-calculator', icon: DollarSign, color: '#10b981' },
  { name: 'Media Kit', href: '/tools/media-kit', icon: FileImage, color: '#8b5cf6' },
  { name: 'AI Captions', href: '/tools/caption-generator', icon: Wand2, color: '#ec4899' },
  { name: 'Email Signature', href: '/tools/email-signature', icon: AtSign, color: '#22d3ee' },
  { name: 'Engagement', href: '/tools/engagement-analyzer', icon: TrendingUp, color: '#ff6b6b' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Close sidebar on route change for mobile
  useEffect(() => {
    if (onClose && window.innerWidth < 768) {
      onClose();
    }
  }, [pathname]);

  return (
    <>
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 h-screen border-r border-white/5 bg-black/95 backdrop-blur-xl flex flex-col relative transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:bg-black/40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        {/* Mobile Close Button */}
        <div className="absolute top-4 right-4 md:hidden z-20">
          <button onClick={onClose} className="p-2 text-white/50 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Multi-color gradient glow at top */}
        <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-b from-rose-500/10 via-teal-500/5 to-transparent" />

        {/* Logo with rainbow gradient */}
        <div className="h-20 px-6 flex items-center border-b border-white/5 relative z-10 shrink-0">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-all bg-gradient-to-br from-coral-500 via-amber-500 to-teal-500 shadow-coral-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">LogicLoom</span>
          </Link>
        </div>

        {/* Navigation with diverse colors */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto relative z-10 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          <div className="mb-3 px-3 text-[11px] font-semibold text-white/30 uppercase tracking-wider">
            Dashboard
          </div>

          {navigation.map((item) => {
            const isActive = pathname === item.href;
            // Map colors to classes roughly
            const activeClass = isActive
              ? item.name === 'Overview' ? 'bg-gradient-to-r from-coral-500/20 to-transparent border-coral-500/30 text-white' :
                item.name === 'Calendar' ? 'bg-gradient-to-r from-amber-500/20 to-transparent border-amber-500/30 text-white' :
                  item.name === 'Deals' ? 'bg-gradient-to-r from-emerald-500/20 to-transparent border-emerald-500/30 text-white' :
                    item.name === 'Collabs' ? 'bg-gradient-to-r from-cyan-500/20 to-transparent border-cyan-500/30 text-white' :
                      'bg-gradient-to-r from-teal-500/20 to-transparent border-teal-500/30 text-white'
              : 'text-white/50 hover:text-white hover:bg-white/5';

            const iconColorClass = isActive ? 'text-white' : 'text-white/40';

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border border-transparent ${activeClass}`}
              >
                <item.icon className={`w-5 h-5 transition-all ${iconColorClass}`} />
                {item.name}
                {isActive && (
                  <div className="ml-auto flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${item.name === 'Overview' ? 'bg-coral-500 shadow-glow-coral' :
                      item.name === 'Calendar' ? 'bg-amber-500 shadow-glow-amber' :
                        item.name === 'Deals' ? 'bg-emerald-500 shadow-glow-emerald' :
                          item.name === 'Collabs' ? 'bg-cyan-500 shadow-glow-cyan' :
                            'bg-teal-500 shadow-glow-teal'
                      }`} />
                  </div>
                )}
              </Link>
            );
          })}

          {/* Tools Section with colors */}
          <div className="pt-8 mt-4 border-t border-white/5">
            <div className="mb-3 px-3 flex items-center gap-2">
              <Gift className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-[11px] font-semibold text-white/30 uppercase tracking-wider">Free Tools</span>
            </div>
            {tools.map((tool) => {
              const isActive = pathname === tool.href;
              return (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className={`group flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all ${isActive
                    ? 'bg-white/5 text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <tool.icon className="w-4 h-4" style={{ color: tool.color }} />
                    <span>{tool.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/20 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Pro upgrade card with rainbow gradient */}
        <div className="mx-4 mb-4 p-5 rounded-2xl border border-amber-500/20 relative overflow-hidden bg-gradient-to-br from-rose-500/10 via-amber-500/10 to-teal-500/10 shrink-0">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl bg-gradient-to-br from-rose-500/20 to-teal-500/20" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-bold text-white">Go Pro</span>
            </div>
            <p className="text-xs text-white/50 mb-4 leading-relaxed">
              Unlock advanced analytics, unlimited deals, and priority support.
            </p>
            <button className="w-full py-2.5 text-sm font-semibold text-white rounded-xl hover:scale-[1.02] transition-all bg-gradient-to-r from-coral-500 via-amber-500 to-teal-500 shadow-lg shadow-coral-500/20">
              Upgrade now
            </button>
          </div>
        </div>

        {/* Settings */}
        <div className="p-4 border-t border-white/5 shrink-0">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all"
          >
            <Settings className="w-5 h-5 text-white/30" />
            Settings
          </Link>
        </div>
      </aside>
    </>
  );
}
