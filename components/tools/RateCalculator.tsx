'use client';

import { useState } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

export default function RateCalculator() {
  const [platform, setPlatform] = useState('instagram');
  const [followers, setFollowers] = useState<number>(0);
  const [niche, setNiche] = useState('lifestyle');
  const [estimatedRate, setEstimatedRate] = useState<{ min: number; max: number } | null>(null);

  const calculateRate = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple logic for estimation (based on industry averages)
    // Instagram: $10 per 1000 followers
    // TikTok: $5 per 1000 followers
    // YouTube: $20 per 1000 followers

    let baseRate = 0;
    if (platform === 'instagram') baseRate = 0.01;
    if (platform === 'tiktok') baseRate = 0.005;
    if (platform === 'youtube') baseRate = 0.02;

    // Niche multiplier
    let nicheMultiplier = 1;
    if (niche === 'finance' || niche === 'business') nicheMultiplier = 1.5;
    if (niche === 'tech') nicheMultiplier = 1.3;
    if (niche === 'beauty') nicheMultiplier = 1.2;

    const estimated = followers * baseRate * nicheMultiplier;

    // Range +/- 20%
    setEstimatedRate({
      min: Math.floor(estimated * 0.8),
      max: Math.ceil(estimated * 1.2)
    });
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg max-w-lg mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <DollarSign className="text-green-500 w-8 h-8" />
        <h2 className="text-2xl font-bold text-white">Brand Rate Calculator</h2>
      </div>

      <form onSubmit={calculateRate} className="space-y-4">
        <div>
          <label className="block text-slate-400 text-sm font-medium mb-1">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 text-sm font-medium mb-1">Followers</label>
          <input
            type="number"
            value={followers || ''}
            onChange={(e) => setFollowers(Number(e.target.value))}
            placeholder="e.g. 10000"
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-slate-400 text-sm font-medium mb-1">Niche</label>
          <select
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="lifestyle">Lifestyle / Vlog</option>
            <option value="beauty">Beauty / Fashion</option>
            <option value="tech">Tech / Gaming</option>
            <option value="finance">Finance / Business</option>
            <option value="fitness">Health / Fitness</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <TrendingUp className="w-5 h-5" />
          <span>Calculate Rate</span>
        </button>
      </form>

      {estimatedRate && (
        <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-4">
          <p className="text-slate-400 text-sm text-center mb-1">Estimated Rate per Post</p>
          <div className="text-3xl font-extrabold text-white text-center">
            ${estimatedRate.min} - ${estimatedRate.max}
          </div>
          <p className="text-xs text-slate-500 text-center mt-2">
            *Estimates based on market averages. Actual rates vary by engagement.
          </p>
        </div>
      )}
    </div>
  );
}
