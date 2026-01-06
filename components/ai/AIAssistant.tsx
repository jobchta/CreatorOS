'use client';

import { useState } from 'react';
import { Sparkles, Wand2, RefreshCw, Copy, Check, Zap, TrendingUp, Clock, Hash, Lightbulb } from 'lucide-react';

interface Suggestion {
    id: string;
    type: 'content' | 'caption' | 'hashtags' | 'timing';
    title: string;
    content: string;
    confidence: number;
    reasoning: string;
}

// Simulated AI suggestions based on niche and trends
const generateSuggestions = (niche: string): Suggestion[] => {
    const suggestions: Record<string, Suggestion[]> = {
        tech: [
            { id: '1', type: 'content', title: '🔥 Trending Topic', content: 'Create a "ChatGPT vs Claude vs Gemini" comparison video - this topic is seeing 340% increase in searches', confidence: 92, reasoning: 'Based on Google Trends data and your tech niche audience' },
            { id: '2', type: 'caption', title: '📝 Hook Suggestion', content: '"Everyone is using AI wrong. Here\'s what actually works..." followed by 3 actionable tips', confidence: 87, reasoning: 'Contrarian hooks perform 2.3x better in tech niche' },
            { id: '3', type: 'hashtags', title: '#️⃣ Optimal Tags', content: '#techtok #aihacks #techreview #productivity #coding #developer #innovation', confidence: 85, reasoning: 'Mix of high-reach and niche-specific tags for maximum discovery' },
            { id: '4', type: 'timing', title: '⏰ Best Time Today', content: 'Post at 6:00 PM - Your audience is 47% more active in the next 2 hours', confidence: 94, reasoning: 'Based on your follower activity patterns and timezone distribution' },
        ],
        lifestyle: [
            { id: '1', type: 'content', title: '🔥 Trending Topic', content: '"Everything Shower Routine" videos are viral right now - perfect for your aesthetic', confidence: 89, reasoning: 'This format is seeing 5M+ views consistently in lifestyle niche' },
            { id: '2', type: 'caption', title: '📝 Hook Suggestion', content: '"The one thing I changed in my routine that changed everything..." - build curiosity', confidence: 84, reasoning: 'Mystery hooks drive 3x more watch time' },
            { id: '3', type: 'hashtags', title: '#️⃣ Optimal Tags', content: '#dayinmylife #aesthetic #routine #selfcare #wellness #lifestyle #viral', confidence: 82, reasoning: 'Trending lifestyle tags with good reach-to-competition ratio' },
            { id: '4', type: 'timing', title: '⏰ Best Time Today', content: 'Post at 8:00 PM - Peak engagement window for lifestyle content', confidence: 91, reasoning: 'Evening posts get 52% more saves in your niche' },
        ],
        finance: [
            { id: '1', type: 'content', title: '🔥 Trending Topic', content: '"How I\'d invest $1000 in 2024" format is performing exceptionally well', confidence: 95, reasoning: 'Educational finance content with specific numbers drives high engagement' },
            { id: '2', type: 'caption', title: '📝 Hook Suggestion', content: '"Stop doing this with your money (I learned the hard way)..." - personal story angle', confidence: 88, reasoning: 'Personal finance mistakes content has 4x higher share rate' },
            { id: '3', type: 'hashtags', title: '#️⃣ Optimal Tags', content: '#moneytok #investing #personalfinance #wealth #financialfreedom #stockmarket', confidence: 86, reasoning: 'High-intent tags that attract engaged viewers' },
            { id: '4', type: 'timing', title: '⏰ Best Time Today', content: 'Post at 7:00 AM - Catch your audience during morning commute', confidence: 93, reasoning: 'Finance content performs best in morning hours' },
        ],
    };

    return suggestions[niche] || suggestions.tech;
};

export default function AIAssistant() {
    const [niche, setNiche] = useState('tech');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const generateNewSuggestions = () => {
        setIsLoading(true);
        // Simulate AI processing
        setTimeout(() => {
            setSuggestions(generateSuggestions(niche));
            setIsLoading(false);
        }, 1500);
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'content': return <Lightbulb className="w-4 h-4" />;
            case 'caption': return <Wand2 className="w-4 h-4" />;
            case 'hashtags': return <Hash className="w-4 h-4" />;
            case 'timing': return <Clock className="w-4 h-4" />;
            default: return <Sparkles className="w-4 h-4" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'content': return 'from-orange-500 to-red-500';
            case 'caption': return 'from-purple-500 to-pink-500';
            case 'hashtags': return 'from-blue-500 to-cyan-500';
            case 'timing': return 'from-green-500 to-emerald-500';
            default: return 'from-blue-500 to-purple-500';
        }
    };

    return (
        <div className="glass-card p-6 rounded-2xl border border-purple-500/20">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/30">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white flex items-center gap-2">
                            AI Assistant
                            <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">BETA</span>
                        </h3>
                        <p className="text-xs text-slate-400">Powered by content intelligence</p>
                    </div>
                </div>

                <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="bg-slate-800 border border-slate-700 text-sm text-white rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-purple-500 outline-none"
                >
                    <option value="tech">Tech</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="finance">Finance</option>
                </select>
            </div>

            {/* Generate Button */}
            <button
                onClick={generateNewSuggestions}
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Analyzing trends...
                    </>
                ) : (
                    <>
                        <Zap className="w-5 h-5" />
                        Generate AI Suggestions
                    </>
                )}
            </button>

            {/* Suggestions */}
            {suggestions.length > 0 && (
                <div className="mt-6 space-y-4">
                    {suggestions.map((suggestion) => (
                        <div
                            key={suggestion.id}
                            className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-purple-500/30 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-3 mb-2">
                                <div className="flex items-center gap-2">
                                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${getTypeColor(suggestion.type)}`}>
                                        {getTypeIcon(suggestion.type)}
                                    </div>
                                    <span className="font-semibold text-white">{suggestion.title}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 px-2 py-1 bg-green-500/10 rounded-full">
                                        <TrendingUp className="w-3 h-3 text-green-400" />
                                        <span className="text-xs font-semibold text-green-400">{suggestion.confidence}%</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-slate-200 mb-2">{suggestion.content}</p>
                            <p className="text-xs text-slate-500 mb-3">💡 {suggestion.reasoning}</p>

                            <button
                                onClick={() => copyToClipboard(suggestion.content, suggestion.id)}
                                className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                            >
                                {copiedId === suggestion.id ? (
                                    <>
                                        <Check className="w-3.5 h-3.5" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3.5 h-3.5" />
                                        Copy
                                    </>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {suggestions.length === 0 && !isLoading && (
                <p className="text-center text-slate-500 text-sm mt-6">
                    Click the button above to get AI-powered suggestions based on current trends
                </p>
            )}
        </div>
    );
}
