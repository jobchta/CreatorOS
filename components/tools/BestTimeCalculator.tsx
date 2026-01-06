'use client';

import { useState } from 'react';
import { Clock, Sun, Moon, Sunrise, CalendarDays, TrendingUp, Instagram, Youtube, Video, Twitter } from 'lucide-react';

type Platform = 'instagram' | 'tiktok' | 'youtube' | 'twitter';
type ContentType = 'post' | 'reel' | 'story' | 'video' | 'short';

interface TimeSlot {
  day: string;
  times: { hour: string; score: number }[];
}

interface Result {
  bestDay: string;
  bestTime: string;
  schedule: TimeSlot[];
  insights: string[];
}

// Platform-specific best posting times data (based on industry research)
const platformData: Record<Platform, { days: Record<string, number[]>; peakHours: number[] }> = {
  instagram: {
    days: {
      Monday: [7, 8, 12, 16, 17],
      Tuesday: [7, 9, 12, 17, 20],
      Wednesday: [7, 11, 13, 17, 21],
      Thursday: [7, 8, 11, 12, 17],
      Friday: [7, 9, 12, 15, 16],
      Saturday: [9, 10, 11, 12],
      Sunday: [10, 11, 12, 19],
    },
    peakHours: [9, 12, 17],
  },
  tiktok: {
    days: {
      Monday: [6, 10, 22],
      Tuesday: [9, 12, 19],
      Wednesday: [7, 8, 23],
      Thursday: [12, 15, 21],
      Friday: [5, 13, 15],
      Saturday: [11, 19, 20],
      Sunday: [7, 8, 16],
    },
    peakHours: [12, 19, 21],
  },
  youtube: {
    days: {
      Monday: [14, 15, 16],
      Tuesday: [14, 15, 16],
      Wednesday: [14, 15, 16],
      Thursday: [12, 15, 16, 17],
      Friday: [12, 15, 16, 17],
      Saturday: [9, 10, 11, 12],
      Sunday: [9, 10, 11, 12],
    },
    peakHours: [14, 15, 16],
  },
  twitter: {
    days: {
      Monday: [8, 10, 12],
      Tuesday: [8, 10, 12],
      Wednesday: [9, 12, 17],
      Thursday: [9, 12, 17],
      Friday: [9, 10, 11],
      Saturday: [10],
      Sunday: [10],
    },
    peakHours: [9, 12],
  },
};

const nicheModifiers: Record<string, number[]> = {
  business: [7, 8, 9, 12, 17, 18],
  entertainment: [12, 18, 19, 20, 21, 22],
  education: [8, 9, 10, 14, 15, 16],
  fitness: [5, 6, 7, 17, 18, 19],
  tech: [9, 10, 11, 15, 16, 17],
  lifestyle: [10, 11, 12, 19, 20, 21],
};

