'use client';

import {
    User,
    AnalyticsSnapshot,
    ContentPost,
    ContentIdea,
    BrandDeal,
    CreatorProfile,
    CollabMatch,
    DigitalProduct,
    LinkPage,
    EmailSubscriber,
    RateCalculation,
    HashtagCollection,
    CaptionTemplate,
    AppState,
} from './database.types';

const STORAGE_KEY = 'logicloom_data';

// Generate UUID
const generateId = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

// Demo user data
const createDemoUser = (): User => ({
    id: 'demo-user-001',
    email: 'creator@logicloom.io',
    name: 'Alex Creator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    tier: 'pro',
    instagram_username: 'alexcreates',
    tiktok_username: 'alexcreates',
    youtube_channel: 'AlexCreates',
    bio: 'Content creator & digital entrepreneur. Sharing my journey building a media business.',
    niche: ['tech', 'lifestyle', 'business'],
    created_at: new Date().toISOString(),
});

// Demo analytics data
const createDemoAnalytics = (): AnalyticsSnapshot[] => {
    const platforms: ('instagram' | 'tiktok' | 'youtube')[] = ['instagram', 'tiktok', 'youtube'];
    const analytics: AnalyticsSnapshot[] = [];

    platforms.forEach((platform) => {
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);

            const baseFollowers = platform === 'youtube' ? 45000 : platform === 'instagram' ? 28000 : 52000;
            const growth = Math.floor(Math.random() * 500) + 100;

            analytics.push({
                id: generateId(),
                user_id: 'demo-user-001',
                platform,
                followers: baseFollowers + (6 - i) * growth,
                following: Math.floor(Math.random() * 500) + 200,
                engagement_rate: Number((Math.random() * 4 + 2).toFixed(2)),
                avg_likes: Math.floor(Math.random() * 2000) + 500,
                avg_comments: Math.floor(Math.random() * 100) + 20,
                avg_views: Math.floor(Math.random() * 50000) + 10000,
                snapshot_date: date.toISOString().split('T')[0],
                metrics: {
                    posts_count: Math.floor(Math.random() * 10) + 1,
                    reels_count: Math.floor(Math.random() * 5),
                    reach: Math.floor(Math.random() * 100000) + 20000,
                    impressions: Math.floor(Math.random() * 200000) + 50000,
                },
            });
        }
    });

    return analytics;
};

// Demo posts data
const createDemoPosts = (): ContentPost[] => {
    const posts: ContentPost[] = [];
    const titles = [
        'Day in the Life of a Creator',
        'Tech Review: iPhone 16',
        'My Morning Routine 2024',
        'Behind the Scenes: Video Setup',
        'Q&A with Followers',
        'Productivity Tips for Creators',
        'Studio Tour Update',
        'Collab Announcement Video',
    ];

    const statuses: ContentPost['status'][] = ['idea', 'planned', 'scripted', 'filmed', 'published'];
    const platforms: ContentPost['platform'][] = ['instagram', 'tiktok', 'youtube'];
    const postTypes: ContentPost['post_type'][] = ['post', 'reel', 'story', 'video', 'short'];

    titles.forEach((title, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i - 2);

        posts.push({
            id: generateId(),
            user_id: 'demo-user-001',
            platform: platforms[i % platforms.length],
            post_type: postTypes[i % postTypes.length],
            title,
            caption: `Check out this amazing content! #creator #lifestyle #tech`,
            hashtags: ['creator', 'lifestyle', 'content', 'viral'],
            scheduled_date: date.toISOString(),
            scheduled_time: '10:00',
            status: statuses[i % statuses.length],
            notes: i % 2 === 0 ? 'Remember to add B-roll footage' : undefined,
        });
    });

    return posts;
};

