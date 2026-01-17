'use client';

import { useState } from 'react';
import {
    FileText,
    Download,
    ArrowLeft,
    Sparkles,
    CheckCircle2,
    DollarSign,
    TrendingUp,
    MessageSquare,
    Target,
    Crown,
    Zap
} from 'lucide-react';
import Link from 'next/link';

interface ReportData {
    platform: string;
    followers: number;
    niche: string;
    engagementRate: number;
    minRate: number;
    maxRate: number;
}

// Negotiation scripts based on scenarios
const negotiationScripts = {
    initialPitch: `Hi [Brand Name],

Thank you for reaching out about a potential collaboration! I'm excited about the opportunity to work together.

Based on my audience demographics and engagement rates, my standard rate for [Content Type] is $[YOUR_RATE]. This includes:
• One [platform] post with [X] deliverables
• Usage rights for [time period]
• [Number] rounds of revisions

I'm happy to discuss package deals or alternative arrangements that work for both of us.

Looking forward to your thoughts!

Best,
[Your Name]`,

    counterOffer: `Thank you for the offer of $[THEIR_RATE]. I appreciate you considering me for this campaign.

To provide context, my rates are based on:
• My [X]% engagement rate (above industry average of 2%)
• My audience demographics in [niche] with [X]% in your target age range
• Past campaign performance with [X]% conversion rates

I'd be comfortable at $[YOUR_COUNTER] for this scope. Alternatively, we could adjust the deliverables to fit your budget.

Would either option work for you?`,

    holdingFirm: `I understand budget constraints are always a factor. However, my rates reflect the value and ROI I bring to partnerships.

Some data points to consider:
• My last 3 brand campaigns achieved [X]% engagement
• [X]% of my followers have purchased products I've recommended
• My content drives an average of [X] link clicks per post

I'm confident this partnership would deliver strong results at my quoted rate. I'd love to make this work—let me know if there's flexibility on your end.`,

    walkingAway: `Thank you for considering me for this opportunity. Unfortunately, $[THEIR_RATE] is below my minimum rate for this type of content.

I have to be selective about partnerships to maintain the authentic relationship I have with my audience. 

If your budget changes in the future, I'd love to revisit this conversation. Wishing you success with the campaign!

Best,
[Your Name]`
};

// Content type rate multipliers
const contentMultipliers = {
    instagram: {
        'Feed Post': 1.0,
        'Reel': 1.5,
        'Story (3 frames)': 0.5,
        'Carousel': 1.2,
        'Live Stream (30 min)': 2.0,
    },
    tiktok: {
        'Video (15-60s)': 1.0,
        'Video (1-3 min)': 1.3,
        'Live Stream (30 min)': 1.8,
        'Series (3 videos)': 2.5,
    },
    youtube: {
        'Integration (30-60s)': 0.7,
        'Dedicated Video': 1.5,
        'Short': 0.4,
        'Live Stream': 1.2,
    },
    twitter: {
        'Tweet': 0.5,
        'Thread (5+ tweets)': 1.0,
        'Video Tweet': 0.8,
    }
};

