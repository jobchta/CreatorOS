'use client';

import { useState, useActionState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, TrendingUp, Zap, Target, Mail, CheckCircle, AlertCircle, Wand2, Copy, Check } from 'lucide-react';
import { runSimulation, type SimulationState } from '@/app/actions/simulate';
import { joinWaitlist, type WaitlistState } from '@/app/actions/waitlist';
import { improveContent, type ImproveState, type ContentVariation } from '@/app/actions/improve';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SimulatorContent() {
    const searchParams = useSearchParams();
    const initialContent = searchParams.get('content') || '';

    // Simulation form state
    const [simState, simAction, simPending] = useActionState<SimulationState | null, FormData>(
        runSimulation,
        null
    );

    // Waitlist form state
    const [waitlistState, waitlistAction, waitlistPending] = useActionState<WaitlistState | null, FormData>(
        joinWaitlist,
        null
    );

    // Improve form state
    const [improveState, improveAction, improvePending] = useActionState<ImproveState | null, FormData>(
        improveContent,
        null
    );

    // Local state
    const [content, setContent] = useState(initialContent);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    // Copy to clipboard
    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        });
    };

    // Score color helper
    const getScoreColor = (score: number): string => {
        if (score >= 80) return 'text-emerald-400';
        if (score >= 60) return 'text-amber-400';
        if (score >= 40) return 'text-orange-400';
        return 'text-red-400';
    };

    // Score gradient helper
    const getScoreGradient = (score: number): string => {
        if (score >= 80) return 'from-emerald-500 to-teal-500';
        if (score >= 60) return 'from-amber-500 to-orange-500';
        if (score >= 40) return 'from-orange-500 to-red-500';
        return 'from-red-500 to-rose-500';
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-4 md:p-8 overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full bg-purple-500/10 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full bg-pink-500/10 blur-3xl" />
            </div>

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-4xl mx-auto pt-8 md:pt-16">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center mb-8 md:mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4 md:mb-6">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-xs md:text-sm font-medium text-purple-300">AI-Powered Analysis</span>
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
                            Viral Content Simulator
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base md:text-lg text-gray-400 max-w-xl mx-auto px-4"
                    >
                        Paste your content and let AI analyze its viral potential. Get actionable insights in seconds.
                    </motion.p>
                </motion.div>

                {/* Simulation Form */}
                <motion.form
                    action={simAction}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-4"
                >
                    {/* Textarea */}
                    <div className="relative">
                        <textarea
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Paste your content here... (tweet, caption, hook, or any text)"
                            className="w-full h-40 md:h-48 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-white text-lg placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                            minLength={10}
                            maxLength={2000}
                            required
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                            {content.length}/2000
                        </div>
                    </div>

                    {/* Error Display */}
                    {simState?.error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                        >
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            {simState.error}
                        </motion.div>
                    )}

                    {/* Buttons Row */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Analyze Button */}
                        <button
                            type="submit"
                            disabled={simPending || content.length < 10}
                            className="flex-1 flex items-center justify-center gap-2 px-8 py-3 md:py-4 h-12 md:h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-pink-500 hover:scale-[1.02] transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {simPending ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Analyzing...</span>
                                </>
                            ) : (
                                <>
                                    <Zap className="w-5 h-5" />
                                    <span>Analyze Content</span>
                                </>
                            )}
                        </button>

                        {/* Make It Viral Button - Only show if we have a result */}
                        {simState?.success && simState.data && (
                            <form action={improveAction} className="flex-1">
                                <input type="hidden" name="content" value={content} />
                                <button
                                    type="submit"
                                    disabled={improvePending}
                                    className="w-full flex items-center justify-center gap-2 px-8 py-3 md:py-4 h-12 md:h-14 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:from-amber-400 hover:to-orange-400 hover:scale-[1.02] transition-all shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {improvePending ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Improving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 className="w-5 h-5" />
                                            <span>✨ Make It Viral</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.form>

                {/* Results Section */}
                <AnimatePresence mode="wait">
                    {simState?.success && simState.data && (
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="mt-8 space-y-6"
                        >
                            {/* Result Card */}
                            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-2xl p-6 md:p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* Score Section */}
                                    <div className="flex flex-col items-center justify-center p-6 bg-gray-900/50 rounded-xl">
                                        <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">Viral Score</div>
                                        <div className={`text-6xl md:text-7xl font-bold ${getScoreColor(simState.data.score)}`}>
                                            {simState.data.score}
                                        </div>
                                        <div className="mt-3 w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${simState.data.score}%` }}
                                                transition={{ duration: 1, ease: 'easeOut' }}
                                                className={`h-full bg-gradient-to-r ${getScoreGradient(simState.data.score)}`}
                                            />
                                        </div>
                                        <div className={`mt-3 px-3 py-1 rounded-full text-xs font-medium border ${simState.data.score >= 70
                                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                                : 'bg-gray-500/10 border-gray-500/30 text-gray-400'
                                            }`}>
                                            {simState.data.score >= 80 ? '🔥 High Viral Potential' :
                                                simState.data.score >= 60 ? '✨ Good Potential' :
                                                    simState.data.score >= 40 ? '📈 Moderate Potential' :
                                                        '💡 Needs Improvement'}
                                        </div>
                                    </div>

                                    {/* Details Section */}
                                    <div className="space-y-4">
                                        {/* Category */}
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-purple-500/10">
                                                <Target className="w-5 h-5 text-purple-400" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase">Category</div>
                                                <div className="font-semibold text-white">{simState.data.category}</div>
                                            </div>
                                        </div>

                                        {/* Reasoning */}
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-pink-500/10 mt-1">
                                                <TrendingUp className="w-5 h-5 text-pink-400" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase mb-1">Analysis</div>
                                                <p className="text-sm text-gray-300 leading-relaxed">
                                                    {simState.data.reasoning}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* AI Variations Section */}
                            {improveState?.success && improveState.variations && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Wand2 className="w-5 h-5 text-amber-400" />
                                        Viral Variations
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        {improveState.variations.map((variation: ContentVariation, index: number) => (
                                            <motion.button
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                onClick={() => copyToClipboard(`${variation.headline}\n\n${variation.body}`, index)}
                                                className="text-left p-5 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-amber-500/50 hover:bg-gray-800/80 transition-all group"
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-xs font-medium px-2 py-1 rounded bg-amber-500/10 text-amber-400">
                                                                Option {index + 1}
                                                            </span>
                                                        </div>
                                                        <h4 className="font-semibold text-white mb-2">{variation.headline}</h4>
                                                        <p className="text-sm text-gray-400 leading-relaxed">{variation.body}</p>
                                                    </div>
                                                    <div className={`p-2 rounded-lg transition-colors ${copiedIndex === index ? 'bg-emerald-500/20' : 'bg-gray-700/50 group-hover:bg-gray-700'
                                                        }`}>
                                                        {copiedIndex === index ? (
                                                            <Check className="w-4 h-4 text-emerald-400" />
                                                        ) : (
                                                            <Copy className="w-4 h-4 text-gray-400" />
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Improve Error */}
                            {improveState?.error && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                                >
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    {improveState.error}
                                </motion.div>
                            )}

                            {/* Waitlist Section - Only show if score > 70 */}
                            {simState.data.score >= 70 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-2xl p-6 md:p-8"
                                >
                                    <div className="flex flex-col md:flex-row items-center gap-6">
                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                                                🚀 Unlock Advanced AI Insights
                                            </h3>
                                            <p className="text-sm text-gray-400">
                                                Your content scored {simState.data.score}! Get detailed optimization tips, competitor analysis, and more.
                                            </p>
                                        </div>

                                        {waitlistState?.success ? (
                                            <div className="flex items-center gap-2 text-emerald-400">
                                                <CheckCircle className="w-5 h-5" />
                                                <span className="font-medium">{waitlistState.message}</span>
                                            </div>
                                        ) : (
                                            <form action={waitlistAction} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                                                <input type="hidden" name="score" value={simState.data.score} />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="your@email.com"
                                                    required
                                                    className="w-full sm:w-64 px-4 py-3 h-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 outline-none text-lg"
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={waitlistPending}
                                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 h-12 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all disabled:opacity-50"
                                                >
                                                    {waitlistPending ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Mail className="w-4 h-4" />
                                                    )}
                                                    <span>Join Waitlist</span>
                                                </button>
                                            </form>
                                        )}
                                    </div>

                                    {waitlistState?.error && (
                                        <p className="mt-3 text-sm text-red-400 text-center md:text-left">
                                            {waitlistState.error}
                                        </p>
                                    )}
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-xs text-gray-600 mt-12"
                >
                    Powered by Groq AI • llama3-70b-8192
                </motion.p>
            </div>
        </div>
    );
}

export default function SimulatorPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
            </div>
        }>
            <SimulatorContent />
        </Suspense>
    );
}
