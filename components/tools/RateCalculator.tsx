'use client';

import { useState } from 'react';
import { DollarSign, TrendingUp, History, ChevronDown, Info, Sparkles, Crown, ArrowRight, Copy, Link2, Check, Share2, Mail } from 'lucide-react';
import Link from 'next/link';
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

  // New state for viral features
  const [username, setUsername] = useState('');
  const [emailCopied, setEmailCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
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

  // Client-side pitch email generation (no server action needed)
  const handleCopyPitchEmail = async () => {
    if (!result) return;

    const formatFollowers = (num: number) => {
      if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
      return num.toString();
    };

    const nicheDisplay = niche.charAt(0).toUpperCase() + niche.slice(1);
    const platformDisplay = platform.charAt(0).toUpperCase() + platform.slice(1);

    const email = `Subject: Partnership Opportunity - ${username || 'Content Creator'}

Hi [Brand Name],

I'm ${username || 'a content creator'} with ${formatFollowers(followers)} engaged followers on ${platformDisplay}, specializing in ${nicheDisplay} content.

My audience consistently engages at ${engagementRate}% (well above industry average), which means real attention for brand partners.

Based on my reach and engagement metrics, my rates for sponsored content are:

📊 Rate Range: $${result.min.toLocaleString()} - $${result.max.toLocaleString()} per post

${shareLink ? `📎 View my full rate card: ${shareLink}\n` : ''}
I'd love to discuss how we can create authentic, high-performing content for [Brand Name]. Are you open to a quick call this week?

Best,
${username || '[Your Name]'}

---
Rate calculated with LogicLoom`;

    await navigator.clipboard.writeText(email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleGenerateShareLink = async () => {
    if (!result) return;
    setIsGeneratingLink(true);

    // Build query params for static rate card page (GitHub Pages compatible)
    const params = new URLSearchParams({
      username: username || 'creator',
      name: username || 'Creator',
      platform,
      followers: followers.toString(),
      niche,
      engagement: engagementRate.toString(),
      min: result.min.toString(),
      max: result.max.toString(),
    });

    const link = `${window.location.origin}/LogicLoom/rate-card/?${params.toString()}`;
    setShareLink(link);
    await navigator.clipboard.writeText(link);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);

    setIsGeneratingLink(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Main Calculator Card */}
      <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] pointer-events-none" />

        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Brand Rate Calculator</h2>
              <p className="text-sm text-slate-400">Calculate your true market value</p>
            </div>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl transition-all"
          >
            <History className="w-4 h-4" />
            History
          </button>
        </div>

        <form onSubmit={calculateRate} className="space-y-8 relative z-10">
          {/* Platform Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider ml-1">Select Platform</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['instagram', 'tiktok', 'youtube', 'twitter'] as Platform[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlatform(p)}
                  className={`
                    py-4 px-2 rounded-2xl text-sm font-bold transition-all duration-300 border
                    ${platform === p
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25 scale-[1.02]'
                      : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:bg-slate-700/60 hover:text-white hover:border-slate-600'
                    }
                  `}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Followers Input */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider ml-1">Follower Count</label>
              <div className="relative group">
                <input
                  type="number"
                  value={followers || ''}
                  onChange={(e) => setFollowers(Number(e.target.value))}
                  placeholder="e.g. 50,000"
                  className="w-full bg-slate-800/50 border border-slate-700/50 text-white rounded-2xl p-5 pl-5 text-xl font-medium focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                  required
                />
                {followers > 0 && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold">
                    {formatNumber(followers)}
                  </div>
                )}
              </div>
            </div>

            {/* Niche Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider ml-1">Content Niche</label>
              <div className="relative">
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full appearance-none bg-slate-800/50 border border-slate-700/50 text-white rounded-2xl p-5 text-lg font-medium focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all cursor-pointer"
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
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Engagement Rate */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider ml-1">Engagement Rate</label>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${engagementRate > 5 ? 'bg-green-500/20 text-green-400' : engagementRate > 2 ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'
                }`}>
                {engagementRate}% — {engagementRate > 5 ? 'Excellent' : engagementRate > 2 ? 'Good' : 'Low'}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={engagementRate}
              onChange={(e) => setEngagementRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-slate-500 font-medium px-1">
              <span>0%</span>
              <span>5% (High)</span>
              <span>10% (Viral)</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn-rainbow relative group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 font-bold text-lg">
              <TrendingUp className="w-5 h-5" />
              Calculate Market Value
            </span>
            <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </form>

        {/* Result */}
        {result && (
          <div className="mt-10 p-1 rounded-3xl bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-[#0f111a] rounded-[22px] p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-5 pointer-events-none" />

              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">Estimated Value Per Post</span>
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              </div>

              <div className="text-center mb-8 relative z-10">
                <div className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 mb-3 tracking-tight">
                  ${result.min.toLocaleString()} - ${result.max.toLocaleString()}
                </div>
                <p className="text-slate-400 text-sm font-medium">
                  Based on <span className="text-white">{formatNumber(followers)}</span> {platform} followers in <span className="text-white capitalize">{niche}</span>
                </p>
              </div>

              {/* Viral Action Buttons */}
              <div className="space-y-6 pt-6 border-t border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Personalize Your Pitch
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your Name / Handle (e.g. @alex.creates)"
                    className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Copy Pitch Email */}
                  <button
                    onClick={handleCopyPitchEmail}
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 active:scale-95"
                  >
                    {emailCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied to Clipboard!
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        Copy Pitch Email Template
                      </>
                    )}
                  </button>

                  {/* Generate Share Link */}
                  <button
                    onClick={handleGenerateShareLink}
                    disabled={isGeneratingLink}
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl transition-all border border-slate-700 hover:border-slate-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGeneratingLink ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Link...
                      </>
                    ) : linkCopied ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        Link Copied!
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        Share Public Rate Card
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* History Panel */}
      {showHistory && history.length > 0 && (
        <div className="mt-8 glass-card p-6 rounded-3xl animate-in slide-in-from-bottom-4">
          <h3 className="text-lg font-bold text-white mb-4 px-2">Recent Calculations</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {history.slice().reverse().slice(0, 10).map((calc, i) => (
              <div key={calc.id} className="flex items-center justify-between p-4 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-2xl transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <div>
                    <div className="text-sm font-bold text-white capitalize flex items-center gap-2">
                      {calc.platform}
                      <span className="text-xs font-normal text-slate-500">({formatNumber(calc.followers)})</span>
                    </div>
                    <div className="text-xs text-slate-400 capitalize">{calc.niche}</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-green-400 bg-green-500/10 px-3 py-1 rounded-lg border border-green-500/20">
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

