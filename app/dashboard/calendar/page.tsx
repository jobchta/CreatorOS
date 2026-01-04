'use client';

import ContentCalendar from '@/components/dashboard/ContentCalendar';
import { Lightbulb, Hash, FileText } from 'lucide-react';

export default function CalendarPage() {
  return (
    <div className="flex h-full gap-6">
      {/* Main Calendar Area */}
      <div className="flex-1 flex flex-col h-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Content Calendar</h1>
          <p className="text-slate-400">Plan, schedule, and organize your content across all platforms.</p>
        </div>
        <ContentCalendar />
      </div>

      {/* Side Panel: Idea Backlog */}
      <div className="w-80 flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hidden xl:flex">
        <div className="p-4 border-b border-slate-800 bg-slate-900">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            Idea Backlog
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Mock Ideas */}
          {[
            { title: "Review iPhone 15 vs 14", tag: "Tech", type: "video" },
            { title: "My Morning Routine 2024", tag: "Lifestyle", type: "shorts" },
            { title: "How to edit fast in Premiere", tag: "Tutorial", type: "video" },
            { title: "Budget Setup Tour", tag: "Tech", type: "photo" },
            { title: "Q&A Sunday", tag: "Community", type: "stories" },
          ].map((idea, i) => (
            <div key={i} className="p-3 bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 cursor-grab active:cursor-grabbing transition-colors">
              <p className="text-sm font-medium text-slate-200 mb-2">{idea.title}</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-700 text-slate-400">
                  {idea.tag}
                </span>
                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-900/30 text-blue-400 border border-blue-900/50">
                  {idea.type}
                </span>
              </div>
            </div>
          ))}

          <button className="w-full py-2 border-2 border-dashed border-slate-700 rounded-lg text-slate-500 text-sm hover:border-slate-600 hover:text-slate-400 transition-colors">
            + Add New Idea
          </button>
        </div>

        {/* Resources Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 space-y-2">
          <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white w-full p-2 hover:bg-slate-800 rounded transition-colors">
            <Hash className="w-4 h-4" /> Hashtag Collections
          </button>
          <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white w-full p-2 hover:bg-slate-800 rounded transition-colors">
            <FileText className="w-4 h-4" /> Caption Templates
          </button>
        </div>
      </div>
    </div>
  );
}
