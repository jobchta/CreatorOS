'use client';

import { useState, useMemo, useRef } from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Eye,
  TrendingUp,
  DollarSign,
  Calendar,
  Briefcase,
  ChevronRight,
  Plus,
  Sparkles,
  Zap,
  Clock,
  ArrowRight,
  Play,
  Flame,
  Target
} from 'lucide-react';
import { useAnalytics, useDeals, usePosts } from '@/lib/hooks/useData';
import { FollowerGrowthChart, EngagementChart } from '@/components/dashboard/AnalyticsCharts';
import Link from 'next/link';

export default function DashboardPage() {
  const { getTotalFollowers, getTotalViews, getAvgEngagement } = useAnalytics();
  const { deals, getTotalPipeline } = useDeals();
  const { posts } = usePosts();

  const totalFollowers = useMemo(() => getTotalFollowers(), [getTotalFollowers]);
  const totalViews = useMemo(() => getTotalViews(), [getTotalViews]);
  const avgEngagement = useMemo(() => getAvgEngagement(), [getAvgEngagement]);
  const pipelineValue = useMemo(() => getTotalPipeline(), [getTotalPipeline]);

  const upcomingPosts = useMemo(() => {
    const now = new Date();
    return posts
      .filter(p => new Date(p.scheduled_date) > now && p.status !== 'published')
      .sort((a, b) => new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime())
      .slice(0, 4);
  }, [posts]);

  const activeDeals = useMemo(() => {
    return deals.filter(d => d.status === 'active' || d.status === 'negotiation').slice(0, 4);
  }, [deals]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  // VIBRANT COLOR STATS - Updated to use global classes
  const stats = [
    {
      title: 'Total Followers',
      value: formatNumber(totalFollowers),
      change: '+2,847',
      trend: '+4.3%',
      positive: true,
      icon: <Users className="w-6 h-6" />,
      colorClass: 'icon-coral',
      glowClass: 'glow-coral',
      trendColor: 'text-emerald-400 bg-emerald-500/10'
    },
    {
      title: 'Monthly Views',
      value: formatNumber(totalViews),
      change: '+18,234',
      trend: '+8.1%',
      positive: true,
      icon: <Eye className="w-6 h-6" />,
      colorClass: 'icon-teal',
      glowClass: 'glow-teal',
      trendColor: 'text-emerald-400 bg-emerald-500/10'
    },
    {
      title: 'Engagement',
      value: `${avgEngagement.toFixed(2)}%`,
      change: '+0.12%',
      trend: '+2.1%',
      positive: true,
      icon: <TrendingUp className="w-6 h-6" />,
      colorClass: 'icon-amber',
      glowClass: 'glow-amber',
      trendColor: 'text-emerald-400 bg-emerald-500/10'
    },
    {
      title: 'Deal Pipeline',
      value: `$${formatNumber(pipelineValue)}`,
      change: '+$1,200',
      trend: '+23%',
      positive: true,
      icon: <DollarSign className="w-6 h-6" />,
      colorClass: 'icon-cyan',
      glowClass: 'glow-cyan',
      trendColor: 'text-emerald-400 bg-emerald-500/10'
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header with vibrant greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, <span className="text-gradient-vibrant">Creator</span>
          </h1>
          <p className="text-white/40">Here&apos;s what&apos;s happening with your channels today.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="input-glass px-4 py-3 rounded-xl text-sm focus:border-teal-500/50 outline-none cursor-pointer">
            <option className="bg-zinc-900">Last 7 days</option>
            <option className="bg-zinc-900">Last 30 days</option>
            <option className="bg-zinc-900">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Grid with DIVERSE COLORS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`group glass-card p-5 rounded-2xl hover-scale ${stat.glowClass}`}
          >
            <div className="flex items-center justify-between mb-5">
              <div className={`${stat.colorClass} group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${stat.positive
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-rose-500/10 text-rose-400'
                }`}>
                {stat.positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {stat.trend}
              </div>
            </div>
            <div className="stat-value mb-2">{stat.value}</div>
            <div className="text-sm text-white/40">{stat.title}</div>
            <div className="text-xs text-white/25 mt-1">{stat.change} this week</div>
          </div>
        ))}
      </div>

      {/* Charts Row with improved colors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Follower Growth - CORAL theme */}
        <div className="glass-coral rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="icon-coral">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Follower Growth</h3>
                <p className="text-sm text-white/40">Across all platforms</p>
              </div>
            </div>
            <button className="badge badge-coral hover:bg-coral/20 transition-colors cursor-pointer group">
              View report <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          <FollowerGrowthChart />
        </div>

        {/* Engagement - TEAL theme */}
        <div className="glass-teal rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="icon-teal">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Engagement Rate</h3>
                <p className="text-sm text-white/40">Likes, comments, shares</p>
              </div>
            </div>
            <button className="badge badge-teal hover:bg-teal/20 transition-colors cursor-pointer group">
              View report <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          <EngagementChart />
        </div>
      </div>

      {/* Activity Row with color-coded sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Content - AMBER theme */}
        <div className="glass-amber rounded-2xl overflow-hidden backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 py-5 border-b border-amber-500/10">
            <div className="flex items-center gap-4">
              <div className="icon-amber">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">Upcoming Content</h3>
            </div>
            <Link href="/dashboard/calendar" className="flex items-center gap-1 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {upcomingPosts.length > 0 ? upcomingPosts.map((post) => (
              <div key={post.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors group">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-lg ${post.platform === 'instagram' ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400' :
                  post.platform === 'youtube' ? 'bg-gradient-to-br from-red-500 to-rose-600' :
                    'bg-gradient-to-br from-cyan-400 to-blue-600'
                  }`}>
                  {post.platform[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate group-hover:text-amber-300 transition-colors">{post.title}</p>
                  <p className="text-xs text-white/30 flex items-center gap-1.5 mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(post.scheduled_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <span className={`badge text-xs ${post.status === 'scripted' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300' :
                  post.status === 'filmed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' :
                    'bg-amber-500/10 border-amber-500/20 text-amber-300'
                  }`}>
                  {post.status}
                </span>
              </div>
            )) : (
              <div className="px-6 py-14 text-center">
                <Calendar className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-sm text-white/40 mb-3">No upcoming posts</p>
                <Link href="/dashboard/calendar" className="text-sm text-amber-400 hover:underline">
                  Schedule something →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Active Deals - EMERALD theme */}
        <div className="glass-emerald rounded-2xl overflow-hidden backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 py-5 border-b border-emerald-500/10">
            <div className="flex items-center gap-4">
              <div className="icon-emerald">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">Active Deals</h3>
            </div>
            <Link href="/dashboard/deals" className="flex items-center gap-1 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {activeDeals.length > 0 ? activeDeals.map((deal) => (
              <div key={deal.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors group">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #10b981, #00d9c0)' }}
                >
                  {deal.brand_logo ? (
                    <img src={deal.brand_logo} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-bold text-white">{deal.brand_name[0]}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate group-hover:text-emerald-300 transition-colors">{deal.brand_name}</p>
                  <p className="text-xs text-white/30">{deal.deliverables?.length || 0} deliverables</p>
                </div>
                <span className="text-lg font-bold text-emerald-400">
                  ${deal.deal_value.toLocaleString()}
                </span>
              </div>
            )) : (
              <div className="px-6 py-14 text-center">
                <Briefcase className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-sm text-white/40 mb-3">No active deals</p>
                <Link href="/dashboard/deals" className="text-sm text-emerald-400 hover:underline">
                  Add your first deal →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions with VIBRANT DIVERSE colors */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Schedule post', desc: 'Plan your content', icon: <Calendar className="w-6 h-6" />, href: '/dashboard/calendar', iconClass: 'icon-coral', hoverColor: 'text-coral-400' },
          { label: 'Add deal', desc: 'Track brand partnerships', icon: <DollarSign className="w-6 h-6" />, href: '/dashboard/deals', iconClass: 'icon-emerald', hoverColor: 'text-emerald-400' },
          { label: 'Find collabs', desc: 'Connect with creators', icon: <Users className="w-6 h-6" />, href: '/dashboard/collabs', iconClass: 'icon-cyan', hoverColor: 'text-cyan-400' },
          { label: 'Rate calculator', desc: 'Know your worth', icon: <Zap className="w-6 h-6" />, href: '/tools/rate-calculator', iconClass: 'icon-amber', hoverColor: 'text-amber-400' },
        ].map((action, i) => (
          <Link
            key={i}
            href={action.href}
            className="group bento-item flex items-center gap-4 cursor-pointer rounded-2xl hover:bg-white/5 border border-white/5 p-4"
          >
            <div className={`${action.iconClass} group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
              {action.icon}
            </div>
            <div className="flex-1">
              <span className={`font-semibold text-white group-hover:${action.hoverColor} transition-colors`}>{action.label}</span>
              <p className="text-xs text-white/30">{action.desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/20 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
}
