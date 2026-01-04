'use client';

import { Send, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function MessagesPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'them', text: 'Hey! Loved your recent video on the iPhone 15.', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Thanks Alex! I saw you just hit 100k, congrats!', time: '10:32 AM' },
    { id: 3, sender: 'them', text: 'Thank you! I was wondering if youd be open to a collab next month?', time: '10:35 AM' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'me', text: input, time: 'Now' }]);
    setInput('');
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
      {/* Sidebar List */}
      <div className="w-80 border-r border-slate-800 bg-slate-900 hidden md:flex flex-col">
        <div className="p-4 border-b border-slate-800 font-semibold text-white">Messages</div>
        <div className="flex-1 overflow-y-auto">
          {['Alex Rivera', 'Sarah Chen'].map((name, i) => (
            <div key={i} className={`p-4 hover:bg-slate-800 cursor-pointer border-l-4 ${i === 0 ? 'border-blue-500 bg-slate-800' : 'border-transparent'}`}>
              <h4 className="font-medium text-white">{name}</h4>
              <p className="text-sm text-slate-400 truncate">Hey! Are we still on for...</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-950">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
          <h3 className="font-bold text-white">Alex Rivera</h3>
          <span className="text-xs text-green-500 flex items-center gap-1">● Online</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-xl px-4 py-2 text-sm ${
                msg.sender === 'me'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-slate-800 text-slate-200 rounded-bl-none'
              }`}>
                <p>{msg.text}</p>
                <span className="text-[10px] opacity-70 mt-1 block text-right">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
          <button type="button" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
            <ImageIcon className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-slate-800 border-none rounded-full px-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button type="submit" className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
