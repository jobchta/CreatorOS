'use client';

import { useState } from 'react';
import {
    Sparkles,
    Copy,
    Check,
    RefreshCw,
    Instagram,
    Youtube,
    Twitter,
    Linkedin,
    Hash,
    Smile,
    Zap,
    Crown
} from 'lucide-react';
import Link from 'next/link';

interface CaptionResult {
    caption: string;
    hashtags: string[];
    emoji: boolean;
}

// Pre-built caption templates by platform and tone
const captionTemplates = {
    instagram: {
        professional: [
            "Here's what I've learned about {topic}: {insight}. Save this post if you found it valuable! 💡",
            "Stop scrolling! This {topic} tip changed everything for me. {insight}. Drop a 🙌 if you agree!",
            "{insight} — that's the key to mastering {topic}. Which part resonates most with you?",
            "The truth about {topic} that nobody talks about: {insight}. Share with someone who needs this!",
            "I spent years figuring out {topic}. Here's the shortcut: {insight}. You're welcome! 😉",
        ],
        casual: [
            "okay but can we talk about {topic} for a sec?? {insight} 🤯",
            "POV: you finally understand {topic}. {insight} ✨",
            "me: *shares {topic} wisdom* also me: {insight} 💀",
            "not me becoming an expert on {topic} at 2am... anyway, {insight}",
            "the way {topic} hits different when you realize {insight} 🙏",
        ],
        inspirational: [
            "Remember: {insight}. Your journey with {topic} is unique, and that's your superpower. 🌟",
            "To everyone struggling with {topic}: {insight}. Keep going, you've got this! 💪",
            "What if I told you that {topic} could change your life? {insight}. Believe in yourself! ✨",
            "The secret to {topic}? {insight}. Start today, not tomorrow. Your future self will thank you. 🙌",
            "Every expert was once a beginner. {insight}. Your {topic} journey starts now! 🚀",
        ],
        humorous: [
            "My therapist: {topic} isn't that deep. Me: {insight} 🤡",
            "nobody: ... absolutely nobody: ... me explaining {topic}: {insight} 💀",
            "when they ask about {topic} and you hit them with: {insight} 😏",
            "tell me you know about {topic} without telling me you know about {topic}. I'll go first: {insight}",
            "{topic} hacks they don't want you to know: {insight}. You're welcome 😂",
        ],
    },
    tiktok: {
        professional: [
            "Here's a {topic} tip that will blow your mind 🤯 {insight} #fyp #tips",
            "POV: You finally understand {topic}. The key? {insight} ✨ #learnontiktok",
            "This {topic} hack saved me hours: {insight} 🙌 Follow for more!",
            "Stop what you're doing! This {topic} insight is gold: {insight} 💰 #viral",
            "Everyone's talking about {topic}. Here's what they're missing: {insight} 👀",
        ],
        casual: [
            "wait this {topic} thing actually works?? {insight} 😭 #fyp",
            "me discovering {topic}: {insight} 🤯 anyone else??",
            "not me becoming obsessed with {topic}... anyway {insight} ✨",
            "the way nobody told me about this {topic} hack: {insight} 💀",
            "okay but {topic} is giving {insight} and I'm here for it 🙏",
        ],
        inspirational: [
            "Your sign to start {topic} today 🌟 {insight} #motivation #fyp",
            "Reminder: {insight}. Your {topic} journey matters ✨ #inspiration",
            "The {topic} glow up nobody saw coming 💪 {insight} #growth",
            "This is permission to pursue {topic}. {insight} 🚀 #dreambig",
            "From struggling with {topic} to thriving. {insight} 🙌 #transformation",
        ],
        humorous: [
            "me explaining {topic} to literally anyone: {insight} 💀 #relatable",
            "the way {topic} has consumed my entire personality. {insight} 🤡",
            "when they doubt your {topic} knowledge: {insight} 😏 #facts",
            "nobody asked but here's my {topic} opinion: {insight} 🙃 #fyp",
            "this is your sign that {topic} isn't that serious. jk. {insight} 😂",
        ],
    },
    twitter: {
        professional: [
            "Hot take on {topic}: {insight}. Agree or disagree?",
            "Thread: Everything you need to know about {topic} 🧵\n\n1/ {insight}",
            "The most underrated {topic} advice: {insight}. RT if this hits different.",
            "Unpopular opinion about {topic}: {insight}. Fight me.",
            "After years in this space, here's what I know about {topic}: {insight}.",
        ],
        casual: [
            "thinking about {topic} again... {insight}",
            "anyway {topic} is the move. {insight}.",
            "me @ {topic}: {insight}. that's it. that's the tweet.",
            "can we normalize talking about {topic}? {insight}",
            "{topic} update: {insight}. ty for coming to my ted talk.",
        ],
        inspirational: [
            "Reminder: {insight}. Don't give up on {topic}.",
            "Your {topic} journey matters. {insight}. Keep going.",
            "The truth about {topic} that changed everything: {insight}.",
            "To everyone working on {topic}: {insight}. You've got this.",
            "What if you succeed at {topic}? {insight}. Think about it.",
        ],
        humorous: [
            "me thinking I understand {topic}: {insight} 🤡",
            "{topic} is either the best or worst thing ever. {insight}. no in between.",
            "not gonna lie, {topic} has me like: {insight}",
            "broke: ignoring {topic}. woke: {insight}.",
            "the {topic} to normal person pipeline is real. {insight}.",
        ],
    },
    linkedin: {
        professional: [
            "I've been thinking about {topic} lately.\n\nHere's what I've learned: {insight}.\n\nWhat's your take? 👇",
            "After 10 years in this industry, here's my honest take on {topic}:\n\n{insight}.\n\nAgree or disagree?",
            "The most important lesson about {topic}:\n\n{insight}.\n\nSave this post for future reference. 🔖",
            "Let's talk about {topic}.\n\n{insight}.\n\nI'd love to hear your experiences in the comments.",
            "Here's a {topic} insight that isn't shared enough:\n\n{insight}.\n\nWho else has experienced this? 🙋‍♂️",
        ],
        casual: [
            "Real talk about {topic}: {insight}.\n\nAnyone else feel this way?",
            "Something I wish I knew earlier about {topic}: {insight}.\n\nWhat would you add?",
            "Unpopular opinion: {topic} — {insight}.\n\nThoughts?",
            "A lesson I keep re-learning about {topic}: {insight}.\n\nWho relates? 🙋",
            "The {topic} conversation we need to have: {insight}.\n\nLet's discuss.",
        ],
        inspirational: [
            "To anyone struggling with {topic}:\n\n{insight}.\n\nYour journey matters. Keep pushing forward. 💪",
            "The {topic} advice I'd give my younger self:\n\n{insight}.\n\nNever stop growing.",
            "Success in {topic} isn't linear.\n\n{insight}.\n\nRemember this on tough days.",
            "What separates good from great in {topic}:\n\n{insight}.\n\nBe relentless.",
            "The {topic} mindset that changed everything:\n\n{insight}.\n\nAdopt it today.",
        ],
        humorous: [
            "Me explaining {topic} at networking events:\n\n{insight}.\n\nNot wrong though 😅",
            "The {topic} experience:\n\nExpectation: Expert mode\nReality: {insight}\n\nWho relates? 😂",
            "Just once, I'd like a {topic} discussion that doesn't end in '{insight}' 🤷‍♂️",
            "My {topic} journey in one sentence: {insight}.\n\nAnd I'd do it again.",
            "Corporate {topic} vs Reality: {insight}.\n\nIYKYK 💼",
        ],
    },
};

