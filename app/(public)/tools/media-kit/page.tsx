'use client';

import { useState } from 'react';
import {
    FileImage,
    Download,
    Eye,
    Palette,
    User,
    BarChart3,
    Users,
    Heart,
    Mail,
    Globe,
    Instagram,
    Youtube,
    Twitter,
    Sparkles,
    Check,
    ArrowRight,
    Crown
} from 'lucide-react';
import Link from 'next/link';

interface MediaKitData {
    name: string;
    tagline: string;
    bio: string;
    email: string;
    website: string;
    niche: string;
    platforms: {
        instagram?: { username: string; followers: number; engagement: number };
        youtube?: { username: string; subscribers: number; avgViews: number };
        tiktok?: { username: string; followers: number; engagement: number };
        twitter?: { username: string; followers: number };
    };
    demographics: {
        ageRange: string;
        gender: string;
        topLocations: string[];
    };
    rates: {
        instagramPost?: number;
        instagramReel?: number;
        instagramStory?: number;
        youtubeVideo?: number;
        youtubeShort?: number;
        tiktokVideo?: number;
    };
    pastBrands: string[];
}

type ThemeType = 'minimal' | 'bold' | 'gradient';

const themes: Record<ThemeType, { name: string; preview: string; colors: { bg: string; text: string; accent: string } }> = {
    minimal: {
        name: 'Minimal',
        preview: 'Clean and professional',
        colors: { bg: '#ffffff', text: '#1a1a2e', accent: '#6366f1' }
    },
    bold: {
        name: 'Bold',
        preview: 'Dark and striking',
        colors: { bg: '#0f0f23', text: '#ffffff', accent: '#f97316' }
    },
    gradient: {
        name: 'Gradient',
        preview: 'Modern and vibrant',
        colors: { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: '#ffffff', accent: '#fbbf24' }
    }
};

