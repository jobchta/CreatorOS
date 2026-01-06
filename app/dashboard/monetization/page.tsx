'use client';

import { useAnalytics, useDeals, usePosts, useUser } from '@/lib/hooks/useData';
import { DollarSign, TrendingUp, ShoppingBag, Link2, CreditCard, Package, ExternalLink, BarChart3, Users, Zap } from 'lucide-react';
import Link from 'next/link';

export default function MonetizationPage() {
  const { getTotalPipeline, deals } = useDeals();
  const { user } = useUser();

  // Calculate revenue metrics
  const completedDeals = deals.filter(d => d.status === 'completed' && d.payment_status === 'paid');
  const totalEarned = completedDeals.reduce((sum, d) => sum + d.deal_value, 0);
  const pendingPayments = deals.filter(d => d.status === 'completed' && d.payment_status === 'pending');
  const pendingAmount = pendingPayments.reduce((sum, d) => sum + d.deal_value, 0);
  const pipelineValue = getTotalPipeline();

  const revenueStreams = [
    { name: 'Brand Deals', value: totalEarned, icon: <CreditCard className="w-5 h-5" />, color: 'text-green-400', href: '/dashboard/deals' },
    { name: 'Digital Products', value: 0, icon: <Package className="w-5 h-5" />, color: 'text-purple-400', href: '/dashboard/monetization/store' },
    { name: 'Link-in-Bio', value: 0, icon: <Link2 className="w-5 h-5" />, color: 'text-blue-400', href: '/dashboard/monetization/link-in-bio' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Monetization</h1>
        <p className="text-slate-400">Track your revenue streams and manage your creator business</p>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-sm text-slate-400">Total Earned</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">${totalEarned.toLocaleString()}</div>
          <p className="text-xs text-slate-500">From {completedDeals.length} completed deals</p>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="text-sm text-slate-400">Pending Payments</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">${pendingAmount.toLocaleString()}</div>
          <p className="text-xs text-slate-500">{pendingPayments.length} invoices awaiting payment</p>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <BarChart3 className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm text-slate-400">Pipeline Value</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">${pipelineValue.toLocaleString()}</div>
          <p className="text-xs text-slate-500">Potential revenue from active deals</p>
        </div>
      </div>

      {/* Revenue Streams */}
      <div className="glass-card p-6 rounded-2xl">
        <h2 className="text-lg font-semibold text-white mb-4">Revenue Streams</h2>
        <div className="space-y-3">
          {revenueStreams.map((stream) => (
            <Link
              key={stream.name}
              href={stream.href}
              className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className={stream.color}>{stream.icon}</div>
                <div>
                  <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">{stream.name}</h3>
                  <p className="text-sm text-slate-500">
                    {stream.value > 0 ? `$${stream.value.toLocaleString()} earned` : 'Set up now'}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/dashboard/monetization/store" className="glass-card p-6 rounded-2xl hover:border-purple-500/50 transition-all group">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">Digital Products</h3>
              <p className="text-sm text-slate-400">Sell presets, templates, and ebooks</p>
            </div>
          </div>
          <p className="text-slate-500 text-sm">
            Create and sell digital products to your audience. No inventory, instant delivery.
          </p>
        </Link>

        <Link href="/dashboard/monetization/link-in-bio" className="glass-card p-6 rounded-2xl hover:border-blue-500/50 transition-all group">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600">
              <Link2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">Link-in-Bio</h3>
              <p className="text-sm text-slate-400">Custom landing page for all your links</p>
            </div>
          </div>
          <p className="text-slate-500 text-sm">
            Create a beautiful bio link page to showcase all your content and drive traffic.
          </p>
        </Link>
      </div>
    </div>
  );
}