const hashtagsByNiche: Record<string, string[]> = {
    lifestyle: ['lifestyle', 'dailylife', 'lifestyleblogger', 'livingmybestlife', 'aesthetic', 'vibes', 'mood', 'dailyinspo', 'lifehacks', 'selfcare'],
    beauty: ['beauty', 'makeup', 'skincare', 'beautytips', 'makeupartist', 'glowup', 'beautyblogger', 'skincareroutine', 'motd', 'beautyhacks'],
    fitness: ['fitness', 'workout', 'gym', 'fitfam', 'health', 'training', 'fitnessmotivation', 'gymlife', 'healthylifestyle', 'gains'],
    tech: ['tech', 'technology', 'coding', 'programming', 'developer', 'innovation', 'ai', 'startup', 'entrepreneur', 'digital'],
    business: ['business', 'entrepreneur', 'success', 'mindset', 'motivation', 'hustle', 'ceo', 'leadership', 'growth', 'strategy'],
    travel: ['travel', 'wanderlust', 'adventure', 'explore', 'travelgram', 'vacation', 'travelphotography', 'instatravel', 'travelblogger', 'trip'],
    food: ['food', 'foodie', 'foodporn', 'instafood', 'cooking', 'recipe', 'homemade', 'foodphotography', 'yummy', 'delicious'],
    fashion: ['fashion', 'style', 'ootd', 'fashionblogger', 'streetstyle', 'outfit', 'fashionstyle', 'trendy', 'fashionista', 'lookoftheday'],
};

