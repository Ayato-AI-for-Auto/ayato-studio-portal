import { MetadataRoute } from 'next'
import { fetchReports } from '../lib/api'

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: 'https://ayato-studio.ai',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://ayato-studio.ai/logichive',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
    ];

    try {
        const reports = await fetchReports();
        if (reports && reports.length > 0) {
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
