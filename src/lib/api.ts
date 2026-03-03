import { createClient } from '@supabase/supabase-js';

export interface Report {
    title: string;
    content: string;
    category: string;
    market: string;
    language: string;
    score: number;
    filename: string;
    timestamp: string;
    sourceUrl?: string;
}

export interface LogicHiveFunction {
    id: string;
    name: string;
    code: string;
    description: string;
    tags: string[];
    reliability_score: number;
    created_at: string;
}

// 1. News/Reports Supabase Client (Project A - Legacy)
const newsUrl = process.env.NEXT_PUBLIC_NEWS_SUPABASE_URL || '';
const newsKey = process.env.NEXT_PUBLIC_NEWS_SUPABASE_ANON_KEY || '';
// Initialize only if URL is present to prevent startup crash
const newsSupabase = newsUrl ? createClient(newsUrl, newsKey) : null;

// 2. LogicHive & Auth Supabase Client (Project B - New SaaS)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.warn('LogicHive Supabase config missing. Auth features will be disabled.');
}

export const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            storageKey: 'lh-auth-token' // Ensure it doesn't conflict with Project A
        }
    })
    : null as any;

const logicHiveHubUrl = process.env.NEXT_PUBLIC_LOGICHIVE_HUB_URL || 'http://localhost:8000';
console.log('[DEBUG] LogicHive Hub URL loaded:', logicHiveHubUrl);

export async function fetchReports(): Promise<Report[]> {
    // Fallback to primary client if news-specific one is not configured
    const client = newsSupabase || supabase;

    if (!client) {
        console.warn('Supabase client not initialized. Check NEXT_PUBLIC_SUPABASE_URL.');
        return [];
    }

    const { data, error } = await client
        .from('generated_reports')
        .select(`
            title,
            content_md,
            language,
            item_id,
            generated_at,
            raw_items (
                category,
                market,
                url
            )
        `)
        .order('generated_at', { ascending: false })
        .limit(100);

    if (error) {
        console.error('Supabase fetch error:', error);
        throw new Error('Failed to fetch reports from Supabase');
    }

    if (!data) return [];

    // Map Supabase schema back to the UI expected Report interface
    return data.map((r: any) => ({
        title: r.title,
        content: r.content_md,
        category: r.raw_items?.category || 'News',
        market: r.raw_items?.market || 'General',
        language: r.language,
        score: 0,
        filename: r.item_id,
        timestamp: r.generated_at,
        sourceUrl: r.raw_items?.url || undefined,
    }));
}

export async function fetchReportByFilename(filename: string): Promise<Report | null> {
    const client = newsSupabase || supabase;
    if (!client) return null;

    const { data, error } = await client
        .from('generated_reports')
        .select(`
            title,
            content_md,
            language,
            item_id,
            generated_at,
            raw_items (
                category,
                market,
                url
            )
        `)
        .eq('item_id', filename)
        .maybeSingle();

    if (error || !data) {
        console.error('Fetch report error:', error);
        return null;
    }

    return {
        title: data.title,
        content: data.content_md,
        category: (data.raw_items as any)?.category || 'News',
        market: (data.raw_items as any)?.market || 'General',
        language: data.language,
        score: 0,
        filename: data.item_id,
        timestamp: data.generated_at,
        sourceUrl: (data.raw_items as any)?.url || undefined,
    };
}

