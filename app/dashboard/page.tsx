'use client';

import { useMemo } from 'react';
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
  Clock,
  ArrowRight,
  Flame,
  Zap,
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

  // Helper for icon boxes
  const IconBox = ({ children, colorClass }: { children: React.ReactNode, colorClass: string }) => {
    const colorMap: Record<string, string> = {
      'icon-coral': 'bg-gradient-to-br from-coral/20 to-rose/10 text-coral',
      'icon-teal': 'bg-gradient-to-br from-teal/20 to-emerald/10 text-teal',
      'icon-amber': 'bg-gradient-to-br from-amber/20 to-orange/10 text-amber',
      'icon-emerald': 'bg-gradient-to-br from-emerald/20 to-lime/10 text-emerald',
      'icon-cyan': 'bg-gradient-to-br from-cyan/20 to-sky/10 text-cyan',
    };

    return (
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden ${colorMap[colorClass] || 'bg-white/10'}`}>
        <div className="absolute inset-0 blur-xl opacity-50 bg-current z-[-1]" />
        {children}
      </div>
    );
  };

  const stats = [
    {
      title: 'Total Followers',
      value: formatNumber(totalFollowers),
      change: '+2,847',
      trend: '+4.3%',
      positive: true,
      icon: <Users className="w-6 h-6" />,
      colorClass: 'icon-coral',
      glowClass: 'shadow-glow-coral',
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
      glowClass: 'shadow-glow-teal',
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
      glowClass: 'shadow-glow-amber',
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
      glowClass: 'shadow-glow-cyan',
      trendColor: 'text-emerald-400 bg-emerald-500/10'
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header with vibrant greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, <span className="bg-gradient-to-br from-coral via-amber via-teal via-cyan to-rose bg-[length:400%_400%] animate-[gradient-flow_8s_ease_infinite] bg-clip-text text-transparent">Creator</span>
          </h1>
          <p className="text-white/40">Here&apos;s what&apos;s happening with your channels today.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-teal/50 outline-none cursor-pointer text-white">
            <option className="bg-bg">Last 7 days</option>
            <option className="bg-bg">Last 30 days</option>
            <option className="bg-bg">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`group bg-glass border border-white/10 backdrop-blur-xl p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/15 ${stat.glowClass}`}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="group-hover:scale-110 transition-transform duration-300">
                 <IconBox colorClass={stat.colorClass}>{stat.icon}</IconBox>
              </div>
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${stat.positive
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-rose-500/10 text-rose-400'
                }`}>
                {stat.positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {stat.trend}
              </div>
            </div>
            <div className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent mb-2">{stat.value}</div>
            <div className="text-sm text-white/40">{stat.title}</div>
            <div className="text-xs text-white/25 mt-1">{stat.change} this week</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Follower Growth */}
        <div className="bg-gradient-to-br from-coral/10 to-white/5 border border-coral/20 rounded-2xl p-6 backdrop-blur-xl hover:border-coral/40 hover:shadow-glow-coral transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <IconBox colorClass="icon-coral">
                <TrendingUp className="w-6 h-6" />
              </IconBox>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Follower Growth</h3>
                <p className="text-sm text-white/40">Across all platforms</p>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-coral bg-coral/10 border border-coral/30 rounded-full backdrop-blur-md hover:bg-coral/20 transition-colors cursor-pointer group">
              View report <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          <FollowerGrowthChart />
        </div>

        {/* Engagement */}
        <div className="bg-gradient-to-br from-teal/10 to-white/5 border border-teal/20 rounded-2xl p-6 backdrop-blur-xl hover:border-teal/40 hover:shadow-glow-teal transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <IconBox colorClass="icon-teal">
                <Flame className="w-6 h-6" />
              </IconBox>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Engagement Rate</h3>
                <p className="text-sm text-white/40">Likes, comments, shares</p>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-teal bg-teal/10 border border-teal/30 rounded-full backdrop-blur-md hover:bg-teal/20 transition-colors cursor-pointer group">
              View report <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          <EngagementChart />
        </div>
      </div>

      {/* Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Content */}
        <div className="bg-gradient-to-br from-amber/10 to-white/5 border border-amber/20 rounded-2xl overflow-hidden backdrop-blur-xl hover:border-amber/40 hover:shadow-glow-amber transition-all duration-300">
          <div className="flex items-center justify-between px-6 py-5 border-b border-amber/10">
            <div className="flex items-center gap-4">
              <IconBox colorClass="icon-amber">
                <Calendar className="w-6 h-6" />
              </IconBox>
              <h3 className="text-lg font-semibold text-white">Upcoming Content</h3>
            </div>
            <Link href="/dashboard/calendar" className="flex items-center gap-1 text-sm font-medium text-amber hover:text-amber/80 transition-colors">
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
                  <p className="text-sm font-medium text-white truncate group-hover:text-amber transition-colors">{post.title}</p>
                  <p className="text-xs text-white/30 flex items-center gap-1.5 mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(post.scheduled_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <span className={`inline-flex items-center gap-2 px-2 py-1 text-xs font-medium rounded-full backdrop-blur-md border border-white/10 ${post.status === 'scripted' ? 'bg-cyan/10 border-cyan/20 text-cyan' :
                  post.status === 'filmed' ? 'bg-emerald/10 border-emerald/20 text-emerald' :
                    'bg-amber/10 border-amber/20 text-amber'
                  }`}>
                  {post.status}
                </span>
              </div>
            )) : (
              <div className="px-6 py-14 text-center">
                <Calendar className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-sm text-white/40 mb-3">No upcoming posts</p>
                <Link href="/dashboard/calendar" className="text-sm text-amber hover:underline">
                  Schedule something →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Active Deals */}
        <div className="bg-gradient-to-br from-emerald/10 to-white/5 border border-emerald/20 rounded-2xl overflow-hidden backdrop-blur-xl hover:border-emerald/40 hover:shadow-glow-emerald transition-all duration-300">
          <div className="flex items-center justify-between px-6 py-5 border-b border-emerald/10">
            <div className="flex items-center gap-4">
              <IconBox colorClass="icon-emerald">
                <Briefcase className="w-6 h-6" />
              </IconBox>
              <h3 className="text-lg font-semibold text-white">Active Deals</h3>
            </div>
            <Link href="/dashboard/deals" className="flex items-center gap-1 text-sm font-medium text-emerald hover:text-emerald/80 transition-colors">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {activeDeals.length > 0 ? activeDeals.map((deal) => (
              <div key={deal.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors group">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden shadow-lg bg-gradient-to-br from-emerald to-teal"
                >
                  {deal.brand_logo ? (
                    <img src={deal.brand_logo} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-bold text-white">{deal.brand_name[0]}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate group-hover:text-emerald transition-colors">{deal.brand_name}</p>
                  <p className="text-xs text-white/30">{deal.deliverables?.length || 0} deliverables</p>
                </div>
                <span className="text-lg font-bold text-emerald">
                  ${deal.deal_value.toLocaleString()}
                </span>
              </div>
            )) : (
              <div className="px-6 py-14 text-center">
                <Briefcase className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-sm text-white/40 mb-3">No active deals</p>
                <Link href="/dashboard/deals" className="text-sm text-emerald hover:underline">
                  Add your first deal →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Schedule post', desc: 'Plan your content', icon: <Calendar className="w-6 h-6" />, href: '/dashboard/calendar', iconClass: 'icon-coral', hoverColor: 'group-hover:text-coral' },
          { label: 'Add deal', desc: 'Track brand partnerships', icon: <DollarSign className="w-6 h-6" />, href: '/dashboard/deals', iconClass: 'icon-emerald', hoverColor: 'group-hover:text-emerald' },
          { label: 'Find collabs', desc: 'Connect with creators', icon: <Users className="w-6 h-6" />, href: '/dashboard/collabs', iconClass: 'icon-cyan', hoverColor: 'group-hover:text-cyan' },
          { label: 'Rate calculator', desc: 'Know your worth', icon: <Zap className="w-6 h-6" />, href: '/tools/rate-calculator', iconClass: 'icon-amber', hoverColor: 'group-hover:text-amber' },
        ].map((action, i) => (
          <Link
            key={i}
            href={action.href}
            className="group bg-surface border border-white/5 p-4 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-white/5 hover:border-white/10 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
               <IconBox colorClass={action.iconClass}>{action.icon}</IconBox>
            </div>
            <div className="flex-1">
              <span className={`font-semibold text-white transition-colors ${action.hoverColor}`}>{action.label}</span>
              <p className="text-xs text-white/30">{action.desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/20 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </Link>
        ))}
      </div>
    </div>
  );
}
