'use client';

import { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, addDays } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Instagram, Youtube, Video } from 'lucide-react';

type Post = {
  id: string;
  date: Date;
  platform: 'instagram' | 'tiktok' | 'youtube';
  title: string;
  status: 'idea' | 'scripted' | 'filmed' | 'published';
};

export default function ContentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [posts] = useState<Post[]>([
    { id: '1', date: new Date(), platform: 'instagram', title: 'Day in the Life', status: 'scripted' },
    { id: '2', date: addDays(new Date(), 2), platform: 'tiktok', title: 'Tech Review', status: 'idea' },
    { id: '3', date: addDays(new Date(), 5), platform: 'youtube', title: 'Full Tutorial', status: 'published' },
  ]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const nextMonth = () => setCurrentDate(addDays(monthEnd, 1));
  const prevMonth = () => setCurrentDate(addDays(monthStart, -1));

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-3 h-3" />;
      case 'youtube': return <Youtube className="w-3 h-3" />;
      case 'tiktok': return <Video className="w-3 h-3" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idea': return 'bg-slate-700 text-slate-300 border-slate-600';
      case 'scripted': return 'bg-blue-900/50 text-blue-200 border-blue-800';
      case 'filmed': return 'bg-purple-900/50 text-purple-200 border-purple-800';
      case 'published': return 'bg-green-900/50 text-green-200 border-green-800';
      default: return 'bg-slate-700';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-white">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center rounded-lg bg-slate-800 p-1">
            <button onClick={prevMonth} className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextMonth} className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 border-b border-slate-800 bg-slate-900">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="py-2 text-center text-sm font-medium text-slate-400">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 flex-1 auto-rows-fr bg-slate-800 gap-px border-b border-slate-800">
        {days.map((day) => {
          const dayPosts = posts.filter(post => isSameDay(post.date, day));

          return (
            <div
              key={day.toString()}
              className={`min-h-[100px] bg-slate-900 p-2 relative group transition-colors hover:bg-slate-800/50 ${
                !isSameMonth(day, monthStart) ? 'bg-slate-950/50 text-slate-600' : 'text-slate-300'
              }`}
            >
              <div className={`text-sm font-medium mb-2 ${isSameDay(day, new Date()) ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : ''}`}>
                {format(day, 'd')}
              </div>

              <div className="space-y-1.5">
                {dayPosts.map((post) => (
                  <div
                    key={post.id}
                    className={`text-xs p-1.5 rounded border ${getStatusColor(post.status)} cursor-pointer hover:brightness-110 transition-all`}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {getPlatformIcon(post.platform)}
                      <span className="font-semibold truncate">{post.platform}</span>
                    </div>
                    <div className="truncate opacity-90">{post.title}</div>
                  </div>
                ))}
              </div>

              {/* Hover Add Button */}
              <button className="absolute bottom-2 right-2 p-1.5 rounded-full bg-blue-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <Plus className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
