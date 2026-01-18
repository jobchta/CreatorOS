'use server';

import { PublicRate, Platform } from '@/lib/database.types';

// In-memory store for demo (replace with Supabase in production)
const publicRates = new Map<string, PublicRate>();

function generateId(): string {
    return Math.random().toString(36).substring(2, 10);
}

export async function createPublicRate(data: {
    username: string;
    displayName?: string;
    platform: Platform;
    followers: number;
    niche: string;
    engagementRate: number;
    estimatedMin: number;
    estimatedMax: number;
    bio?: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
        const id = generateId();

        const publicRate: PublicRate = {
            id,
            username: data.username.toLowerCase().replace(/[^a-z0-9]/g, ''),
            display_name: data.displayName,
            platform: data.platform,
            followers: data.followers,
            niche: data.niche,
            engagement_rate: data.engagementRate,
            estimated_min: data.estimatedMin,
            estimated_max: data.estimatedMax,
            bio: data.bio,
            created_at: new Date().toISOString(),
            views_count: 0,
        };

        publicRates.set(id, publicRate);

        return { success: true, id };
    } catch (error) {
        console.error('Error creating public rate:', error);
        return { success: false, error: 'Failed to create public rate card' };
    }
}

export async function getPublicRate(id: string): Promise<PublicRate | null> {
    const rate = publicRates.get(id);

    if (rate) {
        // Increment view count
        rate.views_count += 1;
        publicRates.set(id, rate);
    }

    return rate || null;
}

export async function generatePitchEmail(data: {
    displayName: string;
    platform: Platform;
    followers: number;
    niche: string;
    engagementRate: number;
    estimatedMin: number;
    estimatedMax: number;
    rateCardUrl?: string;
}): Promise<string> {
    const formatFollowers = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    const nicheDisplay = data.niche.charAt(0).toUpperCase() + data.niche.slice(1);
    const platformDisplay = data.platform.charAt(0).toUpperCase() + data.platform.slice(1);

    const email = `Subject: Partnership Opportunity - ${data.displayName || 'Content Creator'}

Hi [Brand Name],

I'm ${data.displayName || 'a content creator'} with ${formatFollowers(data.followers)} engaged followers on ${platformDisplay}, specializing in ${nicheDisplay} content.

My audience consistently engages at ${data.engagementRate}% (well above industry average), which means real attention for brand partners.

Based on my reach and engagement metrics, my rates for sponsored content are:

📊 Rate Range: $${data.estimatedMin.toLocaleString()} - $${data.estimatedMax.toLocaleString()} per post

${data.rateCardUrl ? `📎 View my full rate card: ${data.rateCardUrl}\n` : ''}
I'd love to discuss how we can create authentic, high-performing content for [Brand Name]. Are you open to a quick call this week?

Best,
${data.displayName || '[Your Name]'}

---
Rate calculated with LogicLoom • logicloom.com`;

    return email;
}
