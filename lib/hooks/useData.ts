'use client';

import { useState, useEffect, useCallback } from 'react';
import { getStore } from '../store';
import {
    User,
    AnalyticsSnapshot,
    ContentPost,
    ContentIdea,
    BrandDeal,
    CreatorProfile,
    RateCalculation,
    HashtagCollection,
    CaptionTemplate,
    AppState,
} from '../database.types';
import { useAuth } from '@/components/AuthProvider';
import {
    fetchAnalytics,
    fetchDeals,
    fetchPosts,
    fetchUser,
    createPost as dbCreatePost,
    updatePost as dbUpdatePost,
    deletePost as dbDeletePost,
    createDeal as dbCreateDeal,
    updateDeal as dbUpdateDeal,
    deleteDeal as dbDeleteDeal,
    updateUserProfile as dbUpdateUser
} from '../data-service';

// Generic hook for store subscription
function useStoreData<T>(selector: (state: AppState) => T): T {
    const store = getStore();
    const [data, setData] = useState<T>(() => selector(store.getState()));

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setData(selector(store.getState()));
        });
        return unsubscribe;
    }, [selector]);

    return data;
}

// User hook
export function useUser() {
    const { user: authUser } = useAuth();
    const store = getStore();
    const storeUser = useStoreData((state) => state.user);
    const [dbUser, setDbUser] = useState<User | null>(null);

    useEffect(() => {
        if (authUser) {
             fetchUser(authUser.id).then(u => {
                 if (u) setDbUser(u);
                 else {
                    // Fallback or potentially create user record here
                    setDbUser({
                        id: authUser.id,
                        email: authUser.email!,
                        name: authUser.user_metadata?.name || 'Creator',
                        tier: 'free',
                        niche: [],
                        created_at: new Date().toISOString()
                    });
                 }
             });
        }
    }, [authUser]);

    const user = authUser ? dbUser : storeUser;

    const updateUser = useCallback(async (updates: Partial<User>) => {
        if (authUser) {
            try {
                const updated = await dbUpdateUser(authUser.id, updates);
                setDbUser(updated);
            } catch (e) {
                console.error("Failed to update user", e);
            }
        } else {
            store.updateUser(updates);
        }
    }, [authUser]);

    return { user, updateUser };
}

// Analytics hook
export function useAnalytics(platform?: string) {
    const { user: authUser } = useAuth();
    const storeAnalytics = useStoreData((state) => state.analytics);
    const [dbAnalytics, setDbAnalytics] = useState<AnalyticsSnapshot[]>([]);

    useEffect(() => {
        if (authUser) {
            fetchAnalytics(authUser.id).then(setDbAnalytics).catch(console.error);
        }
    }, [authUser]);

    const analytics = authUser ? dbAnalytics : storeAnalytics;

    const filtered = platform
        ? analytics.filter((a) => a.platform === platform)
        : analytics;

    const getLatestAnalytics = useCallback(() => {
        const latest: Record<string, AnalyticsSnapshot> = {};
        analytics.forEach((a) => {
            if (!latest[a.platform] || a.snapshot_date > latest[a.platform].snapshot_date) {
                latest[a.platform] = a;
            }
        });
        return latest;
    }, [analytics]);

    const getTotalFollowers = useCallback(() => {
        const latestData = getLatestAnalytics();
        return Object.values(latestData).reduce((sum, a) => sum + (a?.followers || 0), 0);
    }, [getLatestAnalytics]);

    const getTotalViews = useCallback(() => {
        const latestData = getLatestAnalytics();
        return Object.values(latestData).reduce((sum, a) => sum + (a?.avg_views || 0) * 30, 0);
    }, [getLatestAnalytics]);

    const getAvgEngagement = useCallback(() => {
        const latestData = getLatestAnalytics();
        const rates = Object.values(latestData).map((a) => a?.engagement_rate || 0);
        return rates.length > 0 ? rates.reduce((a, b) => a + b, 0) / rates.length : 0;
    }, [getLatestAnalytics]);

    return {
        analytics: filtered,
        latest: getLatestAnalytics(),
        getTotalFollowers,
        getTotalViews,
        getAvgEngagement,
    };
}

// Posts hook
export function usePosts() {
    const { user: authUser } = useAuth();
    const store = getStore();
    const storePosts = useStoreData((state) => state.posts);
    const [dbPosts, setDbPosts] = useState<ContentPost[]>([]);

    const refreshPosts = useCallback(() => {
        if (authUser) {
            fetchPosts(authUser.id).then(setDbPosts).catch(console.error);
        }
    }, [authUser]);

    useEffect(() => {
        refreshPosts();
    }, [refreshPosts]);

    const posts = authUser ? dbPosts : storePosts;

    const addPost = useCallback(async (post: Omit<ContentPost, 'id'>) => {
        if (authUser) {
            // Remove user_id from the object passed to hook if it exists, as createPost handles it
            const { user_id, ...postData } = post as any;
            const newPost = await dbCreatePost(authUser.id, postData);
            refreshPosts();
            return newPost;
        } else {
            return store.addPost(post);
        }
    }, [authUser, refreshPosts]);

    const updatePost = useCallback(async (id: string, updates: Partial<ContentPost>) => {
        if (authUser) {
            await dbUpdatePost(id, updates);
            refreshPosts();
        } else {
            store.updatePost(id, updates);
        }
    }, [authUser, refreshPosts]);

    const deletePost = useCallback(async (id: string) => {
        if (authUser) {
            await dbDeletePost(id);
            refreshPosts();
        } else {
            store.deletePost(id);
        }
    }, [authUser, refreshPosts]);

    return { posts, addPost, updatePost, deletePost };
}

