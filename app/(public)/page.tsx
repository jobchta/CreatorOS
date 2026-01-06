'use client';

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, BarChart3, Calendar, DollarSign, Users, Zap, Check, Star, Sparkles, TrendingUp, Play, ChevronRight, MousePointer, Flame, Globe, Rocket, Target, Gift, Crown, Wand2, Menu, X } from "lucide-react";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3D tilt effect for cards
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleCardMouseLeave = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen relative">
      {/* Aurora background with multi-color */}
      <div className="aurora" />

      {/* Floating color orbs */}
      <div className="orb orb-coral orb-delay-1" style={{ top: '10%', left: '10%' }} />
      <div className="orb orb-teal orb-delay-2" style={{ top: '60%', right: '5%' }} />
      <div className="orb orb-amber orb-delay-3" style={{ bottom: '20%', left: '20%' }} />
      <div className="orb orb-emerald orb-delay-4" style={{ top: '30%', right: '15%' }} />

      {/* Grain texture */}
      <div className="grain" />

      {/* Mouse spotlight */}
      {isClient && (
        <div
          className="spotlight"
          style={{ left: mousePos.x, top: mousePos.y }}
        />
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-16">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-coral via-amber to-teal flex items-center justify-center shadow-lg group-hover:shadow-coral/40 transition-shadow" style={{ background: 'linear-gradient(135deg, #ff6b6b, #ffc857, #00d9c0)' }}>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">LogicLoom</span>
            </Link>
            <div className="hidden lg:flex items-center gap-10">
              <Link href="#features" className="link-animated text-sm font-medium">Features</Link>
              <Link href="/tools/rate-calculator" className="link-animated text-sm font-medium">Tools</Link>
              <Link href="#testimonials" className="link-animated text-sm font-medium">Testimonials</Link>
            </div>
          </div>
          {/* Desktop CTA buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link href="/dashboard" className="btn-teal btn-shimmer text-sm !py-2.5 !px-5">
              Start free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {/* Mobile menu button */}
          <button
            className="sm:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden glass border-t border-white/5 py-4 px-4">
            <div className="flex flex-col gap-4">
              <Link href="#features" className="text-white/70 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <Link href="/tools/rate-calculator" className="text-white/70 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Tools</Link>
              <Link href="#testimonials" className="text-white/70 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Testimonials</Link>
              <div className="border-t border-white/10 pt-4 mt-2 flex flex-col gap-3">
                <Link href="/dashboard" className="text-white/70 hover:text-white py-2 text-center">Sign in</Link>
                <Link href="/dashboard" className="btn-teal btn-shimmer text-sm !py-3 !px-5 justify-center">
                  Start free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-20">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge with coral */}
          <div className="reveal delay-100">
            <div className="badge badge-coral mb-6 sm:mb-10 mx-auto text-xs sm:text-sm">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse" style={{ background: '#ff6b6b' }} />
              <span>AI-Powered Creator OS</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Main headline with vibrant gradient */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-8 reveal delay-200 leading-tight">
            <span className="text-shimmer block">Your creator</span>
            <span className="text-gradient-vibrant">empire awaits</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed reveal delay-300 px-2">
            The operating system that turns content creators into
            <span className="text-gradient-cool font-medium" style={{ background: 'linear-gradient(135deg, #00d9c0, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> thriving businesses</span>.
            Analytics. Deals. Calendar. All in one.
          </p>

          {/* CTAs with different colors */}
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center reveal delay-400 px-4">
            <Link href="/dashboard" className="btn-rainbow btn-shimmer text-base sm:text-lg !px-6 sm:!px-8 !py-3 sm:!py-4">
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
              Launch your empire
            </Link>
            <Link href="/tools/rate-calculator" className="btn-ghost text-base sm:text-lg !px-6 sm:!px-8 !py-3 sm:!py-4">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              Free tools
            </Link>
          </div>

          {/* Social proof with varied colors */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 mt-16 sm:mt-20 reveal delay-500">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2 sm:-space-x-3">
                {[
                  { bg: 'linear-gradient(135deg, #ff6b6b, #f43f5e)' },
                  { bg: 'linear-gradient(135deg, #00d9c0, #10b981)' },
                  { bg: 'linear-gradient(135deg, #ffc857, #fb923c)' },
                  { bg: 'linear-gradient(135deg, #22d3ee, #38bdf8)' },
                  { bg: 'linear-gradient(135deg, #10b981, #a3e635)' },
                ].map((style, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-black flex items-center justify-center text-xs font-bold text-white shadow-lg"
                    style={{ background: style.bg }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-white">12,000+</div>
                <div className="text-xs text-white/40">Active creators</div>
              </div>
            </div>
            <div className="hidden sm:block h-8 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" style={{ color: '#ffc857', fill: '#ffc857' }} />
                ))}
              </div>
              <span className="text-sm text-white/60">4.9/5 rating</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 reveal delay-700">
          <div className="flex flex-col items-center gap-2 text-white/30">
            <MousePointer className="w-5 h-5 animate-bounce" />
            <span className="text-xs">Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* Stats Section with diverse colors */}
      <section className="relative py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl sm:rounded-3xl p-2 sm:p-3">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {[
                { value: "$5M+", label: "Revenue tracked", color: "#10b981", icon: <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" /> },
                { value: "12K+", label: "Creators", color: "#ff6b6b", icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" /> },
                { value: "500K+", label: "Posts scheduled", color: "#00d9c0", icon: <Calendar className="w-4 h-4 sm:w-5 sm:h-5" /> },
                { value: "4.9★", label: "Average rating", color: "#ffc857", icon: <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> },
              ].map((stat, i) => (
                <div key={i} className="p-4 sm:p-8 md:p-10 text-center group">
                  <div className="mb-2 sm:mb-3 flex justify-center group-hover:scale-110 transition-transform" style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="text-xl sm:text-3xl font-bold text-white mb-0.5 sm:mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento with COLOR VARIETY */}
      <section id="features" className="relative py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-20">
            <div className="badge badge-teal mb-4 sm:mb-6 mx-auto reveal-scale text-xs sm:text-sm">Features</div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 reveal-scale delay-100">
              <span className="text-gradient-vibrant">Everything you need</span>
            </h2>
            <p className="text-base sm:text-xl text-white/50 max-w-2xl mx-auto reveal-scale delay-200 px-4">
              From analytics to brand deals, we've got your entire creator business covered.
            </p>
          </div>

          {/* 3D Tilt Cards Grid with DIVERSE COLORS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Card 1 - Analytics - CORAL THEME */}
            <div
              ref={card1Ref}
              onMouseMove={(e) => handleCardMouseMove(e, card1Ref)}
              onMouseLeave={() => handleCardMouseLeave(card1Ref)}
              className="lg:col-span-2 card-3d"
              style={{ transition: 'transform 0.1s ease-out' }}
            >
              <div className="glass-coral rounded-3xl p-8 h-full backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="icon-coral">
                    <BarChart3 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Unified Analytics</h3>
                    <p className="text-white/40">All platforms, one beautiful dashboard</p>
                  </div>
                </div>
                {/* Mock chart with coral colors */}
                <div className="h-48 rounded-2xl bg-black/30 border border-white/5 p-6 flex items-end gap-3 relative z-10">
                  {[45, 60, 35, 75, 50, 85, 65, 90, 70, 95, 80, 88].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm transition-all hover:opacity-80"
                      style={{
                        height: `${h}%`,
                        background: `linear-gradient(to top, rgba(255, 107, 107, 0.7), rgba(244, 63, 94, 0.4))`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2 - Deals - EMERALD THEME */}
            <div
              ref={card2Ref}
              onMouseMove={(e) => handleCardMouseMove(e, card2Ref)}
              onMouseLeave={() => handleCardMouseLeave(card2Ref)}
              className="card-3d"
              style={{ transition: 'transform 0.1s ease-out' }}
            >
              <div className="glass-emerald rounded-3xl p-8 h-full backdrop-blur-xl">
                <div className="icon-emerald mb-6 relative z-10">
                  <DollarSign className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 relative z-10">Deal Pipeline</h3>
                <p className="text-white/40 text-sm mb-6 relative z-10">Track every brand deal from pitch to payment</p>

                {/* Mock deals with emerald accents */}
                <div className="space-y-3 relative z-10">
                  {[
                    { name: 'TechCorp', value: '$2,500', status: 'Active' },
                    { name: 'DesignHub', value: '$1,200', status: 'Pending' },
                  ].map((deal, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-black/20 border border-white/5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #10b981, #00d9c0)' }}>
                        {deal.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{deal.name}</div>
                        <div className="text-xs text-white/30">{deal.status}</div>
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#10b981' }}>{deal.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3 - Calendar - CYAN THEME */}
            <div
              ref={card3Ref}
              onMouseMove={(e) => handleCardMouseMove(e, card3Ref)}
              onMouseLeave={() => handleCardMouseLeave(card3Ref)}
              className="lg:col-span-2 card-3d"
              style={{ transition: 'transform 0.1s ease-out' }}
            >
              <div className="glass-cyan rounded-3xl p-8 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="icon-cyan">
                      <Calendar className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Content Calendar</h3>
                      <p className="text-white/40">Plan, schedule, and never miss a post</p>
                    </div>
                  </div>
                </div>

                {/* Mock calendar with cyan highlights */}
                <div className="grid grid-cols-7 gap-2 relative z-10">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="text-center text-xs text-white/30 py-2">{day}</div>
                  ))}
                  {[...Array(28)].map((_, i) => {
                    const hasPost = [2, 5, 8, 12, 15, 19, 22, 26].includes(i);
                    return (
                      <div
                        key={i}
                        className={`aspect-square rounded-xl flex items-center justify-center text-sm transition-all hover:scale-110 ${hasPost
                          ? 'text-white border'
                          : 'bg-white/5 border border-white/5 text-white/30'
                          }`}
                        style={hasPost ? {
                          background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.3), rgba(56, 189, 248, 0.2))',
                          borderColor: 'rgba(34, 211, 238, 0.4)'
                        } : {}}
                      >
                        {i + 1}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Card 4 - AI Assistant - AMBER THEME */}
            <div
              ref={card4Ref}
              onMouseMove={(e) => handleCardMouseMove(e, card4Ref)}
              onMouseLeave={() => handleCardMouseLeave(card4Ref)}
              className="card-3d"
              style={{ transition: 'transform 0.1s ease-out' }}
            >
              <div className="glass-amber rounded-3xl p-8 h-full backdrop-blur-xl">
                <div className="icon-amber mb-6 relative z-10">
                  <Wand2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 relative z-10">AI Assistant</h3>
                <p className="text-white/40 text-sm mb-6 relative z-10">Get suggestions, automate tasks, and grow faster</p>

                {/* AI suggestions */}
                <div className="space-y-3 relative z-10">
                  {[
                    '✨ Post Reels at 7PM for +40% reach',
                    '🔥 Your engagement is up 23% this week',
                    '💰 3 new brand opportunities detected',
                  ].map((tip, i) => (
                    <div key={i} className="p-3 rounded-xl bg-black/20 border border-white/5 text-sm text-white/70">
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools with VIBRANT colors */}
      <section className="relative py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <div className="badge badge-emerald mb-4 sm:mb-6 mx-auto text-xs sm:text-sm">
              <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
              100% Free Forever
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              <span className="text-white">Creator </span>
              <span className="text-gradient-vibrant">Power Tools</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "Rate Calculator",
                desc: "Know exactly what to charge brands based on your metrics.",
                iconBg: "linear-gradient(135deg, #10b981, #00d9c0)",
                cardClass: "glass-teal",
                href: "/tools/rate-calculator"
              },
              {
                title: "Engagement Analyzer",
                desc: "Detect fake followers and find your viral potential.",
                iconBg: "linear-gradient(135deg, #ff6b6b, #f43f5e)",
                cardClass: "glass-coral",
                href: "/tools/engagement-analyzer"
              },
              {
                title: "Best Time to Post",
                desc: "AI-optimized schedule for maximum engagement.",
                iconBg: "linear-gradient(135deg, #ffc857, #fb923c)",
                cardClass: "glass-amber",
                href: "/tools/best-time"
              },
            ].map((tool, i) => (
              <Link key={i} href={tool.href} className={`${tool.cardClass} rounded-2xl sm:rounded-3xl p-6 sm:p-8 group cursor-pointer backdrop-blur-xl glow-border-teal`}>
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform"
                  style={{ background: tool.iconBg }}
                >
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">{tool.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-3 sm:mb-4">{tool.desc}</p>
                <div className="flex items-center gap-2 text-teal-400 text-sm font-medium sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  Try now <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with color accents */}
      <section id="testimonials" className="relative py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">
              <span className="text-white">Loved by </span>
              <span className="text-gradient-vibrant">creators</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { quote: "Replaced 5 different tools. The deal pipeline alone is worth 10x the price.", name: "Alex Chen", role: "Tech • 250K", color: "#ff6b6b" },
              { quote: "The rate calculator helped me 3x my brand deals. Finally, data-backed negotiations.", name: "Maya Jordan", role: "Lifestyle • $50K+", color: "#00d9c0" },
              { quote: "Clean, fast, powerful. The only creator tool I've actually stuck with.", name: "Chris Park", role: "Finance • 180K", color: "#ffc857" },
            ].map((t, i) => (
              <div key={i} className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 hover:border-white/20 transition-colors">
                <div className="flex gap-1 mb-4 sm:mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: t.color, fill: t.color }} />
                  ))}
                </div>
                <p className="text-base sm:text-lg text-white/70 mb-6 sm:mb-8 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm sm:text-base">{t.name}</div>
                      <div className="text-xs sm:text-sm text-white/40">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA with rainbow gradient */}
      <section className="relative py-20 sm:py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
            <span className="text-gradient-vibrant">Ready to build your empire?</span>
          </h2>
          <p className="text-base sm:text-xl text-white/50 mb-8 sm:mb-12 max-w-xl mx-auto px-4">
            Join 12,000+ creators who've transformed their content into real businesses.
          </p>
          <Link href="/dashboard" className="btn-rainbow btn-shimmer text-base sm:text-xl !px-8 sm:!px-14 !py-4 sm:!py-6">
            <Crown className="w-5 h-5 sm:w-6 sm:h-6" />
            Start building free
          </Link>
          <p className="mt-4 sm:mt-6 text-sm text-white/30">No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ff6b6b, #ffc857, #00d9c0)' }}>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="font-semibold text-white text-sm sm:text-base">LogicLoom</span>
          </div>
          <div className="flex items-center gap-6 sm:gap-10 text-xs sm:text-sm text-white/40">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
          </div>
          <div className="text-xs sm:text-sm text-white/30">© 2025 LogicLoom</div>
        </div>
      </footer>
    </div>
  );
}
