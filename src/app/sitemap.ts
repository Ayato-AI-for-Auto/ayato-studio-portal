import { MetadataRoute } from 'next'

export const dynamic = 'force-static';

const MANAGER_URL = process.env.NEXT_PUBLIC_MANAGER_URL || 'http://localhost:8000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: 'https://ayato-studio.ai',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
    ];

    try {
        const response = await fetch(`${MANAGER_URL}/api/v1/reports`, { next: { revalidate: 3600 } });
        if (response.ok) {
            const reports = await response.json();
            const reportPages: MetadataRoute.Sitemap = reports.map((report: any) => ({
                url: `https://ayato-studio.ai/reports/${report.filename}`,
                lastModified: new Date(report.timestamp),
                changeFrequency: 'weekly',
                priority: 0.8,
            }));
            return [...staticPages, ...reportPages];
        }
    } catch (error) {
        console.error('Failed to fetch reports for sitemap:', error);
    }

    return staticPages;
}
