import { Suspense } from "react";
import { fetchReports } from "@/lib/api";
import { getLocalArticles } from "@/lib/local-content";
import Link from 'next/link';

// blog/page.tsx - Combines Weekly AI reviews and Human local articles
async function BlogList() {
  // 1. Fetch AI reports and filter for "Weekly" category
  const aiReports = await fetchReports();
  const weeklyReviews = aiReports.filter(r => r.category === "Weekly");

  // 2. Fetch Local Markdown articles
  const localArticles = getLocalArticles('blog');

  // 3. Map local articles to a similar structure for display
  const mappedLocal = localArticles.map(a => ({
    id: a.slug,
    title: a.title,
    category: "Human Insight",
    timestamp: a.date,
    market: "Editorial",
    content: a.description,
    slug: `/blog/${a.slug}`,
    isLocal: true
  }));

  const allPosts = [
    ...weeklyReviews.map(r => ({ ...r, isLocal: false, slug: `/reports/${r.slug}` })),
    ...mappedLocal
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  if (allPosts.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">No blog posts found yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {allPosts.map((post) => (
        <div key={post.id} className="relative group">
            {/* Custom Card for Blog */}
            <Link href={post.slug} className="block p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-500 group">
                <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                        {post.category}
                    </span>
                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                        {new Date(post.timestamp).toLocaleDateString()}
                    </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-blue-400 transition-colors mb-4 line-clamp-2 leading-tight">
                    {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-8">
                    {post.content.replace(/[#*`]/g, '').substring(0, 150)}...
                </p>
                <div className="flex items-center text-blue-500 text-xs font-black uppercase tracking-[0.2em]">
                    Read Full Analysis <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
            </Link>
        </div>
      ))}
    </div>
  );
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-none">
            INTELLIGENCE<br />
            <span className="text-blue-500">BLOG</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            AI が生成する週刊インテリジェンス・レビューと、<br className="hidden md:block" />
            人間による技術・ビジョンについての考察を統合したインサイト・ハブ。
          </p>
        </div>

        <Suspense fallback={<div className="animate-pulse text-gray-700 font-black">Decrypting insights...</div>}>
          <BlogList />
        </Suspense>
      </div>
    </main>
  );
}