export async function fetchLogicHiveFunctions(): Promise<LogicHiveFunction[]> {
    try {
        const url = `${logicHiveHubUrl}/api/v1/functions/public/list?limit=20`;
        console.log('[DEBUG] Fetching public functions from:', url);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Hub API error: ${response.statusText}`);
        }
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error('LogicHive Hub fetch error:', error);
        // Fallback or empty list
        return [];
    }
}

export async function fetchCurrentOrganization(): Promise<{ org: any | null; error?: string }> {
    if (!supabase) return { org: null, error: 'Supabase client not initialized' };
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { org: null, error: 'No active session found' };

    try {
        const { data: org, error } = await supabase
            .from('organizations')
            .select('*')
            .eq('user_id', session.user.id)
            .maybeSingle();

        if (error) throw error;
        return { org };
    } catch (err: any) {
        console.error('Fetch Org error:', err);
        return { org: null, error: err.message || 'Failed to fetch organization' };
    }
}

export async function ensureOrganization(): Promise<{ orgKey: string | null; error?: string }> {
    if (!supabase) return { orgKey: null, error: 'Supabase client not initialized' };
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { orgKey: null, error: 'No active session found' };

    try {
        // 1. Check if org exists for THIS user
        const { org, error: fetchError } = await fetchCurrentOrganization();

        if (fetchError) throw new Error(fetchError);

        if (org?.api_key_hash) {
            return { orgKey: org.api_key_hash };
        }

        // 2. Auto-Onboarding: Create new org linked to user
        const newApiKey = `lh_${Math.random().toString(36).substring(2, 15)}`;

        const { data: newOrg, error: insertError } = await supabase
            .from('organizations')
            .insert({
                name: `${session.user.email}'s Org`,
                api_key_hash: newApiKey,
                user_id: session.user.id, // Associate with user
                plan_type: 'free',
                request_limit: 100,
                status: 'active'
            })
            .select()
            .single();

        if (insertError) throw insertError;

        return { orgKey: newApiKey };
    } catch (err: any) {
        console.error('Organization onboarding error:', err);
        return { orgKey: null, error: err.message || 'Failed to onboard organization' };
    }
}

export async function createCheckoutSession(priceId: string): Promise<{ url: string | null; error?: string }> {
    if (!supabase) return { url: null, error: 'Supabase client not initialized' };

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return { url: null, error: 'Please sign in to subscribe' };
    }

    // 2. Ensure Organization exists
    const { orgKey, error: orgError } = await ensureOrganization();
    if (!orgKey) {
        return { url: null, error: orgError || 'No organization found' };
    }

    try {
        console.log('Requesting checkout via proxy...');

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout for proxy

        const response = await fetch('/api/logichive/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Org-Key': orgKey,
                'Authorization': `Bearer ${session.access_token}`
            },
            body: JSON.stringify({
                price_id: priceId,
                success_url: `${window.location.origin}/logichive?billing_success=true&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${window.location.origin}/logichive?billing_cancelled=true`,
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errBody = await response.json().catch(() => ({}));
            console.error('Hub API Error:', response.status, errBody);
            throw new Error(errBody.detail || `Checkout API error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Checkout session created:', data.url || data.checkout_url);
        return { url: data.url || data.checkout_url };
    } catch (error: any) {
        console.error('Checkout creation error:', error);
        if (error.name === 'AbortError') {
            return { url: null, error: 'Connection timed out. Please check if the Hub backend is running.' };
        }
        return { url: null, error: error.message || 'Failed to initiate checkout' };
    }
}

export async function fetchOrganizationMetrics(): Promise<{ usage: number; limit: number; plan: string; error?: string }> {
    const { org, error } = await fetchCurrentOrganization();
    if (error) return { usage: 0, limit: 100, plan: 'free', error };
    if (!org) return { usage: 0, limit: 100, plan: 'free', error: 'No organization found' };

    return {
        usage: org.current_usage_count || 0,
        limit: org.request_limit || 100,
        plan: org.plan_type || 'free'
    };
}

export async function fetchOrganizationFunctions(): Promise<LogicHiveFunction[]> {
    if (!supabase) return [];
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return [];

    const { org } = await fetchCurrentOrganization();
    if (!org) return [];

    try {
        const { data, error } = await supabase
            .from('logichive_functions')
            .select('*')
            .eq('organization_id', org.id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (err) {
        console.error('Fetch Organization Functions error:', err);
        return [];
    }
}
