'use client';

import { useState } from 'react';
import {
    Mail,
    Copy,
    Check,
    Palette,
    User,
    Globe,
    Phone,
    Briefcase,
    Instagram,
    Youtube,
    Twitter,
    Linkedin,
    Sparkles,
    Eye
} from 'lucide-react';

interface SignatureData {
    name: string;
    title: string;
    company: string;
    email: string;
    phone: string;
    website: string;
    instagram: string;
    youtube: string;
    twitter: string;
    linkedin: string;
    tagline: string;
}

type StyleType = 'minimal' | 'professional' | 'creative' | 'bold';

const styles: Record<StyleType, { name: string; preview: string }> = {
    minimal: { name: 'Minimal', preview: 'Clean and simple' },
    professional: { name: 'Professional', preview: 'Corporate ready' },
    creative: { name: 'Creative', preview: 'Stand out' },
    bold: { name: 'Bold', preview: 'Make a statement' },
};

export default function EmailSignaturePage() {
    const [copied, setCopied] = useState(false);
    const [style, setStyle] = useState<StyleType>('professional');
    const [data, setData] = useState<SignatureData>({
        name: '',
        title: 'Content Creator',
        company: '',
        email: '',
        phone: '',
        website: '',
        instagram: '',
        youtube: '',
        twitter: '',
        linkedin: '',
        tagline: '',
    });

    const generateSignatureHTML = () => {
        const socialLinks = [];
        if (data.instagram) socialLinks.push({ name: 'Instagram', url: `https://instagram.com/${data.instagram}`, color: '#E4405F' });
        if (data.youtube) socialLinks.push({ name: 'YouTube', url: `https://youtube.com/${data.youtube}`, color: '#FF0000' });
        if (data.twitter) socialLinks.push({ name: 'X', url: `https://x.com/${data.twitter}`, color: '#000000' });
        if (data.linkedin) socialLinks.push({ name: 'LinkedIn', url: `https://linkedin.com/in/${data.linkedin}`, color: '#0A66C2' });

        const baseStyles = {
            minimal: {
                container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #333333;',
                name: 'font-size: 16px; font-weight: 600; color: #1a1a1a; margin: 0;',
                title: 'font-size: 13px; color: #666666; margin: 4px 0 0 0;',
                divider: 'border-left: 2px solid #e5e5e5; padding-left: 12px; margin-left: 12px;',
                link: 'color: #666666; text-decoration: none;',
                social: 'display: inline-block; margin-right: 8px; color: #666666; text-decoration: none; font-size: 12px;',
            },
            professional: {
                container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #333333;',
                name: 'font-size: 18px; font-weight: 700; color: #1a1a1a; margin: 0;',
                title: 'font-size: 14px; color: #6366f1; margin: 4px 0 0 0; font-weight: 500;',
                divider: 'border-top: 2px solid #6366f1; padding-top: 12px; margin-top: 12px;',
                link: 'color: #6366f1; text-decoration: none;',
                social: 'display: inline-block; margin-right: 12px; text-decoration: none; font-size: 12px;',
            },
            creative: {
                container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #333333;',
                name: 'font-size: 20px; font-weight: 800; background: linear-gradient(90deg, #6366f1, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;',
                title: 'font-size: 14px; color: #666666; margin: 4px 0 0 0;',
                divider: 'border-left: 3px solid; border-image: linear-gradient(180deg, #6366f1, #a855f7) 1; padding-left: 12px; margin-left: 0;',
                link: 'color: #6366f1; text-decoration: none;',
                social: 'display: inline-block; margin-right: 12px; text-decoration: none; font-size: 12px;',
            },
            bold: {
                container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #1a1a2e; color: #ffffff; padding: 16px; border-radius: 8px;',
                name: 'font-size: 20px; font-weight: 700; color: #ffffff; margin: 0;',
                title: 'font-size: 14px; color: #a5b4fc; margin: 4px 0 0 0;',
                divider: 'border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; margin-top: 12px;',
                link: 'color: #a5b4fc; text-decoration: none;',
                social: 'display: inline-block; margin-right: 12px; text-decoration: none; font-size: 12px; color: #a5b4fc;',
            },
        };

        const s = baseStyles[style];

        return `
<table cellpadding="0" cellspacing="0" style="${s.container}">
  <tr>
    <td style="vertical-align: top;">
      <p style="${s.name}">${data.name || 'Your Name'}</p>
      <p style="${s.title}">${data.title}${data.company ? ` at ${data.company}` : ''}</p>
      ${data.tagline ? `<p style="font-size: 12px; color: #888888; margin: 8px 0 0 0; font-style: italic;">"${data.tagline}"</p>` : ''}
      
      <div style="${s.divider}">
        ${data.email ? `<p style="margin: 0 0 4px 0; font-size: 13px;"><a href="mailto:${data.email}" style="${s.link}">${data.email}</a></p>` : ''}
        ${data.phone ? `<p style="margin: 0 0 4px 0; font-size: 13px;"><a href="tel:${data.phone}" style="${s.link}">${data.phone}</a></p>` : ''}
        ${data.website ? `<p style="margin: 0 0 4px 0; font-size: 13px;"><a href="${data.website.startsWith('http') ? data.website : 'https://' + data.website}" style="${s.link}">${data.website}</a></p>` : ''}
      </div>
      
      ${socialLinks.length > 0 ? `
        <div style="margin-top: 12px;">
          ${socialLinks.map(social => `<a href="${social.url}" style="${s.social}"><span style="color: ${social.color};">●</span> ${social.name}</a>`).join(' ')}
        </div>
      ` : ''}
    </td>
  </tr>
</table>
    `.trim();
    };

    const copyToClipboard = () => {
        const html = generateSignatureHTML();

        // Create a temporary element to copy rich HTML
        const blob = new Blob([html], { type: 'text/html' });
        const data = [new ClipboardItem({ 'text/html': blob, 'text/plain': new Blob([html], { type: 'text/plain' }) })];

        navigator.clipboard.write(data).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
            // Fallback to plain text
            navigator.clipboard.writeText(html).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        });
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-950">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 text-sm font-medium mb-4">
                        <Mail className="w-4 h-4" />
                        Free Tool
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">
                        Email Signature Generator
                    </h1>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Create a professional email signature that makes every email a branding opportunity.
                        Copy the HTML and paste into Gmail, Outlook, or any email client.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Form */}
                    <div className="space-y-6">
                        {/* Style Selection */}
                        <div className="glass-card p-6 rounded-2xl">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Palette className="w-5 h-5 text-purple-400" />
                                Choose Style
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {(Object.entries(styles) as [StyleType, typeof styles['minimal']][]).map(([key, value]) => (
                                    <button
                                        key={key}
                                        onClick={() => setStyle(key)}
                                        className={`p-4 rounded-xl border-2 transition-all text-left ${style === key
                                                ? 'border-indigo-500 bg-indigo-500/10'
                                                : 'border-slate-700 hover:border-slate-600'
                                            }`}
                                    >
                                        <h3 className="font-medium text-white text-sm">{value.name}</h3>
                                        <p className="text-xs text-slate-400">{value.preview}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Personal Info */}
                        <div className="glass-card p-6 rounded-2xl">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-emerald-400" />
                                Personal Info
                            </h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData({ ...data, name: e.target.value })}
                                            placeholder="Sarah Johnson"
                                            className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData({ ...data, title: e.target.value })}
                                            placeholder="Content Creator"
                                            className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Company/Brand (optional)</label>
                                    <input
                                        type="text"
                                        value={data.company}
                                        onChange={(e) => setData({ ...data, company: e.target.value })}
                                        placeholder="Your Brand Name"
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Tagline (optional)</label>
                                    <input
                                        type="text"
                                        value={data.tagline}
                                        onChange={(e) => setData({ ...data, tagline: e.target.value })}
                                        placeholder="Helping creators grow their business"
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="glass-card p-6 rounded-2xl">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Phone className="w-5 h-5 text-blue-400" />
                                Contact Info
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                        placeholder="hello@yourbrand.com"
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData({ ...data, phone: e.target.value })}
                                            placeholder="+1 234 567 8900"
                                            className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-2">Website</label>
                                        <input
                                            type="text"
                                            value={data.website}
                                            onChange={(e) => setData({ ...data, website: e.target.value })}
                                            placeholder="yourbrand.com"
                                            className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="glass-card p-6 rounded-2xl">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-pink-400" />
                                Social Links (usernames only)
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2 flex items-center gap-2">
                                        <Instagram className="w-4 h-4" /> Instagram
                                    </label>
                                    <input
                                        type="text"
                                        value={data.instagram}
                                        onChange={(e) => setData({ ...data, instagram: e.target.value })}
                                        placeholder="username"
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2 flex items-center gap-2">
                                        <Youtube className="w-4 h-4" /> YouTube
                                    </label>
                                    <input
                                        type="text"
                                        value={data.youtube}
                                        onChange={(e) => setData({ ...data, youtube: e.target.value })}
                                        placeholder="@channel"
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2 flex items-center gap-2">
                                        <Twitter className="w-4 h-4" /> X (Twitter)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.twitter}
                                        onChange={(e) => setData({ ...data, twitter: e.target.value })}
                                        placeholder="username"
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2 flex items-center gap-2">
                                        <Linkedin className="w-4 h-4" /> LinkedIn
                                    </label>
                                    <input
                                        type="text"
                                        value={data.linkedin}
                                        onChange={(e) => setData({ ...data, linkedin: e.target.value })}
                                        placeholder="username"
                                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="space-y-6">
                        <div className="glass-card p-6 rounded-2xl sticky top-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Eye className="w-5 h-5 text-amber-400" />
                                    Preview
                                </h2>
                                <button
                                    onClick={copyToClipboard}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${copied
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                                        }`}
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            Copy HTML
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Email Preview */}
                            <div className="bg-white rounded-lg p-6 min-h-[200px]">
                                <div dangerouslySetInnerHTML={{ __html: generateSignatureHTML() }} />
                            </div>

                            {/* Instructions */}
                            <div className="mt-6 p-4 bg-slate-800/50 rounded-xl">
                                <h3 className="text-sm font-medium text-white mb-3">How to use:</h3>
                                <ol className="text-sm text-slate-400 space-y-2">
                                    <li>1. Click "Copy HTML" above</li>
                                    <li>2. Open Gmail/Outlook settings → Signature</li>
                                    <li>3. Paste the signature (Ctrl/Cmd + V)</li>
                                    <li>4. Save your settings</li>
                                </ol>
                            </div>

                            {/* Pro Tip */}
                            <div className="mt-4 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20">
                                <div className="flex items-start gap-3">
                                    <Sparkles className="w-5 h-5 text-amber-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-amber-400">Pro Tip</p>
                                        <p className="text-xs text-slate-400">
                                            Add your media kit link to your website field! It's a great way to share your rates with brands automatically.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
