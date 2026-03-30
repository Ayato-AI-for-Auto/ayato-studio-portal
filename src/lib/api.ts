import { createClient } from '@supabase/supabase-js';

export interface Report {
  id: string; 
  filename: string; // The original URL or unique identifier (item_id in DB)
  slug: string; // Used for safe FS paths and routing
  title: string;
  category: string;
  language: string;
  timestamp: string;
  market: string;
  author: string;
  content: string;
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

const isBuild = process.env.NODE_ENV === 'production' && typeof window === 'undefined';

// Helper to create a safe slug from filename/URL (fixes Windows path length issues)
function getSlug(filename: string): string {
  if (!filename) return "report";
  try {
    const url = new URL(filename);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1] || "article";
    let hash = 0;
    for (let i = 0; i < filename.length; i++) {
        hash = ((hash << 5) - hash) + filename.charCodeAt(i);
        hash |= 0;
    }
    return `${lastPart.substring(0, 30)}-${Math.abs(hash).toString(36)}`;
  } catch (e) {
    // Not a URL, just sanitize
    return filename.replace(/[^a-z0-9]/gi, '-').toLowerCase().substring(0, 50);
  }
}

export async function fetchReports(): Promise<Report[]> {
  if (!supabase) {
    console.warn('[API] Supabase client not initialized.');
    return [];
  }

  console.log('[API] Fetching reports from generated_reports...');
  
  // 1. Attempt with join first (matching current DB schema: item_id, content_md, generated_at)
  const { data, error } = await supabase
    .from('generated_reports')
    .select(`
      id,
      item_id,
      title,
      category,
      generated_at,
      market,
      language,
      content_md,
      raw_items!left (
        category,
        market,
        url,
        content
      )
    `)
    .order('generated_at', { ascending: false })
    .limit(100);

  if (error) {
    console.warn('[API] Main fetch failed, attempting fallback (PGRST200 recovery):', error.message);
    
    // 2. Fallback: Fetch without join
    const { data: fallbackData, error: fallbackError } = await supabase
      .from('generated_reports')
      .select('id, item_id, title, category, generated_at, market, language, content_md')
      .order('generated_at', { ascending: false })
      .limit(100);

    if (fallbackError) {
      console.error('[API] Fallback fetch also failed:', fallbackError.message);
      return [];
    }

    return (fallbackData || []).map((r: any) => ({
      id: String(r.id),
      filename: r.item_id,
      slug: getSlug(r.item_id),
      title: r.title || 'Untitled Report',
      category: r.category || 'General',
      language: r.language || 'jp',
      timestamp: r.generated_at || new Date().toISOString(),
      market: r.market || 'Global',
      author: 'Ayato Reporter',
      content: r.content_md || '',
      sourceUrl: undefined
    }));
  }

  // 3. Process main result
  return (data || []).map((r: any) => ({
    id: String(r.id),
    filename: r.item_id,
    slug: getSlug(r.item_id),
    title: r.title || 'Untitled Report',
    category: r.raw_items?.category || r.category || 'AI/Tech',
    language: r.language || 'jp',
    timestamp: r.generated_at || new Date().toISOString(),
    market: r.raw_items?.market || r.market || 'Global',
    author: 'Ayato Reporter',
    content: r.content_md || r.raw_items?.content || '',
    sourceUrl: r.raw_items?.url || undefined
  }));
}

export async function fetchReportByFilename(slugOrFilename: string): Promise<Report | null> {
  if (!supabase) return null;
  console.log(`[API] Fetching single report by slug or filename: ${slugOrFilename}`);
  
  const allReports = await fetchReports();
  // Find by slug first (for new routing), then fallback to filename/item_id
  const report = allReports.find(r => r.slug === slugOrFilename || r.filename === slugOrFilename);
  
  return report || null;
}

export async function createCheckoutSession(priceId: string): Promise<{ url?: string; error?: string }> {
  if (!supabase) return { error: 'Supabase client not initialized' };
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
      return { error: 'Authentication required' };
  }

  try {
      // Integration point for LogicHive payment gateway
      console.log(`[API] Initiating checkout for plan: ${priceId}`);
      // Placeholder for actual stripe/payment redirect
      return { error: 'Payment gateway integration in progress' };
  } catch (err: any) {
      return { error: err.message || 'Checkout failed' };
  }
}

export async function fetchLogicHiveFunctions(): Promise<LogicHiveFunction[]> {
    if (isBuild) return [];
    try {
        const url = `${process.env.NEXT_PUBLIC_LOGICHIVE_HUB_URL || 'http://localhost:8000'}/api/v1/functions/public/list?limit=10`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Hub API error: ${response.statusText}`);
        return await response.json() || [];
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
    } catch (err: any) {
        console.error('Fetch Org error:', err);
        return { org: null, error: err.message || 'Failed to fetch organization' };
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
