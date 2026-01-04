'use client';

import { useState } from 'react';
import { Activity, Percent, ThumbsUp, MessageCircle } from 'lucide-react';

export default function EngagementAnalyzer() {
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<number>(0);
  const [followers, setFollowers] = useState<number>(0);
  const [result, setResult] = useState<{ rate: string; quality: string; color: string } | null>(null);

  const calculateEngagement = (e: React.FormEvent) => {
    e.preventDefault();
    if (followers === 0) return;

    const totalInteractions = likes + comments;
    const rate = (totalInteractions / followers) * 100;

    let quality = 'Average';
    let color = 'text-yellow-500';

    if (rate > 5) {
      quality = 'Viral / Excellent';
      color = 'text-green-500';
    } else if (rate > 3) {
      quality = 'Good';
      color = 'text-blue-500';
    } else if (rate < 1) {
      quality = 'Low';
      color = 'text-red-500';
    }

    setResult({
      rate: rate.toFixed(2),
      quality,
      color
    });
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg max-w-lg mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Activity className="text-purple-500 w-8 h-8" />
        <h2 className="text-2xl font-bold text-white">Engagement Analyzer</h2>
      </div>

      <form onSubmit={calculateEngagement} className="space-y-4">
        <div>
          <label className="block text-slate-400 text-sm font-medium mb-1">Total Followers</label>
          <input
            type="number"
            value={followers || ''}
            onChange={(e) => setFollowers(Number(e.target.value))}
            placeholder="e.g. 5000"
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-1 flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" /> Likes
            </label>
            <input
              type="number"
              value={likes || ''}
              onChange={(e) => setLikes(Number(e.target.value))}
              placeholder="e.g. 200"
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-1 flex items-center gap-1">
              <MessageCircle className="w-3 h-3" /> Comments
            </label>
            <input
              type="number"
              value={comments || ''}
              onChange={(e) => setComments(Number(e.target.value))}
              placeholder="e.g. 45"
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <Percent className="w-5 h-5" />
          <span>Analyze Engagement</span>
        </button>
      </form>

      {result && (
        <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-4">
          <div className="grid grid-cols-2 gap-4 text-center divide-x divide-slate-700">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Engagement Rate</p>
              <div className="text-3xl font-extrabold text-white">
                {result.rate}%
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Quality Score</p>
              <div className={`text-xl font-bold ${result.color} mt-1`}>
                {result.quality}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
