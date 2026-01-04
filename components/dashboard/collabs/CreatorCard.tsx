import { MapPin, Users } from 'lucide-react';

type Creator = {
  id: string;
  name: string;
  niche: string;
  followers: string;
  location: string;
  matchScore: number;
  image: string; // Color placeholder for now
};

export default function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all group">
      <div className={`h-24 w-full ${creator.image}`}></div>
      <div className="p-5 relative">
        <div className="absolute -top-10 left-5 w-16 h-16 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center text-xl font-bold text-white">
          {creator.name[0]}
        </div>

        <div className="flex justify-end mb-2">
          <span className="text-xs font-bold text-green-400 bg-green-900/20 px-2 py-1 rounded-full border border-green-900/30">
            {creator.matchScore}% Match
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mt-2">{creator.name}</h3>
        <p className="text-blue-400 text-sm font-medium mb-4">{creator.niche}</p>

        <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" /> {creator.followers}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {creator.location}
          </div>
        </div>

        <button className="w-full bg-slate-800 group-hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-colors">
          Connect
        </button>
      </div>
    </div>
  );
}
