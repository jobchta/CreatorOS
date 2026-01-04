import { MapPin, Link as LinkIcon, Instagram, Youtube, Twitter } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-16">
        <div className="absolute -bottom-12 left-8">
          <div className="w-32 h-32 bg-slate-900 rounded-full p-1">
            <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center text-3xl font-bold text-white border-4 border-slate-900">
              JD
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 flex gap-2">
           <button className="bg-black/30 hover:bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm text-sm font-medium transition-colors">
             Edit Cover
           </button>
        </div>
      </div>

      <div className="px-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">John Doe</h1>
            <p className="text-slate-400">@johndoe_tech</p>
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium border border-slate-700 transition-colors">
            Edit Profile
          </button>
        </div>

        <p className="text-slate-300 max-w-2xl mb-6">
          Tech reviewer and lifestyle vlogger based in NYC. Obsessed with coffee, mechanical keyboards, and minimalist setups.
        </p>

        <div className="flex flex-wrap gap-6 text-sm text-slate-400 mb-8">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> New York, NY
          </div>
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4" /> youtube.com/c/johndoe
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-blue-500 transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-red-500 transition-colors"><Youtube className="w-5 h-5" /></a>
            <a href="#" className="hover:text-sky-500 transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <h2 className="text-xl font-bold text-white mb-6">Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Mock Portfolio Items */}
             {[1, 2, 3].map((i) => (
               <div key={i} className="group aspect-video bg-slate-900 rounded-xl border border-slate-800 overflow-hidden relative cursor-pointer">
                 <div className="absolute inset-0 flex items-center justify-center bg-slate-800 group-hover:bg-slate-700 transition-colors">
                   <span className="text-slate-500 font-medium">Video Thumbnail {i}</span>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
