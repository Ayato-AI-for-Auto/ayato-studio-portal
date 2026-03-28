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

// Single Unified Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.warn('[API] NEXT_PUBLIC_SUPABASE_URL or ANON_KEY missing.');
}

export const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            storageKey: 'ayato-auth-token'
        }
    })
    : null;

const logicHiveHubUrl = process.env.NEXT_PUBLIC_LOGICHIVE_HUB_URL || 'http://localhost:8000';
console.log('[DEBUG] LogicHive Hub URL loaded:', logicHiveHubUrl);

export async function fetchReports(): Promise<Report[]> {
    if (!supabase) {
        console.warn('[API] Supabase client not initialized.');
        return [];
    }

    console.log('[API] Fetching reports from generated_reports...');
    const { data, error } = await supabase
        .from('generated_reports')
        .select(`
            title,
            content_md,
            language,
            item_id,
            generated_at,
            category,
            market
        `)
        .order('generated_at', { ascending: false })
        .limit(100);

    if (error) {
        console.error('[API] Supabase fetch error:', error);
        throw new Error(`Supabase Error: ${error.message}`);
    }

    if (!data || data.length === 0) {
        console.warn('[API] No data returned from generated_reports.');
        return [];
    }

    console.log(`[API] Successfully fetched ${data.length} reports.`);

    return (data as any[]).map((r) => ({
        title: r.title,
        content: r.content_md,
        category: r.category || 'AI/Tech',
        market: r.market || 'General',
        language: r.language,
        score: 0,
        filename: r.item_id,
        timestamp: r.generated_at,
        sourceUrl: undefined,
    }));
}

export async function fetchReportByFilename(filename: string): Promise<Report | null> {
    if (!supabase) return null;

    console.log(`[API] Fetching single report: ${filename}`);
    const { data, error } = await supabase
        .from('generated_reports')
        .select(`
            title,
            content_md,
            language,
            item_id,
            generated_at,
            category,
            market
        `)
        .eq('item_id', filename)
        .maybeSingle();

    if (error) {
        console.error('[API] Fetch report error:', error);
        return null;
    }

    if (!data) {
        console.warn(`[API] Report not found: ${filename}`);
        return null;
    }

    const r = data as any;

    return {
        title: r.title,
        content: r.content_md,
        category: r.category || 'AI/Tech',
        market: r.market || 'General',
        language: r.language,
        score: 0,
        filename: r.item_id,
        timestamp: r.generated_at,
        sourceUrl: undefined,
    };
}

export async function fetchLogicHiveFunctions(): Promise<LogicHiveFunction[]> {
    try {
        const url = `${logicHiveHubUrl}/api/v1/functions/public/list?limit=20`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Hub API error: ${response.statusText}`);
        }
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error('LogicHive Hub fetch error:', error);
        return [];
    }
}

export interface Organization {
    id: string;
    name: string;
    api_key_hash: string;
    user_id: string;
    plan_type: string;
    request_limit: number;
    current_usage_count: number;
    status: string;
}

export async function fetchCurrentOrganization(): Promise<{ org: Organization | null; error?: string }> {
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
        return { org: org as Organization };
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error('Fetch Org error:', err);
        return { org: null, error: errorMessage || 'Failed to fetch organization' };
    }
}

export async function ensureOrganization(): Promise<{ orgKey: string | null; error?: string }> {
    if (!supabase) return { orgKey: null, error: 'Supabase client not initialized' };
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { orgKey: null, error: 'No active session found' };

    try {
        const { org, error: fetchError } = await fetchCurrentOrganization();
        if (fetchError) throw new Error(fetchError);
        if (org?.api_key_hash) return { orgKey: org.api_key_hash };

        const newApiKey = `lh_${Math.random().toString(36).substring(2, 15)}`;
        const { error: insertError } = await supabase
            .from('organizations')
            .insert({
                name: `${session.user.email}'s Org`,
                api_key_hash: newApiKey,
                user_id: session.user.id,
                plan_type: 'free',
                request_limit: 100,
                status: 'active'
            })
            .select()
            .single();

        if (insertError) throw insertError;
        return { orgKey: newApiKey };
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error('Organization onboarding error:', err);
        return { orgKey: null, error: errorMessage || 'Failed to onboard organization' };
    }
}

export async function createCheckoutSession(priceId: string): Promise<{ url: string | null; error?: string }> {
    if (!supabase) return { url: null, error: 'Supabase client not initialized' };
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { url: null, error: 'Please sign in to subscribe' };

    const { orgKey, error: orgError } = await ensureOrganization();
    if (!orgKey) return { url: null, error: orgError || 'No organization found' };

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

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
            throw new Error(errBody.detail || `Checkout API error: ${response.status}`);
        }

        const data = await response.json();
        return { url: data.url || data.checkout_url };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Checkout creation error:', error);
        return { url: null, error: errorMessage };
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
