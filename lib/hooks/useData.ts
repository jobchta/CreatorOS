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
    const store = getStore();
    const user = useStoreData((state) => state.user);

    const updateUser = useCallback((updates: Partial<User>) => {
        store.updateUser(updates);
    }, []);

    return { user, updateUser };
}

// Analytics hook
export function useAnalytics(platform?: string) {
    const store = getStore();
    const analytics = useStoreData((state) => state.analytics);

    const filtered = platform
        ? analytics.filter((a) => a.platform === platform)
        : analytics;

    const latest = store.getLatestAnalytics();

    const getTotalFollowers = useCallback(() => {
        const latestData = store.getLatestAnalytics();
        return Object.values(latestData).reduce((sum, a) => sum + (a?.followers || 0), 0);
    }, []);

    const getTotalViews = useCallback(() => {
        const latestData = store.getLatestAnalytics();
        return Object.values(latestData).reduce((sum, a) => sum + (a?.avg_views || 0) * 30, 0);
    }, []);

    const getAvgEngagement = useCallback(() => {
        const latestData = store.getLatestAnalytics();
        const rates = Object.values(latestData).map((a) => a?.engagement_rate || 0);
        return rates.length > 0 ? rates.reduce((a, b) => a + b, 0) / rates.length : 0;
    }, []);

    return {
        analytics: filtered,
        latest,
        getTotalFollowers,
        getTotalViews,
        getAvgEngagement,
    };
}

// Posts hook
export function usePosts() {
    const store = getStore();
    const posts = useStoreData((state) => state.posts);

    const addPost = useCallback((post: Omit<ContentPost, 'id'>) => {
        return store.addPost(post);
    }, []);

    const updatePost = useCallback((id: string, updates: Partial<ContentPost>) => {
        store.updatePost(id, updates);
    }, []);

    const deletePost = useCallback((id: string) => {
        store.deletePost(id);
    }, []);

    return { posts, addPost, updatePost, deletePost };
}

// Ideas hook
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
    const store = getStore();
    const deals = useStoreData((state) => state.deals);

    const addDeal = useCallback((deal: Omit<BrandDeal, 'id' | 'created_at'>) => {
        return store.addDeal(deal);
    }, []);

    const updateDeal = useCallback((id: string, updates: Partial<BrandDeal>) => {
        store.updateDeal(id, updates);
    }, []);

    const deleteDeal = useCallback((id: string) => {
        store.deleteDeal(id);
    }, []);

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