export default function PremiumRateReportPage() {
    const [reportData, setReportData] = useState<ReportData | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showReport, setShowReport] = useState(false);

    // Form state
    const [platform, setPlatform] = useState('instagram');
    const [followers, setFollowers] = useState(50000);
    const [niche, setNiche] = useState('lifestyle');
    const [engagementRate, setEngagementRate] = useState(3.5);

    // Platform base rates
    const platformRates: Record<string, number> = {
        instagram: 10,
        tiktok: 8,
        youtube: 20,
        twitter: 5,
    };

    // Niche multipliers
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

    const calculateRates = () => {
        const baseRate = platformRates[platform] || 10;
        const base = (followers / 1000) * baseRate;
        const nicheMultiplier = nicheMultipliers[niche] || 1;

        let engagementBonus = 1;
        if (engagementRate > 5) engagementBonus = 1.3;
        else if (engagementRate > 3) engagementBonus = 1.15;
        else if (engagementRate < 1) engagementBonus = 0.7;

        const estimated = base * nicheMultiplier * engagementBonus;

        return {
            min: Math.floor(estimated * 0.8),
            max: Math.ceil(estimated * 1.3),
        };
    };

    const generateReport = () => {
        setIsGenerating(true);
        const rates = calculateRates();

        setTimeout(() => {
            setReportData({
                platform,
                followers,
                niche,
                engagementRate,
                minRate: rates.min,
                maxRate: rates.max,
            });
            setShowReport(true);
            setIsGenerating(false);
        }, 1500);
    };

    const downloadAsPDF = () => {
        // Create printable version and trigger print dialog
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const content = document.getElementById('report-content');
        if (!content) return;

        printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Premium Rate Report - LogicLoom</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              padding: 40px;
              color: #1a1a2e;
              line-height: 1.6;
            }
            .header { 
              text-align: center; 
              margin-bottom: 40px;
              padding-bottom: 20px;
              border-bottom: 2px solid #eee;
            }
            .logo { font-size: 24px; font-weight: bold; color: #6366f1; }
            h1 { font-size: 28px; margin: 10px 0; }
            h2 { font-size: 20px; margin: 30px 0 15px; color: #6366f1; }
            h3 { font-size: 16px; margin: 20px 0 10px; }
            .rate-box {
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
              color: white;
              padding: 30px;
              border-radius: 12px;
              text-align: center;
              margin: 20px 0;
            }
            .rate-value { font-size: 36px; font-weight: bold; }
            .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0; }
            .stat-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; }
            .stat-value { font-size: 24px; font-weight: bold; color: #6366f1; }
            .stat-label { font-size: 12px; color: #666; margin-top: 5px; }
            .content-rates { margin: 20px 0; }
            .content-rate-row { 
              display: flex; 
              justify-content: space-between; 
              padding: 12px 0;
              border-bottom: 1px solid #eee;
            }
            .script-box {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin: 15px 0;
              white-space: pre-wrap;
              font-size: 13px;
            }
            .script-title { font-weight: bold; color: #6366f1; margin-bottom: 10px; }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid #eee;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
            @media print {
              body { padding: 20px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">LogicLoom</div>
            <h1>Premium Rate Report</h1>
            <p>Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div class="rate-box">
            <div>Your Recommended Rate Range</div>
            <div class="rate-value">$${reportData?.minRate.toLocaleString()} - $${reportData?.maxRate.toLocaleString()}</div>
            <div>per sponsored post</div>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">${formatNumber(reportData?.followers || 0)}</div>
              <div class="stat-label">Followers</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${reportData?.engagementRate.toFixed(1)}%</div>
              <div class="stat-label">Engagement Rate</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${nicheMultipliers[reportData?.niche || 'lifestyle']}x</div>
              <div class="stat-label">Niche Multiplier</div>
            </div>
          </div>

          <h2>📊 Rate by Content Type</h2>
          <div class="content-rates">
            ${Object.entries(contentMultipliers[reportData?.platform as keyof typeof contentMultipliers] || {})
                .map(([type, multiplier]) => `
                <div class="content-rate-row">
                  <span>${type}</span>
                  <strong>$${Math.round((reportData?.minRate || 0) * multiplier).toLocaleString()} - $${Math.round((reportData?.maxRate || 0) * multiplier).toLocaleString()}</strong>
                </div>
              `).join('')}
          </div>

          <h2>💬 Negotiation Scripts</h2>
          
          <h3>Initial Pitch Template</h3>
          <div class="script-box">${negotiationScripts.initialPitch.replace(/\[YOUR_RATE\]/g, `${reportData?.minRate}-${reportData?.maxRate}`)}</div>

          <h3>Counter Offer Response</h3>
          <div class="script-box">${negotiationScripts.counterOffer.replace(/\[YOUR_COUNTER\]/g, String(reportData?.minRate))}</div>

          <h3>Holding Firm on Your Rate</h3>
          <div class="script-box">${negotiationScripts.holdingFirm}</div>

          <h3>Walking Away Gracefully</h3>
          <div class="script-box">${negotiationScripts.walkingAway}</div>

          <h2>🎯 Pro Tips for Negotiation</h2>
          <ul style="padding-left: 20px; margin: 15px 0;">
            <li>Always respond within 24-48 hours to show professionalism</li>
            <li>Ask for the budget range before quoting your rate</li>
            <li>Emphasize ROI and past campaign results</li>
            <li>Consider package deals for multiple deliverables</li>
            <li>Get contracts in writing before starting work</li>
            <li>Request 50% upfront for new brand relationships</li>
          </ul>

          <div class="footer">
            <p>Generated by LogicLoom - The Creator Business OS</p>
            <p>jobchta.github.io/LogicLoom</p>
          </div>
        </body>
      </html>
    `);

        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 500);
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    if (showReport && reportData) {
        return (
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-950">
                <div className="max-w-4xl mx-auto">
                    {/* Back button */}
                    <button
                        onClick={() => setShowReport(false)}
                        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Calculator
                    </button>

                    {/* Report Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 text-sm font-medium mb-4">
                            <Crown className="w-4 h-4" />
                            Premium Rate Report
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Your Personalized Rate Analysis</h1>
                        <p className="text-slate-400">Data-backed rates with negotiation scripts</p>
                    </div>

                    {/* Report Content */}
                    <div id="report-content" className="space-y-8">
                        {/* Main Rate Card */}
                        <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
                            <div className="text-center">
                                <p className="text-slate-400 mb-2">Your Recommended Rate Range</p>
                                <div className="text-5xl font-bold gradient-text mb-4">
                                    ${reportData.minRate.toLocaleString()} - ${reportData.maxRate.toLocaleString()}
                                </div>
                                <p className="text-sm text-slate-500">
                                    Based on {formatNumber(reportData.followers)} {reportData.platform} followers in {reportData.niche}
                                </p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="glass-card p-6 rounded-xl text-center">
                                <div className="text-2xl font-bold text-white">{formatNumber(reportData.followers)}</div>
                                <div className="text-sm text-slate-400">Followers</div>
                            </div>
                            <div className="glass-card p-6 rounded-xl text-center">
                                <div className="text-2xl font-bold text-emerald-400">{reportData.engagementRate.toFixed(1)}%</div>
                                <div className="text-sm text-slate-400">Engagement</div>
                            </div>
                            <div className="glass-card p-6 rounded-xl text-center">
                                <div className="text-2xl font-bold text-purple-400">{nicheMultipliers[reportData.niche]}x</div>
                                <div className="text-sm text-slate-400">Niche Bonus</div>
                            </div>
                        </div>

                        {/* Content Type Rates */}
                        <div className="glass-card p-6 rounded-2xl">
                            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-emerald-400" />
                                Rate by Content Type
                            </h2>
                            <div className="space-y-3">
                                {Object.entries(contentMultipliers[reportData.platform as keyof typeof contentMultipliers] || {}).map(([type, multiplier]) => (
                                    <div key={type} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                                        <span className="text-slate-300">{type}</span>
                                        <span className="font-semibold text-white">
                                            ${Math.round(reportData.minRate * multiplier).toLocaleString()} - ${Math.round(reportData.maxRate * multiplier).toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Negotiation Scripts */}
                        <div className="glass-card p-6 rounded-2xl">
                            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-blue-400" />
                                Negotiation Scripts
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium text-emerald-400 mb-2">📧 Initial Pitch Template</h3>
                                    <div className="bg-slate-800/50 p-4 rounded-xl">
                                        <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans">
                                            {negotiationScripts.initialPitch.replace(/\[YOUR_RATE\]/g, `$${reportData.minRate}-$${reportData.maxRate}`)}
                                        </pre>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-amber-400 mb-2">💪 Counter Offer Response</h3>
                                    <div className="bg-slate-800/50 p-4 rounded-xl">
                                        <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans">
                                            {negotiationScripts.counterOffer.replace(/\[YOUR_COUNTER\]/g, `$${reportData.minRate}`)}
                                        </pre>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-purple-400 mb-2">🎯 Holding Firm</h3>
                                    <div className="bg-slate-800/50 p-4 rounded-xl">
                                        <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans">
                                            {negotiationScripts.holdingFirm}
                                        </pre>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-rose-400 mb-2">👋 Walking Away Gracefully</h3>
                                    <div className="bg-slate-800/50 p-4 rounded-xl">
                                        <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans">
                                            {negotiationScripts.walkingAway}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pro Tips */}
                        <div className="glass-card p-6 rounded-2xl">
                            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                <Target className="w-5 h-5 text-amber-400" />
                                Pro Negotiation Tips
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    'Always respond within 24-48 hours',
                                    'Ask for the budget range first',
                                    'Emphasize ROI and past results',
                                    'Consider package deals',
                                    'Get contracts in writing',
                                    'Request 50% upfront for new brands',
                                ].map((tip, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                                        <span className="text-slate-300 text-sm">{tip}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Download Button */}
                    <div className="mt-10 flex justify-center">
                        <button
                            onClick={downloadAsPDF}
                            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all"
                        >
                            <Download className="w-5 h-5" />
                            Download PDF Report
                        </button>
                    </div>

                    <p className="text-center text-slate-500 text-sm mt-4">
                        Opens print dialog — save as PDF for best quality
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-950">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 text-sm font-medium mb-4">
                        <Crown className="w-4 h-4" />
                        Premium Feature
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">
                        Premium Rate Report
                    </h1>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Get a comprehensive rate analysis with detailed breakdowns by content type,
                        negotiation scripts, and pro tips to maximize your brand deals.
                    </p>
                </div>

                {/* What's Included */}
                <div className="grid md:grid-cols-2 gap-4 mb-10">
                    {[
                        { icon: DollarSign, title: 'Rate Breakdown', desc: 'By content type (posts, reels, stories, etc.)' },
                        { icon: MessageSquare, title: 'Negotiation Scripts', desc: '4 templates for different scenarios' },
                        { icon: TrendingUp, title: 'Market Comparison', desc: 'How you compare to similar creators' },
                        { icon: Target, title: 'Pro Tips', desc: 'Expert negotiation strategies' },
                    ].map((item, i) => (
                        <div key={i} className="glass-card p-4 rounded-xl flex items-start gap-4">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                                <item.icon className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="font-medium text-white">{item.title}</h3>
                                <p className="text-sm text-slate-400">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Calculator Form */}
                <div className="glass-card p-8 rounded-2xl">
                    <h2 className="text-xl font-semibold text-white mb-6">Enter Your Details</h2>

                    <div className="space-y-6">
                        {/* Platform */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-3">Platform</label>
                            <div className="grid grid-cols-4 gap-2">
                                {['instagram', 'tiktok', 'youtube', 'twitter'].map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => setPlatform(p)}
                                        className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${platform === p
                                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                                            }`}
                                    >
                                        {p.charAt(0).toUpperCase() + p.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Followers */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Follower Count</label>
                            <input
                                type="number"
                                value={followers}
                                onChange={(e) => setFollowers(Number(e.target.value))}
                                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            />
                        </div>

                        {/* Niche */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Niche</label>
                            <select
                                value={niche}
                                onChange={(e) => setNiche(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none cursor-pointer"
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
                        </div>

                        {/* Engagement */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Engagement Rate (%)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={engagementRate}
                                onChange={(e) => setEngagementRate(Number(e.target.value))}
                                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={generateReport}
                        disabled={isGenerating}
                        className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isGenerating ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Generating Report...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Generate Premium Report
                            </>
                        )}
                    </button>

                    {/* Price Note */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-amber-400" />
                            <div>
                                <p className="text-sm font-medium text-amber-400">Currently Free During Beta</p>
                                <p className="text-xs text-slate-400">Premium reports will be $29 after launch</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-8 text-center">
                    <Link href="/tools/rate-calculator" className="text-slate-400 hover:text-white text-sm transition-colors">
                        ← Back to Basic Calculator
                    </Link>
                </div>
            </div>
        </div>
    );
}