export default function CaptionGeneratorPage() {
    const [platform, setPlatform] = useState<'instagram' | 'tiktok' | 'twitter' | 'linkedin'>('instagram');
    const [topic, setTopic] = useState('');
    const [insight, setInsight] = useState('');
    const [tone, setTone] = useState<'professional' | 'casual' | 'inspirational' | 'humorous'>('professional');
    const [niche, setNiche] = useState('lifestyle');
    const [includeHashtags, setIncludeHashtags] = useState(true);
    const [includeEmoji, setIncludeEmoji] = useState(true);
    const [results, setResults] = useState<CaptionResult[]>([]);
    const [copied, setCopied] = useState<number | null>(null);
    const [generating, setGenerating] = useState(false);
    const [usesToday, setUsesToday] = useState(0);

    const maxFreeUses = 5;

    const generateCaptions = () => {
        if (!topic) return;
        if (usesToday >= maxFreeUses) return;

        setGenerating(true);

        // Simulate generation delay
        setTimeout(() => {
            const templates = captionTemplates[platform][tone];
            const hashtags = hashtagsByNiche[niche] || hashtagsByNiche.lifestyle;

            // Generate 5 caption variations
            const generated: CaptionResult[] = templates.map(template => {
                let caption = template
                    .replace(/{topic}/g, topic)
                    .replace(/{insight}/g, insight || 'it all makes sense now');

                return {
                    caption,
                    hashtags: includeHashtags ? hashtags.slice(0, 5).map(h => `#${h}`) : [],
                    emoji: includeEmoji,
                };
            });

            setResults(generated);
            setUsesToday(prev => prev + 1);
            setGenerating(false);
        }, 1500);
    };

    const copyCaption = (index: number) => {
        const result = results[index];
        const fullCaption = result.caption + (result.hashtags.length > 0 ? '\n\n' + result.hashtags.join(' ') : '');

        navigator.clipboard.writeText(fullCaption).then(() => {
            setCopied(index);
            setTimeout(() => setCopied(null), 2000);
        });
    };

    const platformIcons = {
        instagram: Instagram,
        tiktok: () => <span className="text-sm font-bold">TT</span>,
        twitter: Twitter,
        linkedin: Linkedin,
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-950">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        AI-Powered
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">
                        AI Caption Generator
                    </h1>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Generate scroll-stopping captions for any platform in seconds.
                        Tell us your topic and we'll create 5 variations instantly.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Form - 3 columns */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Platform Selection */}
                        <div className="glass-card p-6 rounded-2xl">
                            <label className="block text-sm font-medium text-slate-300 mb-3">Platform</label>
                            <div className="grid grid-cols-4 gap-2">
                                {(['instagram', 'tiktok', 'twitter', 'linkedin'] as const).map((p) => {
                                    const Icon = platformIcons[p];
                                    return (
                                        <button
                                            key={p}
                                            onClick={() => setPlatform(p)}
                                            className={`p-3 rounded-xl flex items-center justify-center transition-all ${platform === p
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                                }`}
                                        >
                                            {typeof Icon === 'function' && Icon.length === 0 ? <Icon /> : <Icon className="w-5 h-5" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Topic Input */}
                        <div className="glass-card p-6 rounded-2xl">
                            <label className="block text-sm font-medium text-slate-300 mb-2">Topic / Subject</label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g., time management, skincare routine"
                                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        {/* Key Insight */}
                        <div className="glass-card p-6 rounded-2xl">
                            <label className="block text-sm font-medium text-slate-300 mb-2">Key Insight / Point (optional)</label>
                            <input
                                type="text"
                                value={insight}
                                onChange={(e) => setInsight(e.target.value)}
                                placeholder="e.g., the 2-minute rule changes everything"
                                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        {/* Tone & Niche */}
                        <div className="glass-card p-6 rounded-2xl space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Tone</label>
                                <select
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value as typeof tone)}
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                                >
                                    <option value="professional">Professional</option>
                                    <option value="casual">Casual / Relatable</option>
                                    <option value="inspirational">Inspirational</option>
                                    <option value="humorous">Humorous / Meme-y</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Niche (for hashtags)</label>
                                <select
                                    value={niche}
                                    onChange={(e) => setNiche(e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                                >
                                    <option value="lifestyle">Lifestyle</option>
                                    <option value="beauty">Beauty / Skincare</option>
                                    <option value="fitness">Fitness / Health</option>
                                    <option value="tech">Tech / Coding</option>
                                    <option value="business">Business / Finance</option>
                                    <option value="travel">Travel</option>
                                    <option value="food">Food / Cooking</option>
                                    <option value="fashion">Fashion</option>
                                </select>
                            </div>

                            {/* Options */}
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={includeHashtags}
                                        onChange={(e) => setIncludeHashtags(e.target.checked)}
                                        className="rounded bg-slate-700 border-slate-600 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="text-sm text-slate-300 flex items-center gap-1">
                                        <Hash className="w-4 h-4" /> Hashtags
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={includeEmoji}
                                        onChange={(e) => setIncludeEmoji(e.target.checked)}
                                        className="rounded bg-slate-700 border-slate-600 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="text-sm text-slate-300 flex items-center gap-1">
                                        <Smile className="w-4 h-4" /> Emojis
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={generateCaptions}
                            disabled={!topic || generating || usesToday >= maxFreeUses}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {generating ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Generate Captions
                                </>
                            )}
                        </button>

                        {/* Usage Counter */}
                        <div className="text-center text-sm text-slate-400">
                            {usesToday}/{maxFreeUses} free generations today
                            {usesToday >= maxFreeUses && (
                                <Link href="/pricing" className="block text-indigo-400 hover:text-indigo-300 mt-2">
                                    Upgrade for unlimited →
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Results - 3 columns */}
                    <div className="lg:col-span-3">
                        {results.length > 0 ? (
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-amber-400" />
                                    Generated Captions
                                </h2>
                                {results.map((result, index) => (
                                    <div
                                        key={index}
                                        className="glass-card p-5 rounded-xl hover:ring-1 hover:ring-indigo-500/50 transition-all"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-xs text-slate-500">Option {index + 1}</span>
                                            <button
                                                onClick={() => copyCaption(index)}
                                                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-all ${copied === index
                                                        ? 'bg-emerald-500 text-white'
                                                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                                    }`}
                                            >
                                                {copied === index ? (
                                                    <>
                                                        <Check className="w-4 h-4" />
                                                        Copied!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-4 h-4" />
                                                        Copy
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        <p className="text-white whitespace-pre-wrap">{result.caption}</p>
                                        {result.hashtags.length > 0 && (
                                            <div className="mt-3 pt-3 border-t border-slate-700">
                                                <p className="text-sm text-indigo-400">{result.hashtags.join(' ')}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="glass-card p-12 rounded-2xl text-center">
                                <Sparkles className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                                <p className="text-slate-400">
                                    Enter a topic and click generate to see your captions here
                                </p>
                            </div>
                        )}

                        {/* Pro Upgrade */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20">
                            <div className="flex items-start gap-3">
                                <Crown className="w-5 h-5 text-amber-400 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-amber-400">Unlock unlimited captions</p>
                                    <p className="text-xs text-slate-400 mb-2">
                                        Creator plan includes unlimited AI captions, plus custom tone training.
                                    </p>
                                    <Link
                                        href="/pricing"
                                        className="text-xs text-amber-400 hover:text-amber-300 font-medium"
                                    >
                                        View pricing →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
