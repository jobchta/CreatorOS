'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Share2, TrendingUp, Users, Sparkles, ExternalLink } from 'lucide-react';
import { Suspense } from 'react';

function RateCardContent() {
    const searchParams = useSearchParams();

    // Extract data from URL query params
    const username = searchParams.get('username') || 'Creator';
    const displayName = searchParams.get('name') || username;
    const platform = searchParams.get('platform') || 'instagram';
    const followers = searchParams.get('followers') || '10000';
    const niche = searchParams.get('niche') || 'lifestyle';
    const engagement = searchParams.get('engagement') || '3.5';
    const rateMin = searchParams.get('min') || '500';
    const rateMax = searchParams.get('max') || '1000';

    const followersNum = parseInt(followers);
    const engagementNum = parseFloat(engagement);
    const minNum = parseInt(rateMin);
    const maxNum = parseInt(rateMax);

    const formatFollowers = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    const getPlatformColor = (p: string) => {
        const colors: Record<string, string> = {
            instagram: 'from-pink-500 to-purple-600',
            tiktok: 'from-cyan-400 to-pink-500',
            youtube: 'from-red-500 to-red-700',
            twitter: 'from-blue-400 to-blue-600',
        };
        return colors[p] || 'from-purple-500 to-pink-500';
    };

    const getNicheEmoji = (n: string) => {
        const emojis: Record<string, string> = {
            finance: '💰', business: '📈', tech: '💻', beauty: '💄',
            fitness: '💪', lifestyle: '✨', entertainment: '🎬', gaming: '🎮',
        };
        return emojis[n] || '⭐';
    };

    const platformColor = getPlatformColor(platform);
    const nicheEmoji = getNicheEmoji(niche);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied!');
    };

    return (
        <div className="min-h-screen bg-slate-950 py-8 px-4 sm:py-16">
            <div className="max-w-2xl mx-auto">
                {/* Back Link */}
                <Link
                    href="/tools/rate-calculator/"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Calculate your rate
                </Link>

                {/* Rate Card */}
                <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 shadow-2xl">
                    {/* Gradient Accent */}
                    <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${platformColor}`} />

                    {/* Header */}
                    <div className="p-6 sm:p-8 pb-0">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${platformColor} flex items-center justify-center`}>
                                    <span className="text-2xl sm:text-3xl font-bold text-white">
                                        {displayName.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-bold text-white">
                                        {displayName}
                                    </h1>
                                    <p className="text-slate-400 text-sm sm:text-base capitalize flex items-center gap-2">
                                        <span>{nicheEmoji}</span>
                                        {niche} Creator
                                    </p>
                                </div>
                            </div>

                            {/* Share Button */}
                            <button
                                onClick={handleShare}
                                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                                title="Copy link"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="p-6 sm:p-8">
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
                                <div className="flex justify-center mb-2">
                                    <Users className="w-5 h-5 text-purple-400" />
                                </div>
                                <div className="text-xl sm:text-2xl font-bold text-white">
                                    {formatFollowers(followersNum)}
                                </div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">Followers</div>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
                                <div className="flex justify-center mb-2">
                                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div className="text-xl sm:text-2xl font-bold text-white">
                                    {engagementNum}%
                                </div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">Engagement</div>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
                                <div className="flex justify-center mb-2">
                                    <Sparkles className="w-5 h-5 text-amber-400" />
                                </div>
                                <div className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${platformColor} bg-clip-text text-transparent capitalize`}>
                                    {platform}
                                </div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">Platform</div>
                            </div>
                        </div>

                        {/* Rate Display */}
                        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 text-center">
                            <p className="text-sm text-slate-400 mb-2 uppercase tracking-wider">Sponsored Post Rate</p>
                            <div className={`text-4xl sm:text-5xl font-extrabold bg-gradient-to-r ${platformColor} bg-clip-text text-transparent`}>
                                ${minNum.toLocaleString()} - ${maxNum.toLocaleString()}
                            </div>
                            <p className="text-xs text-slate-500 mt-3">
                                Based on {formatFollowers(followersNum)} followers × {engagementNum}% engagement
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span>Powered by</span>
                                <Link href="/" className="text-purple-400 hover:text-purple-300 font-medium">
                                    LogicLoom
                                </Link>
                            </div>
                            <Link
                                href="/tools/rate-calculator/"
                                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                            >
                                Create yours
                                <ExternalLink className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function RateCardPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>}>
            <RateCardContent />
        </Suspense>
    );
}
