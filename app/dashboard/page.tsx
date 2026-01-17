import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  Sparkles,
  TrendingUp,
  Clock,
  Target,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Zap
} from 'lucide-react';

// Types for simulation data
interface SimulationResult {
  score: number;
  reasoning: string;
  category: string;
}

interface Simulation {
  id: string;
  input_content: string;
  result_json: SimulationResult;
  score: number;
  category: string;
  created_at: string;
}

export default async function DashboardPage() {
  // 1. Get authenticated user
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 2. Redirect if not logged in
  if (!user) {
    redirect('/login');
  }

  // 3. Fetch user's simulations
  const { data: simulations } = await supabase
    .from('simulations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10);

  // Score color helper
  const getScoreColor = (score: number): string => {
    if (score >= 70) return 'text-emerald-400';
    if (score >= 40) return 'text-amber-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number): string => {
    if (score >= 70) return 'bg-emerald-500/10 border-emerald-500/30';
    if (score >= 40) return 'bg-amber-500/10 border-amber-500/30';
    return 'bg-red-500/10 border-red-500/30';
  };

  // Format date helper
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Truncate text helper
  const truncate = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top Navbar */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-950 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold hidden sm:inline">LogicLoom</span>
          </Link>
          <span className="text-gray-600">/</span>
          <div className="flex items-center gap-2 text-gray-300">
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/simulator"
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">New Analysis</span>
          </Link>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Welcome back{user.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}
          </h1>
          <p className="text-gray-400">
            Your history of intelligence • Track your content analysis journey
          </p>
        </div>

        {/* Simulations Grid or Empty State */}
        {simulations && simulations.length > 0 ? (
          <>
            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="text-2xl font-bold text-white">{simulations.length}</div>
                <div className="text-sm text-gray-500">Total Analyses</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="text-2xl font-bold text-emerald-400">
                  {simulations.filter((s: Simulation) => s.score >= 70).length}
                </div>
                <div className="text-sm text-gray-500">High Scorers</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="text-2xl font-bold text-purple-400">
                  {Math.round(simulations.reduce((acc: number, s: Simulation) => acc + s.score, 0) / simulations.length)}
                </div>
                <div className="text-sm text-gray-500">Avg Score</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="text-2xl font-bold text-pink-400">
                  {[...new Set(simulations.map((s: Simulation) => s.category))].length}
                </div>
                <div className="text-sm text-gray-500">Categories</div>
              </div>
            </div>

            {/* Simulations Grid */}
            <h2 className="text-lg font-semibold text-white mb-4">Recent Analyses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {simulations.map((sim: Simulation) => (
                <div
                  key={sim.id}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-5 md:p-6 hover:border-purple-500/50 transition-all group"
                >
                  {/* Header: Date & Score */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Clock className="w-3 h-3" />
                      {formatDate(sim.created_at)}
                    </div>
                    <div className={`text-3xl font-bold ${getScoreColor(sim.score)}`}>
                      {sim.score}
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-purple-400" />
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getScoreBg(sim.score)}`}>
                      {sim.category}
                    </span>
                  </div>

                  {/* Content Preview */}
                  <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                    {truncate(sim.input_content, 120)}
                  </p>

                  {/* Reasoning */}
                  <div className="flex items-start gap-2 p-3 bg-gray-800/50 rounded-lg mb-4">
                    <TrendingUp className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {truncate(sim.result_json?.reasoning || '', 100)}
                    </p>
                  </div>

                  {/* Re-Analyze Button */}
                  <Link
                    href={`/simulator?content=${encodeURIComponent(sim.input_content)}`}
                    className="flex items-center justify-center gap-2 w-full py-2 text-sm text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-colors group-hover:bg-purple-500/5"
                  >
                    <Zap className="w-4 h-4" />
                    Re-Analyze
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-6">
              <Sparkles className="w-10 h-10 text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              No analyses yet
            </h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Start analyzing your content to build your history of intelligence. Each analysis helps you understand what makes content go viral.
            </p>
            <Link
              href="/simulator"
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors"
            >
              <Zap className="w-5 h-5" />
              Analyze Your First Content
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
