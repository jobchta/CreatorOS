import { createClient } from './server';

/**
 * Get the current authenticated user
 * Returns null if no user is logged in
 */
export async function getCurrentUser() {
    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return null;
    }

    return user;
}

/**
 * Get the current user's profile
 * Returns null if no user or profile exists
 */
export async function getCurrentUserProfile() {
    const user = await getCurrentUser();

    if (!user) {
        return null;
    }

    const supabase = await createClient();

    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error || !profile) {
        return null;
    }

    return {
        ...user,
        profile,
    };
}

/**
 * Check if a user is authenticated
 * Use this for quick auth checks without fetching full user data
 */
export async function isAuthenticated(): Promise<boolean> {
    const user = await getCurrentUser();
    return user !== null;
}