// Ideas hook - Keeping as Demo Store for now as per plan focus on Posts/Deals
export function useIdeas() {
    const store = getStore();
    const ideas = useStoreData((state) => state.ideas);

    const addIdea = useCallback((idea: Omit<ContentIdea, 'id' | 'created_at'>) => {
        return store.addIdea(idea);
    }, []);

    const deleteIdea = useCallback((id: string) => {
        store.deleteIdea(id);
    }, []);

    return { ideas, addIdea, deleteIdea };
}

// Deals hook
export function useDeals() {
    const { user: authUser } = useAuth();
    const store = getStore();
    const storeDeals = useStoreData((state) => state.deals);
    const [dbDeals, setDbDeals] = useState<BrandDeal[]>([]);

    const refreshDeals = useCallback(() => {
        if (authUser) {
            fetchDeals(authUser.id).then(setDbDeals).catch(console.error);
        }
    }, [authUser]);

    useEffect(() => {
        refreshDeals();
    }, [refreshDeals]);

    const deals = authUser ? dbDeals : storeDeals;

    const addDeal = useCallback(async (deal: Omit<BrandDeal, 'id' | 'created_at'>) => {
        if (authUser) {
            const { user_id, ...dealData } = deal as any;
            const newDeal = await dbCreateDeal(authUser.id, dealData);
            refreshDeals();
            return newDeal;
        } else {
            return store.addDeal(deal);
        }
    }, [authUser, refreshDeals]);

    const updateDeal = useCallback(async (id: string, updates: Partial<BrandDeal>) => {
        if (authUser) {
            await dbUpdateDeal(id, updates);
            refreshDeals();
        } else {
            store.updateDeal(id, updates);
        }
    }, [authUser, refreshDeals]);

    const deleteDeal = useCallback(async (id: string) => {
        if (authUser) {
            await dbDeleteDeal(id);
            refreshDeals();
        } else {
            store.deleteDeal(id);
        }
    }, [authUser, refreshDeals]);

    const getDealsByStatus = useCallback((status: BrandDeal['status']) => {
        return deals.filter((d) => d.status === status);
    }, [deals]);

    const getTotalPipeline = useCallback(() => {
        return deals
            .filter((d) => d.status !== 'cancelled')
            .reduce((sum, d) => sum + d.deal_value, 0);
    }, [deals]);

    return { deals, addDeal, updateDeal, deleteDeal, getDealsByStatus, getTotalPipeline };
}

// Creators hook
export function useCreators() {
    const creators = useStoreData((state) => state.creators);

    const filterByNiche = useCallback((niche: string) => {
        return creators.filter((c) => c.niche.includes(niche));
    }, [creators]);

    const sortByFollowers = useCallback((ascending = false) => {
        return [...creators].sort((a, b) =>
            ascending ? a.followers - b.followers : b.followers - a.followers
        );
    }, [creators]);

    const sortByEngagement = useCallback((ascending = false) => {
        return [...creators].sort((a, b) =>
            ascending ? a.engagement_rate - b.engagement_rate : b.engagement_rate - a.engagement_rate
        );
    }, [creators]);

    return { creators, filterByNiche, sortByFollowers, sortByEngagement };
}

// Rate history hook
export function useRateHistory() {
    const store = getStore();
    const history = useStoreData((state) => state.rateHistory);

    const addCalculation = useCallback((calc: Omit<RateCalculation, 'id' | 'calculated_at'>) => {
        store.addRateCalculation(calc);
    }, []);

    return { history, addCalculation };
}

// Hashtags hook
export function useHashtags() {
    const store = getStore();
    const collections = useStoreData((state) => state.hashtagCollections);

    const addCollection = useCallback((collection: Omit<HashtagCollection, 'id' | 'created_at'>) => {
        store.addHashtagCollection(collection);
    }, []);

    return { collections, addCollection };
}

// Captions hook
export function useCaptions() {
    const store = getStore();
    const templates = useStoreData((state) => state.captionTemplates);

    const addTemplate = useCallback((template: Omit<CaptionTemplate, 'id' | 'created_at'>) => {
        store.addCaptionTemplate(template);
    }, []);

    return { templates, addTemplate };
}

// Reset data hook
export function useResetData() {
    const store = getStore();

    const reset = useCallback(() => {
        store.resetToDemo();
    }, []);

    return { reset };
}
