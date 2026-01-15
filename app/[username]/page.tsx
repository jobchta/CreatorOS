import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";

interface BioPageProps {
  params: Promise<{ username: string }>;
}

export default async function BioPage({ params }: BioPageProps) {
  const supabase = await createClient();
  const { username } = await params;

  // 1. Fetch Profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) return notFound();

  // 2. Fetch Active Links
  const { data: links } = await supabase
    .from("bio_links")
    .select("*")
    .eq("profile_id", profile.id)
    .eq("is_active", true)
    .order("order_index", { ascending: true });

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex flex-col items-center">

      {/* Avatar & Bio */}
      <div className="text-center mb-6 w-full max-w-sm">
        {profile.avatar_url && (
          <img
            src={profile.avatar_url}
            alt="Avatar"
            className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-white shadow-md"
          />
        )}
        <h1 className="text-xl font-bold text-gray-900">{profile.full_name || profile.username}</h1>
        {profile.bio && <p className="text-gray-600 mt-1 text-sm leading-relaxed">{profile.bio}</p>}
      </div>

      {/* Links - Max width for easy tapping on mobile */}
      <div className="w-full max-w-sm space-y-3">
        {links?.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full p-4 bg-white rounded-xl border border-gray-200 text-center font-medium text-gray-800 shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            {link.title}
          </a>
        ))}
      </div>

      {/* Branding */}
      <div className="mt-8">
        <span className="text-xs font-bold text-gray-400">LOGICLOOM</span>
      </div>
    </div>
  );
}
