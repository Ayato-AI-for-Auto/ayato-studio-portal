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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchReports(): Promise<Report[]> {
    // Phase 3: Direct DB Query instead of Intermediate API
    const { data, error } = await supabase
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
