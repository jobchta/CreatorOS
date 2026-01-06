'use client';

import { useState } from 'react';
import { Activity, Percent, ThumbsUp, MessageCircle, Share2, AlertTriangle, CheckCircle, TrendingUp, Users } from 'lucide-react';

interface AnalysisResult {
  engagementRate: number;
  quality: string;
  qualityColor: string;
  qualityBg: string;
  likesRatio: number;
  commentsRatio: number;
  sharesRatio: number;
  insights: string[];
  fakeFollowerRisk: 'low' | 'medium' | 'high';
  viralPotential: number;
}

export default function EngagementAnalyzer() {
  const [followers, setFollowers] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<number>(0);
  const [shares, setShares] = useState<number>(0);
  const [views, setViews] = useState<number>(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeEngagement = (e: React.FormEvent) => {
    e.preventDefault();
    if (followers === 0) return;

    const totalInteractions = likes + comments + shares;
    const engagementRate = (totalInteractions / followers) * 100;

    // Calculate ratios
    const likesRatio = (likes / followers) * 100;
    const commentsRatio = (comments / followers) * 100;
    const sharesRatio = (shares / followers) * 100;

    // Determine quality
    let quality = 'Average';
    let qualityColor = 'text-yellow-400';
    let qualityBg = 'bg-yellow-500/10';

    if (engagementRate > 6) {
      quality = 'Viral Potential';
      qualityColor = 'text-green-400';
      qualityBg = 'bg-green-500/10';
    } else if (engagementRate > 4) {
      quality = 'Excellent';
      qualityColor = 'text-emerald-400';
      qualityBg = 'bg-emerald-500/10';
    } else if (engagementRate > 2) {
      quality = 'Good';
      qualityColor = 'text-blue-400';
      qualityBg = 'bg-blue-500/10';
    } else if (engagementRate < 1) {
      quality = 'Needs Work';
      qualityColor = 'text-red-400';
      qualityBg = 'bg-red-500/10';
    }

    // Fake follower risk assessment
    let fakeFollowerRisk: 'low' | 'medium' | 'high' = 'low';
    if (engagementRate < 0.5 && followers > 10000) {
      fakeFollowerRisk = 'high';
    } else if (engagementRate < 1 && followers > 50000) {
      fakeFollowerRisk = 'medium';
    }

    // Viral potential (0-100)
    let viralPotential = Math.min(100, engagementRate * 15);
    if (shares > comments) viralPotential += 10;
    if (comments > likes * 0.1) viralPotential += 10;
    viralPotential = Math.min(100, viralPotential);

    // Generate insights
    const insights: string[] = [];

    if (commentsRatio > 0.5) {
      insights.push('🎯 High comment ratio indicates strong community engagement');
    } else if (commentsRatio < 0.1) {
      insights.push('💬 Try asking questions in captions to boost comments');
    }

    if (sharesRatio > 0.2) {
      insights.push('🚀 Great share rate! Your content is highly shareable');
    }

    if (fakeFollowerRisk === 'high') {
      insights.push('⚠️ Low engagement with high followers may indicate inactive or fake followers');
    }

    if (views > 0 && views > followers * 2) {
      insights.push('📈 Views exceed follower count - content is reaching beyond your audience');
    }

    if (engagementRate > 5) {
      insights.push('🔥 Engagement rate is above average - great job with your content!');
    }

    if (insights.length === 0) {
      insights.push('📊 Your engagement is within normal range for your follower count');
    }

    setResult({
      engagementRate: Number(engagementRate.toFixed(2)),
      quality,
      qualityColor,
      qualityBg,
      likesRatio: Number(likesRatio.toFixed(2)),
      commentsRatio: Number(commentsRatio.toFixed(2)),
      sharesRatio: Number(sharesRatio.toFixed(2)),
      insights,
      fakeFollowerRisk,
      viralPotential: Math.round(viralPotential),
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Engagement Analyzer</h2>
            <p className="text-sm text-slate-400">Analyze your content performance</p>
          </div>
        </div>

        <form onSubmit={analyzeEngagement} className="space-y-6">
          {/* Followers */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Users className="w-4 h-4 inline mr-2" />
              Total Followers
            </label>
            <input
              type="number"
              value={followers || ''}
              onChange={(e) => setFollowers(Number(e.target.value))}
              placeholder="e.g. 10000"
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              required
            />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <ThumbsUp className="w-4 h-4 inline mr-2" />
                Avg. Likes
              </label>
              <input
                type="number"
                value={likes || ''}
                onChange={(e) => setLikes(Number(e.target.value))}
                placeholder="e.g. 500"
                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <MessageCircle className="w-4 h-4 inline mr-2" />
                Avg. Comments
              </label>
              <input
                type="number"
                value={comments || ''}
                onChange={(e) => setComments(Number(e.target.value))}
                placeholder="e.g. 50"
                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Share2 className="w-4 h-4 inline mr-2" />
                Avg. Shares
              </label>
              <input
                type="number"
                value={shares || ''}
                onChange={(e) => setShares(Number(e.target.value))}
                placeholder="e.g. 20"
                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Avg. Views (optional)
              </label>
              <input
                type="number"
                value={views || ''}
                onChange={(e) => setViews(Number(e.target.value))}
                placeholder="e.g. 5000"
                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
          >
            <Percent className="w-5 h-5" />
            Analyze Engagement
          </button>
        </form>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4">
            {/* Main Stats */}
            <div className="grid grid-cols-2 gap-4">
              {/* Engagement Rate */}
              <div className={`p-6 rounded-2xl ${result.qualityBg} border border-slate-700`}>
                <p className="text-sm text-slate-400 mb-1">Engagement Rate</p>
                <div className={`text-4xl font-bold ${result.qualityColor}`}>
                  {result.engagementRate}%
                </div>
                <div className={`mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${result.qualityColor} ${result.qualityBg}`}>
                  {result.quality}
                </div>
              </div>

              {/* Viral Potential */}
              <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                <p className="text-sm text-slate-400 mb-1">Viral Potential</p>
                <div className="text-4xl font-bold text-white">{result.viralPotential}%</div>
                <div className="mt-2 w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                    style={{ width: `${result.viralPotential}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Ratio Breakdown */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-800/30 rounded-xl text-center">
                <ThumbsUp className="w-5 h-5 text-pink-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">{result.likesRatio}%</div>
                <div className="text-xs text-slate-500">Likes Ratio</div>
              </div>
              <div className="p-4 bg-slate-800/30 rounded-xl text-center">
                <MessageCircle className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">{result.commentsRatio}%</div>
                <div className="text-xs text-slate-500">Comments Ratio</div>
              </div>
              <div className="p-4 bg-slate-800/30 rounded-xl text-center">
                <Share2 className="w-5 h-5 text-green-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">{result.sharesRatio}%</div>
                <div className="text-xs text-slate-500">Shares Ratio</div>
              </div>
            </div>

            {/* Fake Follower Risk */}
            <div className={`p-4 rounded-xl flex items-center gap-3 ${result.fakeFollowerRisk === 'low'
                ? 'bg-green-500/10 border border-green-500/20'
                : result.fakeFollowerRisk === 'medium'
                  ? 'bg-yellow-500/10 border border-yellow-500/20'
                  : 'bg-red-500/10 border border-red-500/20'
              }`}>
              {result.fakeFollowerRisk === 'low' ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <AlertTriangle className={`w-5 h-5 ${result.fakeFollowerRisk === 'medium' ? 'text-yellow-400' : 'text-red-400'}`} />
              )}
              <div>
                <div className={`font-medium ${result.fakeFollowerRisk === 'low' ? 'text-green-400' :
                    result.fakeFollowerRisk === 'medium' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                  {result.fakeFollowerRisk === 'low'
                    ? 'Healthy Follower Base'
                    : result.fakeFollowerRisk === 'medium'
                      ? 'Moderate Fake Follower Risk'
                      : 'High Fake Follower Risk'}
                </div>
                <p className="text-xs text-slate-400">
                  Based on engagement rate relative to follower count
                </p>
              </div>
            </div>

            {/* Insights */}
            <div className="p-4 bg-slate-800/30 rounded-xl">
              <h4 className="font-medium text-white mb-3">Insights & Recommendations</h4>
              <ul className="space-y-2">
                {result.insights.map((insight, i) => (
                  <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="mt-0.5">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
