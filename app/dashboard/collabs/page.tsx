'use client';

import CreatorCard from "@/components/dashboard/collabs/CreatorCard";
import { Filter, Search } from "lucide-react";

const creators = [
  { id: '1', name: 'Alex Rivera', niche: 'Tech & Gaming', followers: '125K', location: 'NYC', matchScore: 98, image: 'bg-blue-600' },
  { id: '2', name: 'Sarah Chen', niche: 'Lifestyle', followers: '45K', location: 'LA', matchScore: 85, image: 'bg-purple-600' },
  { id: '3', name: 'Mike Ross', niche: 'Photography', followers: '80K', location: 'Toronto', matchScore: 72, image: 'bg-orange-500' },
  { id: '4', name: 'Emma Watson', niche: 'Fashion', followers: '250K', location: 'London', matchScore: 65, image: 'bg-pink-500' },
];

export default function CollabsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Creator Marketplace</h1>
          <p className="text-slate-400">Find collaborators with similar audiences to grow faster.</p>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search creators..."
              className="bg-slate-900 border border-slate-800 text-white pl-9 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-lg border border-slate-700 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {creators.map(creator => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </div>
  );
}