// Demo ideas
const createDemoIdeas = (): ContentIdea[] => [
    { id: generateId(), user_id: 'demo-user-001', title: 'React vs Vue comparison', description: 'Deep dive into both frameworks', platform: 'youtube', content_type: 'video', tags: ['tech', 'tutorial'], priority: 'high', created_at: new Date().toISOString() },
    { id: generateId(), user_id: 'demo-user-001', title: 'My desk setup 2024', description: 'Updated home office tour', platform: 'instagram', content_type: 'reel', tags: ['lifestyle', 'setup'], priority: 'medium', created_at: new Date().toISOString() },
    { id: generateId(), user_id: 'demo-user-001', title: 'Creator burnout tips', description: 'Mental health awareness', platform: 'tiktok', content_type: 'short', tags: ['advice', 'creator'], priority: 'high', created_at: new Date().toISOString() },
    { id: generateId(), user_id: 'demo-user-001', title: 'Budget camera guide', description: 'Best cameras under $500', platform: 'youtube', content_type: 'video', tags: ['tech', 'gear'], priority: 'low', created_at: new Date().toISOString() },
    { id: generateId(), user_id: 'demo-user-001', title: 'Answering DMs live', description: 'Community Q&A session', platform: 'instagram', content_type: 'story', tags: ['community'], priority: 'medium', created_at: new Date().toISOString() },
];

// Demo brand deals
const createDemoDeals = (): BrandDeal[] => [
    {
        id: generateId(),
        user_id: 'demo-user-001',
        brand_name: 'TechFlow',
        brand_logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=techflow',
        contact_name: 'Sarah Johnson',
        contact_email: 'sarah@techflow.io',
        deal_value: 2500,
        currency: 'USD',
        status: 'active',
        deliverables: [
            { id: generateId(), type: 'Video', platform: 'youtube', description: '60-90s integration', due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), completed: false },
            { id: generateId(), type: 'Post', platform: 'instagram', description: 'Carousel post', completed: true },
        ],
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        payment_status: 'pending',
        notes: 'Great partnership opportunity',
        created_at: new Date().toISOString(),
    },
    {
        id: generateId(),
        user_id: 'demo-user-001',
        brand_name: 'CreatorGear',
        brand_logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=creatorgear',
        contact_name: 'Mike Chen',
        contact_email: 'mike@creatorgear.com',
        deal_value: 1800,
        currency: 'USD',
        status: 'negotiation',
        deliverables: [
            { id: generateId(), type: 'Review', platform: 'youtube', description: 'Full product review', completed: false },
        ],
        payment_status: 'pending',
        notes: 'Waiting for product samples',
        created_at: new Date().toISOString(),
    },
    {
        id: generateId(),
        user_id: 'demo-user-001',
        brand_name: 'FitLife App',
        brand_logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=fitlife',
        deal_value: 800,
        currency: 'USD',
        status: 'prospect',
        deliverables: [],
        payment_status: 'pending',
        created_at: new Date().toISOString(),
    },
    {
        id: generateId(),
        user_id: 'demo-user-001',
        brand_name: 'CloudHost Pro',
        brand_logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=cloudhost',
        deal_value: 3500,
        currency: 'USD',
        status: 'completed',
        deliverables: [
            { id: generateId(), type: 'Video', platform: 'youtube', description: 'Sponsored segment', completed: true },
            { id: generateId(), type: 'Post', platform: 'instagram', description: 'Story sequence', completed: true },
        ],
        payment_status: 'paid',
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
];

