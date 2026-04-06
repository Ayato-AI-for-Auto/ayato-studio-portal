import type { MetadataRoute } from 'next'
import { fetchReports } from '../lib/api'
import { getLocalArticles } from '../lib/local-content'

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://ayato-studio.ai';

    // 1. 固定ページ
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/reports`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
    ];

    let allPages = [...staticPages];

    // 2. AIレポート (外部API)
    try {
        const reports = await fetchReports();
        if (reports && reports.length > 0) {
            const reportPages: MetadataRoute.Sitemap = reports.map((report) => ({
                url: `${baseUrl}/reports/${report.slug}`,
                lastModified: new Date(report.timestamp),
                changeFrequency: 'weekly',
                priority: 0.7,
            }));
            allPages = [...allPages, ...reportPages];
        }
    } catch {
        // ...
    }

    // 3. ローカルブログ記事
    try {
        const blogArticles = getLocalArticles('blog');
        const blogPages: MetadataRoute.Sitemap = blogArticles.map((article) => ({
            url: `${baseUrl}/blog/${article.slug}`,
            lastModified: new Date(article.date),
            changeFrequency: 'monthly',
            priority: 0.8,
        }));
        allPages = [...allPages, ...blogPages];
    } catch {
        // ...
    }

    // 4. ローカルサービス紹介
    try {
        const serviceArticles = getLocalArticles('services');
        const servicePages: MetadataRoute.Sitemap = serviceArticles.map((article) => ({
            url: `${baseUrl}/services/${article.slug}`,
            lastModified: new Date(article.date),
            changeFrequency: 'monthly',
            priority: 0.8,
        }));
        allPages = [...allPages, ...servicePages];
    } catch {
        // ...
    }

    return allPages;
}
