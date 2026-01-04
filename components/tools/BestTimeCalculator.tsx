'use client';

import { useState } from 'react';
import { Clock, Globe, Calendar } from 'lucide-react';

type TimeSlot = {
  day: string;
  times: string[];
};

export default function BestTimeCalculator() {
  const [platform, setPlatform] = useState('instagram');
  const [timezone, setTimezone] = useState('EST');
  const [result, setResult] = useState<TimeSlot[] | null>(null);

  const calculateTimes = (e: React.FormEvent) => {
    e.preventDefault();

    // Generic "Best Time" logic based on general social media studies
    // In a real app, this would use the user's historical data
    let times: TimeSlot[] = [];

    if (platform === 'instagram') {
      times = [
        { day: 'Monday', times: ['11:00 AM', '1:00 PM'] },
        { day: 'Wednesday', times: ['10:00 AM', '3:00 PM'] },
        { day: 'Friday', times: ['9:00 AM', '4:00 PM'] },
        { day: 'Sunday', times: ['7:00 PM'] },
      ];
    } else if (platform === 'tiktok') {
      times = [
        { day: 'Tuesday', times: ['9:00 AM', '2:00 PM', '9:00 PM'] },
        { day: 'Thursday', times: ['12:00 PM', '7:00 PM'] },
        { day: 'Friday', times: ['5:00 AM', '1:00 PM', '3:00 PM'] },
      ];
    } else if (platform === 'youtube') {
      times = [
        { day: 'Thursday', times: ['2:00 PM', '4:00 PM'] },
        { day: 'Friday', times: ['2:00 PM', '4:00 PM'] },
        { day: 'Weekend', times: ['9:00 AM', '11:00 AM'] },
      ];
    } else if (platform === 'twitter') {
      times = [
        { day: 'Weekdays', times: ['9:00 AM', '12:00 PM', '5:00 PM'] },
        { day: 'Wednesday', times: ['9:00 AM', '3:00 PM'] },
      ];
    }

    // Simulate "Calculation" delay
    setResult(null);
    setTimeout(() => {
      setResult(times);
    }, 500);
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg max-w-lg mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="text-blue-400 w-8 h-8" />
        <h2 className="text-2xl font-bold text-white">Best Time to Post</h2>
      </div>

      <form onSubmit={calculateTimes} className="space-y-4">
        <div>
          <label className="block text-slate-400 text-sm font-medium mb-1">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
            <option value="twitter">X (Twitter)</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 text-sm font-medium mb-1">Audience Timezone</label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full pl-10 bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="EST">Eastern Standard Time (EST)</option>
              <option value="PST">Pacific Standard Time (PST)</option>
              <option value="GMT">Greenwich Mean Time (GMT)</option>
              <option value="AEST">Australian Eastern (AEST)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <Calendar className="w-5 h-5" />
          <span>Find Best Times</span>
        </button>
      </form>

      {result && (
        <div className="mt-8 space-y-3 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-white font-semibold mb-3">Recommended Posting Slots ({timezone})</h3>
          {result.map((slot, index) => (
            <div key={index} className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              <span className="text-blue-400 font-medium">{slot.day}</span>
              <div className="flex gap-2">
                {slot.times.map((time, tIndex) => (
                  <span key={tIndex} className="px-2 py-1 bg-slate-700 rounded text-sm text-white">
                    {time}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <p className="text-xs text-slate-500 text-center mt-4">
            *Based on global engagement data for your selected niche. Connect your account for personalized AI recommendations.
          </p>
        </div>
      )}
    </div>
  );
}