// Demo creators for collabs
const createDemoCreators = (): CreatorProfile[] => [
    {
        id: generateId(),
        user_id: 'creator-001',
        display_name: 'Maya Tech',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
        bio: 'Tech reviewer & software developer sharing coding tips and gadget reviews.',
        niche: ['tech', 'coding', 'reviews'],
        followers: 85000,
        engagement_rate: 4.2,
        portfolio_links: [{ platform: 'youtube', url: 'https://youtube.com/@mayatech', title: 'YouTube Channel' }],
        open_to_collabs: true,
        rate_card: { youtube_video: 2000, instagram_post: 500 },
        location: 'San Francisco, CA',
        languages: ['English', 'Spanish'],
    },
    {
        id: generateId(),
        user_id: 'creator-002',
        display_name: 'Jake Lifestyle',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jake',
        bio: 'Lifestyle vlogger documenting the journey of building a personal brand.',
        niche: ['lifestyle', 'vlog', 'travel'],
        followers: 120000,
        engagement_rate: 5.8,
        portfolio_links: [{ platform: 'instagram', url: 'https://instagram.com/jakelifestyle' }],
        open_to_collabs: true,
        rate_card: { instagram_reel: 800, tiktok_video: 600 },
        location: 'Los Angeles, CA',
        languages: ['English'],
    },
    {
        id: generateId(),
        user_id: 'creator-003',
        display_name: 'Sarah Finance',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        bio: 'Personal finance educator. Making money topics easy to understand.',
        niche: ['finance', 'business', 'education'],
        followers: 250000,
        engagement_rate: 3.9,
        portfolio_links: [{ platform: 'youtube', url: 'https://youtube.com/@sarahfinance' }],
        open_to_collabs: true,
        rate_card: { youtube_video: 4000, instagram_post: 1200 },
        location: 'New York, NY',
        languages: ['English'],
    },
    {
        id: generateId(),
        user_id: 'creator-004',
        display_name: 'Chris Gaming',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris',
        bio: 'Gaming content creator. Streams, reviews, and gaming news.',
        niche: ['gaming', 'entertainment', 'tech'],
        followers: 180000,
        engagement_rate: 6.1,
        portfolio_links: [{ platform: 'youtube', url: 'https://youtube.com/@chrisgaming' }],
        open_to_collabs: true,
        rate_card: { youtube_video: 2500, tiktok_video: 400 },
        location: 'Austin, TX',
        languages: ['English'],
    },
];

// Demo hashtag collections
const createDemoHashtags = (): HashtagCollection[] => [
    { id: generateId(), user_id: 'demo-user-001', name: 'Tech Content', hashtags: ['tech', 'technology', 'gadgets', 'techreview', 'techtok', 'innovation'], created_at: new Date().toISOString() },
    { id: generateId(), user_id: 'demo-user-001', name: 'Lifestyle', hashtags: ['lifestyle', 'dailyvlog', 'dayinmylife', 'routine', 'aesthetic', 'vibes'], created_at: new Date().toISOString() },
    { id: generateId(), user_id: 'demo-user-001', name: 'Viral Boosters', hashtags: ['fyp', 'viral', 'trending', 'explore', 'foryou', 'foryoupage'], created_at: new Date().toISOString() },
];

// Demo caption templates
const createDemoCaptions = (): CaptionTemplate[] => [
    { id: generateId(), user_id: 'demo-user-001', name: 'Product Review Hook', template: '🔥 Is the {product} worth it? Here\'s my honest review after {time} of use...\n\n{content}\n\n💬 Drop your questions below!', category: 'review', created_at: new Date().toISOString() },
    { id: generateId(), user_id: 'demo-user-001', name: 'Tutorial Intro', template: '📚 Learn how to {topic} in under {time}!\n\nSave this for later ⬇️\n\n{steps}\n\n#tutorial #howto', category: 'tutorial', created_at: new Date().toISOString() },
    { id: generateId(), user_id: 'demo-user-001', name: 'Engagement Question', template: '{hook}\n\n👇 Tell me in the comments: {question}\n\nI read every single one! 💬', category: 'engagement', created_at: new Date().toISOString() },
];

// Initial state factory
const createInitialState = (): AppState => ({
    user: createDemoUser(),
    analytics: createDemoAnalytics(),
    posts: createDemoPosts(),
    ideas: createDemoIdeas(),
    deals: createDemoDeals(),
    creators: createDemoCreators(),
    collabs: [],
    products: [],
    linkPage: null,
    subscribers: [],
    rateHistory: [],
    hashtagCollections: createDemoHashtags(),
    captionTemplates: createDemoCaptions(),
});

// Store class
class DataStore {
    private state: AppState;
    private listeners: Set<() => void> = new Set();

    constructor() {
        this.state = this.loadFromStorage() || createInitialState();
        this.saveToStorage();
    }

    private loadFromStorage(): AppState | null {
        if (typeof window === 'undefined') return null;
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch {
            return null;
        }
    }

