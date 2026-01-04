import { FollowerGrowthChart, EngagementChart } from "@/components/dashboard/AnalyticsCharts";
import { ArrowUpRight, ArrowDownRight, Users, Eye, MousePointerClick, DollarSign } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-slate-400">Total Followers</h3>
            <Users className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-white">12,345</div>
          <p className="text-xs text-green-500 flex items-center mt-1">
            <ArrowUpRight className="h-3 w-3 mr-1" /> +20.1% from last month
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-slate-400">Total Views</h3>
            <Eye className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-white">450.2K</div>
          <p className="text-xs text-green-500 flex items-center mt-1">
            <ArrowUpRight className="h-3 w-3 mr-1" /> +4.5% from last month
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-slate-400">Engagement Rate</h3>
            <MousePointerClick className="h-4 w-4 text-pink-500" />
          </div>
          <div className="text-2xl font-bold text-white">5.2%</div>
          <p className="text-xs text-red-500 flex items-center mt-1">
            <ArrowDownRight className="h-3 w-3 mr-1" /> -0.4% from last month
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-slate-400">Est. Earnings</h3>
            <DollarSign className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-white">$1,240</div>
          <p className="text-xs text-green-500 flex items-center mt-1">
            <ArrowUpRight className="h-3 w-3 mr-1" /> +12% from last month
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-white">Follower Growth</h3>
            <p className="text-sm text-slate-400">Growth trend over the last 7 days</p>
          </div>
          <FollowerGrowthChart />
        </div>
        <div className="col-span-3 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-white">Engagement Volume</h3>
            <p className="text-sm text-slate-400">Daily interactions (Likes + Comments)</p>
          </div>
          <EngagementChart />
        </div>
      </div>
    </div>
  );
}
