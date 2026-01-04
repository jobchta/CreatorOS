import { Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
      <h1 className="text-xl font-semibold text-white">Dashboard</h1>
      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}