    private saveToStorage(): void {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
        }
    }

    private notify(): void {
        this.listeners.forEach((listener) => listener());
        this.saveToStorage();
    }

    subscribe(listener: () => void): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    getState(): AppState {
        return this.state;
    }

    resetToDemo(): void {
        this.state = createInitialState();
        this.notify();
    }

    // User operations
    updateUser(updates: Partial<User>): void {
        if (this.state.user) {
            this.state.user = { ...this.state.user, ...updates };
            this.notify();
        }
    }

    // Posts operations
    getPosts(): ContentPost[] {
        return this.state.posts;
    }

    addPost(post: Omit<ContentPost, 'id'>): ContentPost {
        const newPost = { ...post, id: generateId() };
        this.state.posts.push(newPost);
        this.notify();
        return newPost;
    }

    updatePost(id: string, updates: Partial<ContentPost>): void {
        const index = this.state.posts.findIndex((p) => p.id === id);
        if (index !== -1) {
            this.state.posts[index] = { ...this.state.posts[index], ...updates };
            this.notify();
        }
    }

    deletePost(id: string): void {
        this.state.posts = this.state.posts.filter((p) => p.id !== id);
        this.notify();
    }

    // Ideas operations
    getIdeas(): ContentIdea[] {
        return this.state.ideas;
    }

    addIdea(idea: Omit<ContentIdea, 'id' | 'created_at'>): ContentIdea {
        const newIdea = { ...idea, id: generateId(), created_at: new Date().toISOString() };
        this.state.ideas.push(newIdea);
        this.notify();
        return newIdea;
    }

    deleteIdea(id: string): void {
        this.state.ideas = this.state.ideas.filter((i) => i.id !== id);
        this.notify();
    }

    // Deals operations
    getDeals(): BrandDeal[] {
        return this.state.deals;
    }

    addDeal(deal: Omit<BrandDeal, 'id' | 'created_at'>): BrandDeal {
        const newDeal = { ...deal, id: generateId(), created_at: new Date().toISOString() };
        this.state.deals.push(newDeal);
        this.notify();
        return newDeal;
    }

    updateDeal(id: string, updates: Partial<BrandDeal>): void {
        const index = this.state.deals.findIndex((d) => d.id === id);
        if (index !== -1) {
            this.state.deals[index] = { ...this.state.deals[index], ...updates };
            this.notify();
        }
    }

    deleteDeal(id: string): void {
        this.state.deals = this.state.deals.filter((d) => d.id !== id);
        this.notify();
    }

    // Analytics operations
    getAnalytics(platform?: string): AnalyticsSnapshot[] {
        if (platform) {
            return this.state.analytics.filter((a) => a.platform === platform);
        }
        return this.state.analytics;
    }

    getLatestAnalytics(): { instagram?: AnalyticsSnapshot; tiktok?: AnalyticsSnapshot; youtube?: AnalyticsSnapshot } {
        const latest: Record<string, AnalyticsSnapshot> = {};
        this.state.analytics.forEach((a) => {
            if (!latest[a.platform] || a.snapshot_date > latest[a.platform].snapshot_date) {
                latest[a.platform] = a;
            }
        });
        return latest;
    }

    // Creators operations
    getCreators(): CreatorProfile[] {
        return this.state.creators;
    }

    // Rate history operations
    addRateCalculation(calc: Omit<RateCalculation, 'id' | 'calculated_at'>): void {
        this.state.rateHistory.push({
            ...calc,
            id: generateId(),
            calculated_at: new Date().toISOString(),
        });
        this.notify();
    }

    getRateHistory(): RateCalculation[] {
        return this.state.rateHistory;
    }

    // Hashtag collections
    getHashtagCollections(): HashtagCollection[] {
        return this.state.hashtagCollections;
    }

    addHashtagCollection(collection: Omit<HashtagCollection, 'id' | 'created_at'>): void {
        this.state.hashtagCollections.push({
            ...collection,
            id: generateId(),
            created_at: new Date().toISOString(),
        });
        this.notify();
    }

    // Caption templates
    getCaptionTemplates(): CaptionTemplate[] {
        return this.state.captionTemplates;
    }

    addCaptionTemplate(template: Omit<CaptionTemplate, 'id' | 'created_at'>): void {
        this.state.captionTemplates.push({
            ...template,
            id: generateId(),
            created_at: new Date().toISOString(),
        });
        this.notify();
    }
}

// Singleton instance
let storeInstance: DataStore | null = null;

export const getStore = (): DataStore => {
    if (!storeInstance) {
        storeInstance = new DataStore();
    }
    return storeInstance;
};

export { DataStore, generateId };
