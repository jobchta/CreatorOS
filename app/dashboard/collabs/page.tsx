'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Users, TrendingUp, Star, MessageCircle, Instagram, Youtube, Video, X, Send, Sparkles } from 'lucide-react';
import { useCreators } from '@/lib/hooks/useData';
import { CreatorProfile } from '@/lib/database.types';

export default function CollabsPage() {
  const { creators, filterByNiche, sortByFollowers, sortByEngagement } = useCreators();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'followers' | 'engagement'>('followers');
  const [selectedCreator, setSelectedCreator] = useState<CreatorProfile | null>(null);

  const niches = ['all', 'tech', 'lifestyle', 'finance', 'gaming', 'entertainment', 'education'];

  const filteredCreators = useMemo(() => {
    let result = [...creators];

    // Filter by niche
    if (selectedNiche !== 'all') {
      result = result.filter(c => c.niche.includes(selectedNiche));
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.display_name.toLowerCase().includes(query) ||
        c.bio.toLowerCase().includes(query) ||
        c.niche.some(n => n.toLowerCase().includes(query))
      );
    }

    // Sort
    if (sortBy === 'followers') {
      result.sort((a, b) => b.followers - a.followers);
    } else {
      result.sort((a, b) => b.engagement_rate - a.engagement_rate);
    }

    return result;
  }, [creators, selectedNiche, searchQuery, sortBy]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const getCompatibilityScore = (creator: CreatorProfile) => {
    // Mock compatibility calculation based on niche overlap and engagement
    const baseScore = 60;
    const engagementBonus = creator.engagement_rate > 4 ? 20 : creator.engagement_rate > 2 ? 10 : 0;
    const nicheBonus = creator.niche.includes('tech') || creator.niche.includes('lifestyle') ? 15 : 5;
    return Math.min(100, baseScore + engagementBonus + nicheBonus);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Collab Marketplace</h1>
        <p className="text-slate-400">Find and connect with creators in your niche for collaborations</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search creators..."
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Niche Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          {niches.map((niche) => (
            <button
              key={niche}
              onClick={() => setSelectedNiche(niche)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${selectedNiche === niche
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
            >
              {niche === 'all' ? 'All Niches' : niche}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'followers' | 'engagement')}
          className="bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
        >
          <option value="followers">Sort by Followers</option>
          <option value="engagement">Sort by Engagement</option>
        </select>
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCreators.map((creator) => {
          const compatibility = getCompatibilityScore(creator);

          return (
            <div
              key={creator.id}
              onClick={() => setSelectedCreator(creator)}
              className="glass-card p-6 rounded-2xl cursor-pointer hover:border-blue-500/50 transition-all"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={creator.avatar}
                  alt={creator.display_name}
                  className="w-14 h-14 rounded-xl bg-slate-700"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white truncate">{creator.display_name}</h3>
                    {creator.open_to_collabs && (
                      <span className="shrink-0 w-2 h-2 bg-green-500 rounded-full" title="Open to collabs" />
                    )}
                  </div>
                  <p className="text-sm text-slate-400 truncate">{creator.location}</p>
                </div>
                {/* Compatibility Badge */}
                <div className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold ${compatibility >= 80 ? 'bg-green-500/20 text-green-400' :
                    compatibility >= 60 ? 'bg-blue-500/20 text-blue-400' :
                      'bg-slate-500/20 text-slate-400'
                  }`}>
                  {compatibility}% match
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">{creator.bio}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-lg font-bold text-white">{formatNumber(creator.followers)}</span>
                  </div>
                  <span className="text-xs text-slate-500">Followers</span>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-lg font-bold text-white">{creator.engagement_rate}%</span>
                  </div>
                  <span className="text-xs text-slate-500">Engagement</span>
                </div>
              </div>

              {/* Niches */}
              <div className="flex flex-wrap gap-2 mb-4">
                {creator.niche.slice(0, 3).map((n) => (
                  <span key={n} className="px-2 py-1 bg-slate-800 text-slate-400 rounded-md text-xs capitalize">
                    {n}
                  </span>
                ))}
              </div>

              {/* Action */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCreator(creator);
                }}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Connect
              </button>
            </div>
          );
        })}
      </div>

      {filteredCreators.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No creators found</h3>
          <p className="text-slate-400">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Creator Detail Modal */}
      {selectedCreator && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Cover gradient */}
              <div className="h-24 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-t-2xl" />

              {/* Close button */}
              <button
                onClick={() => setSelectedCreator(null)}
                className="absolute top-4 right-4 p-2 bg-black/40 rounded-full text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Avatar */}
              <img
                src={selectedCreator.avatar}
                alt={selectedCreator.display_name}
                className="absolute left-6 -bottom-10 w-20 h-20 rounded-2xl border-4 border-slate-900 bg-slate-700"
              />
            </div>

            <div className="pt-14 px-6 pb-6">
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-white">{selectedCreator.display_name}</h2>
                  {selectedCreator.open_to_collabs && (
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs">
                      Open to Collabs
                    </span>
                  )}
                </div>
                <p className="text-slate-400">{selectedCreator.location}</p>
              </div>

              {/* Bio */}
              <p className="text-slate-300 mb-6">{selectedCreator.bio}</p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{formatNumber(selectedCreator.followers)}</div>
                  <div className="text-xs text-slate-500">Followers</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">{selectedCreator.engagement_rate}%</div>
                  <div className="text-xs text-slate-500">Engagement</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold gradient-text mb-1">{getCompatibilityScore(selectedCreator)}%</div>
                  <div className="text-xs text-slate-500">Match</div>
                </div>
              </div>

              {/* Niches */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-400 mb-2">Niches</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCreator.niche.map((n) => (
                    <span key={n} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm capitalize">
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rate Card */}
              {selectedCreator.rate_card && Object.keys(selectedCreator.rate_card).length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-slate-400 mb-2">Rate Card</h4>
                  <div className="space-y-2">
                    {Object.entries(selectedCreator.rate_card).map(([type, rate]) => (
                      <div key={type} className="flex items-center justify-between py-2 px-3 bg-slate-800/50 rounded-lg">
                        <span className="text-sm text-slate-300 capitalize">{type.replace('_', ' ')}</span>
                        <span className="text-sm font-semibold text-green-400">${rate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-400 mb-2">Languages</h4>
                <p className="text-slate-300">{selectedCreator.languages.join(', ')}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Collab Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