export default function MediaKitPage() {
    const [step, setStep] = useState(1);
    const [theme, setTheme] = useState<ThemeType>('minimal');
    const [showPreview, setShowPreview] = useState(false);

    const [formData, setFormData] = useState<MediaKitData>({
        name: '',
        tagline: '',
        bio: '',
        email: '',
        website: '',
        niche: 'lifestyle',
        platforms: {},
        demographics: {
            ageRange: '18-34',
            gender: '60% Female, 40% Male',
            topLocations: ['United States', 'United Kingdom', 'Canada'],
        },
        rates: {},
        pastBrands: [],
    });

    const [instagramEnabled, setInstagramEnabled] = useState(true);
    const [youtubeEnabled, setYoutubeEnabled] = useState(false);
    const [tiktokEnabled, setTiktokEnabled] = useState(false);

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    const downloadMediaKit = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const themeColors = themes[theme].colors;
        const isLight = theme === 'minimal';

        printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Media Kit - ${formData.name}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: ${themeColors.bg};
              color: ${themeColors.text};
              min-height: 100vh;
              padding: 40px;
            }
            .container { max-width: 800px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 40px; }
            .avatar { 
              width: 120px; height: 120px; 
              background: ${themeColors.accent}; 
              border-radius: 50%; 
              margin: 0 auto 20px;
              display: flex; align-items: center; justify-content: center;
              font-size: 48px; font-weight: bold; color: white;
            }
            .name { font-size: 32px; font-weight: bold; margin-bottom: 8px; }
            .tagline { font-size: 18px; opacity: 0.7; margin-bottom: 16px; }
            .bio { max-width: 600px; margin: 0 auto; line-height: 1.6; opacity: 0.8; }
            .section { margin: 40px 0; }
            .section-title { 
              font-size: 14px; 
              text-transform: uppercase; 
              letter-spacing: 2px; 
              margin-bottom: 20px;
              color: ${themeColors.accent};
              font-weight: 600;
            }
            .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
            .stat-card { 
              background: ${isLight ? '#f8f9fa' : 'rgba(255,255,255,0.1)'};
              padding: 24px; 
              border-radius: 12px; 
              text-align: center;
            }
            .stat-value { font-size: 28px; font-weight: bold; color: ${themeColors.accent}; }
            .stat-label { font-size: 12px; opacity: 0.6; margin-top: 4px; }
            .platform-card {
              background: ${isLight ? '#f8f9fa' : 'rgba(255,255,255,0.1)'};
              padding: 20px;
              border-radius: 12px;
              margin-bottom: 12px;
              display: flex;
              align-items: center;
              gap: 16px;
            }
            .platform-icon { 
              width: 48px; height: 48px; 
              border-radius: 12px; 
              display: flex; align-items: center; justify-content: center;
              font-weight: bold; color: white;
            }
            .instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
            .youtube { background: #ff0000; }
            .tiktok { background: #000000; }
            .platform-stats { display: flex; gap: 24px; margin-left: auto; }
            .platform-stat { text-align: right; }
            .rates-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
            .rate-item {
              background: ${isLight ? '#f8f9fa' : 'rgba(255,255,255,0.1)'};
              padding: 16px 20px;
              border-radius: 8px;
              display: flex;
              justify-content: space-between;
            }
            .rate-value { font-weight: bold; color: ${themeColors.accent}; }
            .brands { display: flex; flex-wrap: wrap; gap: 12px; }
            .brand-tag {
              background: ${isLight ? '#f8f9fa' : 'rgba(255,255,255,0.1)'};
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 14px;
            }
            .contact {
              margin-top: 40px;
              padding-top: 40px;
              border-top: 1px solid ${isLight ? '#eee' : 'rgba(255,255,255,0.1)'};
              text-align: center;
            }
            .contact-info { display: flex; justify-content: center; gap: 32px; margin-top: 16px; }
            .footer { 
              margin-top: 60px; 
              text-align: center; 
              font-size: 12px; 
              opacity: 0.5;
            }
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="avatar">${formData.name.charAt(0).toUpperCase()}</div>
              <div class="name">${formData.name}</div>
              <div class="tagline">${formData.tagline || formData.niche + ' Creator'}</div>
              <p class="bio">${formData.bio || 'A passionate content creator focused on authentic connections and meaningful collaborations.'}</p>
            </div>

            <div class="section">
              <div class="section-title">Audience Overview</div>
              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-value">${formatNumber(Object.values(formData.platforms).reduce((acc, p) => acc + ((p as any)?.followers || (p as any)?.subscribers || 0), 0))}</div>
                  <div class="stat-label">Total Audience</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">${formData.demographics.ageRange}</div>
                  <div class="stat-label">Primary Age Range</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">${formData.demographics.gender.split(',')[0]}</div>
                  <div class="stat-label">Audience Split</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Platforms</div>
              ${formData.platforms.instagram ? `
                <div class="platform-card">
                  <div class="platform-icon instagram">IG</div>
                  <div>
                    <strong>@${formData.platforms.instagram.username}</strong>
                    <div style="opacity: 0.6; font-size: 14px;">Instagram</div>
                  </div>
                  <div class="platform-stats">
                    <div class="platform-stat">
                      <div style="font-weight: bold;">${formatNumber(formData.platforms.instagram.followers)}</div>
                      <div style="font-size: 12px; opacity: 0.6;">Followers</div>
                    </div>
                    <div class="platform-stat">
                      <div style="font-weight: bold;">${formData.platforms.instagram.engagement}%</div>
                      <div style="font-size: 12px; opacity: 0.6;">Engagement</div>
                    </div>
                  </div>
                </div>
              ` : ''}
              ${formData.platforms.youtube ? `
                <div class="platform-card">
                  <div class="platform-icon youtube">YT</div>
                  <div>
                    <strong>${formData.platforms.youtube.username}</strong>
                    <div style="opacity: 0.6; font-size: 14px;">YouTube</div>
                  </div>
                  <div class="platform-stats">
                    <div class="platform-stat">
                      <div style="font-weight: bold;">${formatNumber(formData.platforms.youtube.subscribers)}</div>
                      <div style="font-size: 12px; opacity: 0.6;">Subscribers</div>
                    </div>
                    <div class="platform-stat">
                      <div style="font-weight: bold;">${formatNumber(formData.platforms.youtube.avgViews)}</div>
                      <div style="font-size: 12px; opacity: 0.6;">Avg Views</div>
                    </div>
                  </div>
                </div>
              ` : ''}
              ${formData.platforms.tiktok ? `
                <div class="platform-card">
                  <div class="platform-icon tiktok">TT</div>
                  <div>
                    <strong>@${formData.platforms.tiktok.username}</strong>
                    <div style="opacity: 0.6; font-size: 14px;">TikTok</div>
                  </div>
                  <div class="platform-stats">
                    <div class="platform-stat">
                      <div style="font-weight: bold;">${formatNumber(formData.platforms.tiktok.followers)}</div>
                      <div style="font-size: 12px; opacity: 0.6;">Followers</div>
                    </div>
                    <div class="platform-stat">
                      <div style="font-weight: bold;">${formData.platforms.tiktok.engagement}%</div>
                      <div style="font-size: 12px; opacity: 0.6;">Engagement</div>
                    </div>
                  </div>
                </div>
              ` : ''}
            </div>

            ${Object.keys(formData.rates).length > 0 ? `
              <div class="section">
                <div class="section-title">Rate Card</div>
                <div class="rates-grid">
                  ${formData.rates.instagramPost ? `<div class="rate-item"><span>Instagram Post</span><span class="rate-value">$${formData.rates.instagramPost.toLocaleString()}</span></div>` : ''}
                  ${formData.rates.instagramReel ? `<div class="rate-item"><span>Instagram Reel</span><span class="rate-value">$${formData.rates.instagramReel.toLocaleString()}</span></div>` : ''}
                  ${formData.rates.instagramStory ? `<div class="rate-item"><span>Instagram Story</span><span class="rate-value">$${formData.rates.instagramStory.toLocaleString()}</span></div>` : ''}
                  ${formData.rates.youtubeVideo ? `<div class="rate-item"><span>YouTube Video</span><span class="rate-value">$${formData.rates.youtubeVideo.toLocaleString()}</span></div>` : ''}
                  ${formData.rates.youtubeShort ? `<div class="rate-item"><span>YouTube Short</span><span class="rate-value">$${formData.rates.youtubeShort.toLocaleString()}</span></div>` : ''}
                  ${formData.rates.tiktokVideo ? `<div class="rate-item"><span>TikTok Video</span><span class="rate-value">$${formData.rates.tiktokVideo.toLocaleString()}</span></div>` : ''}
                </div>
              </div>
            ` : ''}

            ${formData.pastBrands.length > 0 ? `
              <div class="section">
                <div class="section-title">Past Collaborations</div>
                <div class="brands">
                  ${formData.pastBrands.map(brand => `<span class="brand-tag">${brand}</span>`).join('')}
                </div>
              </div>
            ` : ''}

            <div class="contact">
              <div class="section-title">Let's Work Together</div>
              <div class="contact-info">
                ${formData.email ? `<span>📧 ${formData.email}</span>` : ''}
                ${formData.website ? `<span>🌐 ${formData.website}</span>` : ''}
              </div>
            </div>

            <div class="footer">
              <p>Media Kit generated by LogicLoom • ${new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </body>
      </html>
    `);

        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 500);
    };

    const renderStep1 = () => (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Basic Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Your Name / Brand</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Sarah Johnson"
                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Tagline</label>
                    <input
                        type="text"
                        value={formData.tagline}
                        onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                        placeholder="e.g., Lifestyle & Travel Creator"
                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
                <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell brands about yourself and what makes you unique..."
                    rows={3}
                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="collab@example.com"
                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Website</label>
                    <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://yoursite.com"
                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Primary Niche</label>
                <select
                    value={formData.niche}
                    onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none cursor-pointer"
                >
                    <option value="lifestyle">Lifestyle</option>
                    <option value="beauty">Beauty & Fashion</option>
                    <option value="tech">Tech & Gadgets</option>
                    <option value="finance">Finance & Business</option>
                    <option value="fitness">Health & Fitness</option>
                    <option value="travel">Travel</option>
                    <option value="food">Food & Cooking</option>
                    <option value="gaming">Gaming</option>
                    <option value="parenting">Parenting & Family</option>
                </select>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Platform Statistics</h2>

            {/* Platform toggles */}
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={() => setInstagramEnabled(!instagramEnabled)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${instagramEnabled ? 'bg-pink-500/20 border-pink-500/50 text-pink-400' : 'bg-slate-800 border-slate-700 text-slate-400'
                        } border`}
                >
                    <Instagram className="w-4 h-4" />
                    Instagram
                    {instagramEnabled && <Check className="w-4 h-4" />}
                </button>
                <button
                    onClick={() => setYoutubeEnabled(!youtubeEnabled)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${youtubeEnabled ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-slate-800 border-slate-700 text-slate-400'
                        } border`}
                >
                    <Youtube className="w-4 h-4" />
                    YouTube
                    {youtubeEnabled && <Check className="w-4 h-4" />}
                </button>
                <button
                    onClick={() => setTiktokEnabled(!tiktokEnabled)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${tiktokEnabled ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : 'bg-slate-800 border-slate-700 text-slate-400'
                        } border`}
                >
                    <span className="text-sm font-bold">TT</span>
                    TikTok
                    {tiktokEnabled && <Check className="w-4 h-4" />}
                </button>
            </div>

            {instagramEnabled && (
                <div className="glass-card p-6 rounded-xl space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400">
                            <Instagram className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-medium text-white">Instagram</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Username</label>
                            <input
                                type="text"
                                value={formData.platforms.instagram?.username || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    platforms: {
                                        ...formData.platforms,
                                        instagram: { ...formData.platforms.instagram, username: e.target.value, followers: formData.platforms.instagram?.followers || 0, engagement: formData.platforms.instagram?.engagement || 0 }
                                    }
                                })}
                                placeholder="username"
                                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Followers</label>
                            <input
                                type="number"
                                value={formData.platforms.instagram?.followers || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    platforms: {
                                        ...formData.platforms,
                                        instagram: { ...formData.platforms.instagram!, followers: Number(e.target.value) }
                                    }
                                })}
                                placeholder="50000"
                                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Engagement %</label>
                            <input
                                type="number"
                                step="0.1"
                                value={formData.platforms.instagram?.engagement || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    platforms: {
                                        ...formData.platforms,
                                        instagram: { ...formData.platforms.instagram!, engagement: Number(e.target.value) }
                                    }
                                })}
                                placeholder="3.5"
                                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>
                </div>
            )}

            {youtubeEnabled && (
                <div className="glass-card p-6 rounded-xl space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-red-600">
                            <Youtube className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-medium text-white">YouTube</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Channel Name</label>
                            <input
                                type="text"
                                value={formData.platforms.youtube?.username || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    platforms: {
                                        ...formData.platforms,
                                        youtube: { ...formData.platforms.youtube, username: e.target.value, subscribers: formData.platforms.youtube?.subscribers || 0, avgViews: formData.platforms.youtube?.avgViews || 0 }
                                    }
                                })}
                                placeholder="Channel Name"
                                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Subscribers</label>
                            <input
                                type="number"
                                value={formData.platforms.youtube?.subscribers || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    platforms: {
                                        ...formData.platforms,
                                        youtube: { ...formData.platforms.youtube!, subscribers: Number(e.target.value) }
                                    }
                                })}
                                placeholder="100000"
                                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Avg Views/Video</label>
                            <input
                                type="number"
                                value={formData.platforms.youtube?.avgViews || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    platforms: {
                                        ...formData.platforms,
                                        youtube: { ...formData.platforms.youtube!, avgViews: Number(e.target.value) }
                                    }
                                })}
                                placeholder="25000"
                                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>
                </div>
            )}

            {tiktokEnabled && (
                <div className="glass-card p-6 rounded-xl space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-black border border-white/20">
                            <span className="text-white text-sm font-bold">TT</span>
                        </div>
                        <h3 className="font-medium text-white">TikTok</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Username</label>
                            <input
                                type="text"
                                value={formData.platforms.tiktok?.username || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    platforms: {
                                        ...formData.platforms,
                                        tiktok: { ...formData.platforms.tiktok, username: e.target.value, followers: formData.platforms.tiktok?.followers || 0, engagement: formData.platforms.tiktok?.engagement || 0 }
                                    }
                                })}
                                placeholder="username"
                                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Followers</label>
                            <input
                                type="number"
                                value={formData.platforms.tiktok?.followers || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    platforms: {
                                        ...formData.platforms,
                                        tiktok: { ...formData.platforms.tiktok!, followers: Number(e.target.value) }
                                    }
                                })}
                                placeholder="75000"
                                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Engagement %</label>
                            <input
                                type="number"
                                step="0.1"
                                value={formData.platforms.tiktok?.engagement || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    platforms: {
                                        ...formData.platforms,
                                        tiktok: { ...formData.platforms.tiktok!, engagement: Number(e.target.value) }
                                    }
                                })}
                                placeholder="5.0"
                                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Rate Card & Past Brands</h2>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-4">Your Rates (USD)</label>
                <div className="grid md:grid-cols-2 gap-4">
                    {instagramEnabled && (
                        <>
                            <div>
                                <label className="block text-xs text-slate-400 mb-2">Instagram Post</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                    <input
                                        type="number"
                                        value={formData.rates.instagramPost || ''}
                                        onChange={(e) => setFormData({ ...formData, rates: { ...formData.rates, instagramPost: Number(e.target.value) } })}
                                        placeholder="500"
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 pl-8 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-2">Instagram Reel</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                    <input
                                        type="number"
                                        value={formData.rates.instagramReel || ''}
                                        onChange={(e) => setFormData({ ...formData, rates: { ...formData.rates, instagramReel: Number(e.target.value) } })}
                                        placeholder="750"
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 pl-8 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-2">Instagram Story (set)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                    <input
                                        type="number"
                                        value={formData.rates.instagramStory || ''}
                                        onChange={(e) => setFormData({ ...formData, rates: { ...formData.rates, instagramStory: Number(e.target.value) } })}
                                        placeholder="250"
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 pl-8 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {youtubeEnabled && (
                        <>
                            <div>
                                <label className="block text-xs text-slate-400 mb-2">YouTube Video</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                    <input
                                        type="number"
                                        value={formData.rates.youtubeVideo || ''}
                                        onChange={(e) => setFormData({ ...formData, rates: { ...formData.rates, youtubeVideo: Number(e.target.value) } })}
                                        placeholder="2000"
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 pl-8 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-2">YouTube Short</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                    <input
                                        type="number"
                                        value={formData.rates.youtubeShort || ''}
                                        onChange={(e) => setFormData({ ...formData, rates: { ...formData.rates, youtubeShort: Number(e.target.value) } })}
                                        placeholder="400"
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 pl-8 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {tiktokEnabled && (
                        <div>
                            <label className="block text-xs text-slate-400 mb-2">TikTok Video</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                <input
                                    type="number"
                                    value={formData.rates.tiktokVideo || ''}
                                    onChange={(e) => setFormData({ ...formData, rates: { ...formData.rates, tiktokVideo: Number(e.target.value) } })}
                                    placeholder="600"
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 pl-8 focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Past Brand Collaborations</label>
                <p className="text-xs text-slate-400 mb-3">Add brands you've worked with (comma separated)</p>
                <input
                    type="text"
                    value={formData.pastBrands.join(', ')}
                    onChange={(e) => setFormData({ ...formData, pastBrands: e.target.value.split(',').map(b => b.trim()).filter(Boolean) })}
                    placeholder="Nike, Sephora, Samsung, etc."
                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Choose Your Theme</h2>

            <div className="grid md:grid-cols-3 gap-4">
                {(Object.entries(themes) as [ThemeType, typeof themes['minimal']][]).map(([key, value]) => (
                    <button
                        key={key}
                        onClick={() => setTheme(key)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${theme === key
                                ? 'border-indigo-500 bg-indigo-500/10'
                                : 'border-slate-700 hover:border-slate-600'
                            }`}
                    >
                        <div
                            className="h-20 rounded-lg mb-3"
                            style={{ background: value.colors.bg }}
                        />
                        <h3 className="font-medium text-white">{value.name}</h3>
                        <p className="text-sm text-slate-400">{value.preview}</p>
                        {theme === key && (
                            <div className="mt-2 flex items-center gap-1 text-indigo-400 text-sm">
                                <Check className="w-4 h-4" /> Selected
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-950">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 text-sm font-medium mb-4">
                        <FileImage className="w-4 h-4" />
                        Free Tool
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">
                        Media Kit Generator
                    </h1>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Create a professional media kit to share with brands in minutes.
                        Showcase your stats, rates, and past collaborations.
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-2 mb-10">
                    {[1, 2, 3, 4].map((s) => (
                        <button
                            key={s}
                            onClick={() => setStep(s)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${step === s
                                    ? 'bg-indigo-600 text-white'
                                    : step > s
                                        ? 'bg-indigo-600/30 text-indigo-400'
                                        : 'bg-slate-800 text-slate-400'
                                }`}
                        >
                            {step > s ? <Check className="w-5 h-5" /> : s}
                        </button>
                    ))}
                </div>

                {/* Form */}
                <div className="glass-card p-8 rounded-2xl">
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                    {step === 4 && renderStep4()}

                    {/* Navigation */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
                        <button
                            onClick={() => setStep(Math.max(1, step - 1))}
                            className={`px-6 py-3 rounded-xl text-slate-400 hover:text-white transition-colors ${step === 1 ? 'invisible' : ''
                                }`}
                        >
                            Back
                        </button>

                        {step < 4 ? (
                            <button
                                onClick={() => setStep(step + 1)}
                                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors"
                            >
                                Next <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={downloadMediaKit}
                                disabled={!formData.name}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Download className="w-5 h-5" />
                                Download Media Kit
                            </button>
                        )}
                    </div>
                </div>

                {/* Pro Tip */}
                <div className="mt-8 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20">
                    <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-amber-400 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-amber-400">Pro Tip</p>
                            <p className="text-xs text-slate-400">
                                Keep your media kit under 2 pages and update it monthly with fresh stats.
                                Brands prefer concise, data-rich presentations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