export default function BestTimeCalculator() {
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [niche, setNiche] = useState('lifestyle');
  const [timezone, setTimezone] = useState('America/New_York');
  const [result, setResult] = useState<Result | null>(null);

  const getPlatformIcon = (p: Platform) => {
    switch (p) {
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'youtube': return <Youtube className="w-5 h-5" />;
      case 'tiktok': return <Video className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
    }
  };

  const calculateBestTimes = (e: React.FormEvent) => {
    e.preventDefault();

    const data = platformData[platform];
    const nicheHours = nicheModifiers[niche] || nicheModifiers.lifestyle;

    // Calculate scores for each day and time
    const schedule: TimeSlot[] = Object.entries(data.days).map(([day, hours]) => {
      const times = Array.from({ length: 24 }, (_, hour) => {
        let score = 0;

        // Base score from platform data
        if (hours.includes(hour)) score += 40;
        if (data.peakHours.includes(hour)) score += 20;

        // Niche modifier
        if (nicheHours.includes(hour)) score += 25;

        // Time of day bonus
        if (hour >= 7 && hour <= 9) score += 10; // Morning
        if (hour >= 11 && hour <= 13) score += 15; // Lunch
        if (hour >= 17 && hour <= 21) score += 15; // Evening

        // Weekend adjustments
        if ((day === 'Saturday' || day === 'Sunday') && hour >= 10 && hour <= 14) {
          score += 10;
        }

        return {
          hour: `${hour.toString().padStart(2, '0')}:00`,
          score: Math.min(100, score),
        };
      }).filter(t => t.score > 0);

      return { day, times };
    });

    // Find best overall time
    let bestDay = '';
    let bestTime = '';
    let maxScore = 0;

    schedule.forEach(slot => {
      slot.times.forEach(time => {
        if (time.score > maxScore) {
          maxScore = time.score;
          bestDay = slot.day;
          bestTime = time.hour;
        }
      });
    });

    // Generate insights
    const insights: string[] = [];

    if (platform === 'instagram') {
      insights.push('📸 Instagram engagement peaks during lunch breaks and after work hours');
    } else if (platform === 'tiktok') {
      insights.push('🎵 TikTok users are most active late evenings and early mornings');
    } else if (platform === 'youtube') {
      insights.push('🎬 YouTube videos perform best when published 2-3 hours before peak viewing');
    } else if (platform === 'twitter') {
      insights.push('🐦 Twitter engagement is highest during morning commute hours');
    }

    if (niche === 'business' || niche === 'finance') {
      insights.push('💼 Your B2B audience is most active on weekdays during work hours');
    }

    insights.push(`⏰ Post consistently at ${bestTime} on ${bestDay}s for best results`);
    insights.push('📊 Track your own analytics to refine these recommendations');

    setResult({
      bestDay,
      bestTime,
      schedule,
      insights,
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-blue-500';
    if (score >= 30) return 'bg-yellow-500';
    return 'bg-slate-600';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Best Time to Post</h2>
            <p className="text-sm text-slate-400">Find optimal posting windows for your audience</p>
          </div>
        </div>

        <form onSubmit={calculateBestTimes} className="space-y-6">
          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">Platform</label>
            <div className="grid grid-cols-4 gap-2">
              {(['instagram', 'tiktok', 'youtube', 'twitter'] as Platform[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlatform(p)}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all ${platform === p
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                >
                  {getPlatformIcon(p)}
                  <span className="capitalize">{p}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Niche Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Your Niche</label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full appearance-none bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer"
            >
              <option value="lifestyle">Lifestyle / Vlog</option>
              <option value="entertainment">Entertainment / Comedy</option>
              <option value="education">Education / Tutorial</option>
              <option value="business">Business / Finance</option>
              <option value="tech">Tech / Software</option>
              <option value="fitness">Fitness / Health</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-5 h-5" />
            Find Best Times
          </button>
        </form>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4">
            {/* Best Time Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarDays className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-slate-400">Best Day</span>
                </div>
                <div className="text-3xl font-bold text-white">{result.bestDay}</div>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-slate-400">Best Time</span>
                </div>
                <div className="text-3xl font-bold text-white">{result.bestTime}</div>
              </div>
            </div>

            {/* Weekly Heatmap */}
            <div className="p-6 bg-slate-800/30 rounded-xl">
              <h4 className="font-medium text-white mb-4">Weekly Posting Heatmap</h4>
              <div className="space-y-3">
                {result.schedule.map((slot) => (
                  <div key={slot.day} className="flex items-center gap-3">
                    <span className="w-20 text-sm text-slate-400 shrink-0">{slot.day.slice(0, 3)}</span>
                    <div className="flex gap-1 flex-wrap">
                      {slot.times.slice(0, 6).map((time) => (
                        <div
                          key={time.hour}
                          className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(time.score)} text-white`}
                          title={`${time.hour} - Score: ${time.score}%`}
                        >
                          {time.hour}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-green-500" />
                  <span>Best (70%+)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-blue-500" />
                  <span>Good (50%+)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-yellow-500" />
                  <span>Okay (30%+)</span>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="p-4 bg-slate-800/30 rounded-xl">
              <h4 className="font-medium text-white mb-3">Insights</h4>
              <ul className="space-y-2">
                {result.insights.map((insight, i) => (
                  <li key={i} className="text-sm text-slate-300">{insight}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
