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
// Standard names for Supabase Auth integration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
export const supabase = supabaseUrl ? createClient(supabaseUrl, supabaseKey) : null as any;

export async function fetchReports(): Promise<Report[]> {
    if (!newsSupabase) {
        console.warn('News Supabase client not initialized. Check NEXT_PUBLIC_NEWS_SUPABASE_URL.');
        return [];
    }

    const { data, error } = await newsSupabase
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
        score: 0, // Score can be added to generated_reports if needed
        filename: r.item_id,
        timestamp: r.generated_at,
    }));
}

export async function fetchLogicHiveFunctions(): Promise<LogicHiveFunction[]> {
    try {
        const response = await fetch(`${logicHiveHubUrl}/api/v1/functions/public/list?limit=20`);
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

const logicHiveHubUrl = process.env.NEXT_PUBLIC_LOGICHIVE_HUB_URL || 'http://localhost:8080';

export async function ensureOrganization(): Promise<string | null> {
    if (!supabase) return null;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    // Check if org exists
    const { data: existingOrg } = await supabase
        .from('organizations')
        .select('api_key_hash')
        .maybeSingle();

    if (existingOrg?.api_key_hash) {
        return existingOrg.api_key_hash;
    }

    // Auto-Onboarding: Create new org
    // We generate a simple API Key for the user (in a real app, this should be more robust)
    const newApiKey = `lh_${Math.random().toString(36).substring(2, 15)}`;

    const { data: newOrg, error } = await supabase
        .from('organizations')
        .insert({
            name: `${session.user.email}'s Org`,
            api_key_hash: newApiKey, // Store raw for now as simple hash replacement
            plan_type: 'free',
            request_limit: 100
        })
        .select()
        .single();

    if (error) {
        console.error('Failed to auto-onboard organization:', error);
        return null;
    }

    return newApiKey;
}

export async function createCheckoutSession(priceId: string): Promise<string | null> {
    if (!supabase) return null;
    // 1. Get current session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    // 2. Ensure Organization exists
    const orgKey = await ensureOrganization();
    if (!orgKey) {
        console.error('No organization found or created for user');
        return null;
    }

    try {
        const response = await fetch(`${logicHiveHubUrl}/api/v1/billing/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Org-Key': orgKey,
            },
            body: JSON.stringify({
                price_id: priceId,
                success_url: `${window.location.origin}/api/v1/billing/success`,
                cancel_url: `${window.location.origin}/api/v1/billing/cancel`,
            }),
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.detail || 'Checkout failed');
        }

        const data = await response.json();
        return data.checkout_url;
    } catch (error) {
        console.error('Checkout error:', error);
        return null;
    }
}
