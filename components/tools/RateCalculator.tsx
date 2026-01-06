'use client';

import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, History, ChevronDown, Info, Sparkles } from 'lucide-react';
import { useRateHistory } from '@/lib/hooks/useData';
import { Platform } from '@/lib/database.types';

interface RateResult {
  min: number;
  max: number;
  breakdown: {
    base: number;
    nicheMultiplier: number;
    engagementBonus: number;
  };
}

// Industry rate data (CPM - Cost per 1000 followers)
const platformRates = {
  instagram: { base: 10, reel: 15, story: 5 },
  tiktok: { base: 8, video: 12 },
  youtube: { base: 20, short: 8, video: 25 },
  twitter: { base: 5, thread: 8 },
};

const nicheMultipliers: Record<string, number> = {
  finance: 1.8,
  business: 1.6,
  tech: 1.4,
  beauty: 1.3,
  fitness: 1.2,
  lifestyle: 1.0,
  entertainment: 0.9,
  gaming: 1.1,
};

export default function RateCalculator() {
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [followers, setFollowers] = useState<number>(0);
  const [niche, setNiche] = useState('lifestyle');
  const [engagementRate, setEngagementRate] = useState<number>(3.5);
  const [result, setResult] = useState<RateResult | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const { history, addCalculation } = useRateHistory();

  const calculateRate = (e: React.FormEvent) => {
    e.preventDefault();
    if (followers <= 0) return;

    // Base rate from platform
    const baseRate = platformRates[platform]?.base || 10;
    const base = (followers / 1000) * baseRate;

    // Niche multiplier
    const nicheMultiplier = nicheMultipliers[niche] || 1;

    // Engagement bonus (higher engagement = higher rates)
    let engagementBonus = 1;
    if (engagementRate > 5) engagementBonus = 1.3;
    else if (engagementRate > 3) engagementBonus = 1.15;
    else if (engagementRate < 1) engagementBonus = 0.7;

    const estimated = base * nicheMultiplier * engagementBonus;

    const newResult = {
      min: Math.floor(estimated * 0.8),
      max: Math.ceil(estimated * 1.3),
      breakdown: {
        base: Math.round(base),
        nicheMultiplier,
        engagementBonus,
      },
    };

    setResult(newResult);

    // Save to history
    addCalculation({
      user_id: 'demo-user-001',
      platform,
      followers,
      niche,
      engagement_rate: engagementRate,
      estimated_min: newResult.min,
      estimated_max: newResult.max,
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Main Calculator Card */}
      <div className="glass-card p-8 rounded-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Brand Rate Calculator</h2>
              <p className="text-sm text-slate-400">Calculate your sponsored post value</p>
            </div>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <History className="w-4 h-4" />
            History
          </button>
        </div>

        <form onSubmit={calculateRate} className="space-y-6">
          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">Platform</label>
            <div className="grid grid-cols-4 gap-2">
              {(['instagram', 'tiktok', 'youtube', 'twitter'] as Platform[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlatform(p)}
                  className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${platform === p
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Followers Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Follower Count
            </label>
            <div className="relative">
              <input
                type="number"
                value={followers || ''}
                onChange={(e) => setFollowers(Number(e.target.value))}
                placeholder="e.g. 50000"
                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
              {followers > 0 && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {formatNumber(followers)} followers
                </span>
              )}
            </div>
          </div>

          {/* Niche Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Niche</label>
            <div className="relative">
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full appearance-none bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer"
              >
                <option value="lifestyle">Lifestyle / Vlog</option>
                <option value="beauty">Beauty / Fashion</option>
                <option value="tech">Tech / Software</option>
                <option value="finance">Finance / Investing</option>
                <option value="business">Business / Entrepreneurship</option>
                <option value="fitness">Health / Fitness</option>
                <option value="gaming">Gaming / Esports</option>
                <option value="entertainment">Entertainment / Comedy</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
            <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
              <Info className="w-3 h-3" />
              Niche multiplier: {nicheMultipliers[niche]}x (Finance pays highest)
            </p>
          </div>

          {/* Engagement Rate */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Engagement Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={engagementRate}
              onChange={(e) => setEngagementRate(Number(e.target.value))}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${engagementRate > 5 ? 'bg-green-500' : engagementRate > 2 ? 'bg-blue-500' : 'bg-red-500'
                    }`}
                  style={{ width: `${Math.min(engagementRate * 10, 100)}%` }}
                />
              </div>
              <span className={`text-xs font-medium ${engagementRate > 5 ? 'text-green-400' : engagementRate > 2 ? 'text-blue-400' : 'text-red-400'
                }`}>
                {engagementRate > 5 ? 'Excellent' : engagementRate > 2 ? 'Good' : 'Low'}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-5 h-5" />
            Calculate My Rate
          </button>
        </form>

        {/* Result */}
        {result && (
          <div className="mt-8 p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium text-slate-400">Estimated Rate per Post</span>
            </div>

            <div className="text-center mb-6">
              <div className="text-5xl font-extrabold gradient-text mb-2">
                ${result.min.toLocaleString()} - ${result.max.toLocaleString()}
              </div>
              <p className="text-slate-400 text-sm">
                Based on {formatNumber(followers)} {platform} followers in {niche}
              </p>
            </div>

            {/* Rate Breakdown */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
              <div className="text-center">
                <div className="text-lg font-bold text-white">${result.breakdown.base}</div>
                <div className="text-xs text-slate-500">Base Rate</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-400">{result.breakdown.nicheMultiplier}x</div>
                <div className="text-xs text-slate-500">Niche Bonus</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">{result.breakdown.engagementBonus}x</div>
                <div className="text-xs text-slate-500">Engagement</div>
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-500 text-center">
              *Estimates based on 2024 industry data. Actual rates vary by brand, deliverables, and exclusivity.
            </p>
          </div>
        )}
      </div>

      {/* History Panel */}
      {showHistory && history.length > 0 && (
        <div className="mt-6 glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-4">Calculation History</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {history.slice().reverse().slice(0, 10).map((calc, i) => (
              <div key={calc.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-white capitalize">{calc.platform}</span>
                  <span className="mx-2 text-slate-600">•</span>
                  <span className="text-sm text-slate-400">{formatNumber(calc.followers)} followers</span>
                </div>
                <div className="text-sm font-semibold text-green-400">
                  ${calc.estimated_min} - ${calc.estimated_max}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
