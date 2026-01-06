'use client';

import { useState, useEffect } from 'react';
import { Trophy, Flame, Star, Zap, Target, Crown, Award, TrendingUp, Calendar, CheckCircle } from 'lucide-react';

interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    progress: number;
    total: number;
    unlocked: boolean;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    xp: number;
}

interface GamificationState {
    level: number;
    xp: number;
    xpToNext: number;
    streak: number;
    longestStreak: number;
    achievements: Achievement[];
}

const ACHIEVEMENTS: Achievement[] = [
    { id: 'first_post', name: 'First Steps', description: 'Schedule your first post', icon: <Calendar className="w-5 h-5" />, progress: 1, total: 1, unlocked: true, rarity: 'common', xp: 50 },
    { id: 'streak_7', name: 'On Fire', description: 'Maintain a 7-day posting streak', icon: <Flame className="w-5 h-5" />, progress: 5, total: 7, unlocked: false, rarity: 'rare', xp: 200 },
    { id: 'first_deal', name: 'Money Maker', description: 'Complete your first brand deal', icon: <Zap className="w-5 h-5" />, progress: 1, total: 1, unlocked: true, rarity: 'rare', xp: 300 },
    { id: 'posts_50', name: 'Content Machine', description: 'Schedule 50 posts', icon: <Target className="w-5 h-5" />, progress: 12, total: 50, unlocked: false, rarity: 'epic', xp: 500 },
    { id: 'pipeline_10k', name: 'Big Leagues', description: 'Have $10K+ in your deal pipeline', icon: <Crown className="w-5 h-5" />, progress: 8600, total: 10000, unlocked: false, rarity: 'legendary', xp: 1000 },
    { id: 'collab_first', name: 'Team Player', description: 'Connect with your first creator', icon: <Award className="w-5 h-5" />, progress: 0, total: 1, unlocked: false, rarity: 'common', xp: 100 },
];

export default function GamificationWidget() {
    const [state, setState] = useState<GamificationState>({
        level: 7,
        xp: 1450,
        xpToNext: 2000,
        streak: 5,
        longestStreak: 12,
        achievements: ACHIEVEMENTS,
    });

    const [showAchievements, setShowAchievements] = useState(false);
    const [animatedXP, setAnimatedXP] = useState(0);

    useEffect(() => {
        // Animate XP bar
        const timer = setTimeout(() => {
            setAnimatedXP(state.xp);
        }, 300);
        return () => clearTimeout(timer);
    }, [state.xp]);

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'from-slate-400 to-slate-600';
            case 'rare': return 'from-blue-400 to-blue-600';
            case 'epic': return 'from-purple-400 to-purple-600';
            case 'legendary': return 'from-yellow-400 to-orange-500';
            default: return 'from-slate-400 to-slate-600';
        }
    };

    const getRarityGlow = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'shadow-slate-500/30';
            case 'rare': return 'shadow-blue-500/50';
            case 'epic': return 'shadow-purple-500/50';
            case 'legendary': return 'shadow-yellow-500/50';
            default: return '';
        }
    };

    const unlockedCount = state.achievements.filter(a => a.unlocked).length;

    return (
        <>
            {/* Floating Widget */}
            <div
                onClick={() => setShowAchievements(true)}
                className="glass-card p-4 rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform border border-purple-500/20 hover:border-purple-500/40"
            >
                <div className="flex items-center gap-4 mb-3">
                    {/* Level Badge */}
                    <div className="relative">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <span className="text-2xl font-black text-white">{state.level}</span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                            <Star className="w-3 h-3 text-yellow-900 fill-yellow-900" />
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold text-white">Level {state.level}</span>
                            <span className="text-xs text-purple-400">{state.xp}/{state.xpToNext} XP</span>
                        </div>
                        {/* XP Bar */}
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${(animatedXP / state.xpToNext) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Streak */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-orange-500/20">
                            <Flame className="w-4 h-4 text-orange-400" />
                        </div>
                        <span className="text-sm text-white font-medium">{state.streak} day streak</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-slate-400">{unlockedCount}/{state.achievements.length}</span>
                    </div>
                </div>
            </div>

            {/* Achievements Modal */}
            {showAchievements && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowAchievements(false)}>
                    <div className="bg-slate-900 rounded-3xl border border-purple-500/30 w-full max-w-lg shadow-2xl shadow-purple-500/10 max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
                        {/* Header */}
                        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/40">
                                    <span className="text-3xl font-black text-white">{state.level}</span>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Creator Pro</h2>
                                    <p className="text-purple-300">{state.xp} / {state.xpToNext} XP to Level {state.level + 1}</p>
                                </div>
                            </div>
                            {/* XP Bar */}
                            <div className="mt-4 h-3 bg-slate-700/50 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full"
                                    style={{ width: `${(state.xp / state.xpToNext) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 p-4 border-b border-slate-800">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-400">{state.streak}</div>
                                <div className="text-xs text-slate-500">Current Streak</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-400">{state.longestStreak}</div>
                                <div className="text-xs text-slate-500">Best Streak</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-400">{unlockedCount}</div>
                                <div className="text-xs text-slate-500">Achievements</div>
                            </div>
                        </div>

                        {/* Achievements List */}
                        <div className="p-4 overflow-y-auto max-h-[40vh]">
                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Achievements</h3>
                            <div className="space-y-3">
                                {state.achievements.map((achievement) => (
                                    <div
                                        key={achievement.id}
                                        className={`p-4 rounded-xl border transition-all ${achievement.unlocked
                                                ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} bg-opacity-10 border-transparent shadow-lg ${getRarityGlow(achievement.rarity)}`
                                                : 'bg-slate-800/50 border-slate-700 opacity-60'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${achievement.unlocked ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)}` : 'bg-slate-700'}`}>
                                                {achievement.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-semibold text-white">{achievement.name}</span>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${achievement.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                                                            achievement.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400' :
                                                                achievement.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                                                                    'bg-slate-500/20 text-slate-400'
                                                        }`}>
                                                        {achievement.rarity}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-400">{achievement.description}</p>
                                                {!achievement.unlocked && (
                                                    <div className="mt-2">
                                                        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                                                            <span>Progress</span>
                                                            <span>{achievement.progress}/{achievement.total}</span>
                                                        </div>
                                                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} rounded-full`}
                                                                style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {achievement.unlocked && (
                                                <CheckCircle className="w-5 h-5 text-green-400" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
