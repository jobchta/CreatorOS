'use client';

import { useState } from 'react';
import { GripVertical, Trash2, Plus } from 'lucide-react';

export default function LinkInBioPage() {
  const [links] = useState([
    { id: 1, title: 'My Latest Video', url: 'https://youtube.com/...' },
    { id: 2, title: 'Buy my Presets', url: 'https://store.logicloom.com/...' },
    { id: 3, title: 'Newsletter', url: 'https://substack.com/...' },
  ]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-8rem)]">
      {/* Editor Side */}
      <div className="flex-1 bg-slate-900 rounded-xl border border-slate-800 p-6 overflow-y-auto">
        <h2 className="text-xl font-bold text-white mb-6">Customize Links</h2>

        <div className="space-y-4">
          {links.map((link) => (
            <div key={link.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex items-center gap-4 group">
              <GripVertical className="text-slate-500 cursor-grab" />
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  defaultValue={link.title}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  defaultValue={link.url}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-400 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <button className="text-slate-500 hover:text-red-400 p-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-3 border-2 border-dashed border-slate-700 rounded-lg text-slate-400 hover:text-white hover:border-slate-500 transition-colors flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" /> Add New Link
        </button>
      </div>

      {/* Preview Side */}
      <div className="w-[375px] mx-auto lg:mx-0 bg-black rounded-[3rem] border-8 border-slate-800 p-4 relative shadow-2xl overflow-hidden">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-10"></div>

        <div className="h-full bg-gradient-to-b from-slate-900 to-black rounded-[2rem] overflow-y-auto p-6 pt-12 text-center">
          <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto mb-4 border-2 border-white/10"></div>
          <h3 className="font-bold text-white text-lg">@yourusername</h3>
          <p className="text-slate-400 text-sm mb-8">Digital Creator & Tech Reviewer</p>

          <div className="space-y-3">
            {links.map((link) => (
              <a key={link.id} href="#" className="block w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-all border border-slate-700 hover:scale-[1.02]">
                {link.title}
              </a>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            {/* Social Icons Mock */}
            <div className="w-8 h-8 bg-slate-800 rounded-full"></div>
            <div className="w-8 h-8 bg-slate-800 rounded-full"></div>
            <div className="w-8 h-8 bg-slate-800 rounded-full"></div>
          </div>

          <div className="mt-12 text-xs text-slate-600">
            Powered by LogicLoom
          </div>
        </div>
      </div>
    </div>
  );
}
