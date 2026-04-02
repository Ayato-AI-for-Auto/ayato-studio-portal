import { Suspense } from "react";
import { fetchReports } from "@/lib/api";
import { getLocalContent } from "@/lib/local-content";
import ReportCard from "@/components/ReportCard";
import Link from 'next/link';

// Home Page - Ayato Studio Intelligence Portal

async function ServicesSection() {
  const services = getLocalContent('services').slice(0, 3);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
      {services.map((service) => (
        <Link key={service.slug} href={`/services/${service.slug}`} className="group p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-500">
          <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.285a2 2 0 01-1.963 0l-.628-.285a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547V18.14a2 2 0 001.022.547l2.387.477a6 6 0 003.86-.517l.628-.285a2 2 0 011.963 0l.628.285a6 6 0 003.86.517l2.387.477a2 2 0 001.022-.547V15.428z" />
            </svg>
          </div>
          <h4 className="text-xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
            {service.title.split(' - ')[0]}
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {service.description}
          </p>
        </Link>
      ))}
    </div>
  );
}

async function FeaturedBlogSection() {
  const aiReports = await fetchReports();
  const weekly = aiReports.filter(r => r.category === "Weekly").slice(0, 1);
  const local = getLocalContent('blog').slice(0, 1);

  const featured = [
    ...weekly.map(r => ({ ...r, type: 'Weekly Review', href: `/reports/${r.slug}` })),
    ...local.map(l => ({ ...l, type: 'Human Insight', href: `/blog/${l.slug}`, timestamp: l.date }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
      {featured.map((item: any) => (
        <Link key={item.id || item.slug} href={item.href} className="group relative aspect-[16/9] md:aspect-auto overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.02]">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-10 z-20 w-full">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest mb-4">
                    {item.type}
                </span>
                <h3 className="text-2xl md:text-4xl font-black text-white mb-4 line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
                    {item.title}
                </h3>
                <div className="flex items-center text-blue-500 text-xs font-black uppercase tracking-widest">
                    Read Analysis <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
            </div>
        </Link>
      ))}
    </div>
  );
}

async function ReportsList() {
  const reports = await fetchReports();
  const fastNews = reports.filter(r => r.category !== "Weekly").slice(0, 6);

  if (fastNews.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {fastNews.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-purple-600/10 blur-[120px] animation-delay-2000 animate-pulse" />
      </div>

      <div className="container mx-auto px-6 pt-20 md:pt-40">
        {/* --- Hero Section --- */}
        <div className="relative mb-32">
          <div className="glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-blue-400/80">Ayato Studio // Core Systems Online</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.8] mb-12">
            INTELLIGENCE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">SYNERGY</span>
          </h1>
          
          <div className="max-w-3xl">
            <p className="text-xl md:text-3xl text-gray-400 font-medium leading-tight tracking-tight mb-12">
                AI 速報、高度な週刊分析、そして独自のサービス。<br />
                Ayato Studio は、情報の洪水から価値を抽出する。<br />
                次世代のインテリジェンス・プラットフォーム。
            </p>
            <div className="flex gap-4">
                <Link href="/blog" className="px-8 py-4 rounded-full bg-blue-600 text-white font-black uppercase tracking-widest hover:bg-blue-700 transition-colors">
                    View Blog
                </Link>
                <Link href="/reports" className="px-8 py-4 rounded-full glass border-white/10 text-white font-black uppercase tracking-widest hover:bg-white/5 transition-colors">
                    Latest reports
                </Link>
            </div>
          </div>
        </div>

        {/* --- Tier 3: Services (Portfolio) --- */}
        <section className="mb-40">
           <div className="flex flex-col mb-12">
                <h2 className="text-xs uppercase font-black tracking-[0.4em] text-blue-500 mb-2">Tier 03 // Portfolio</h2>
                <span className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">Core Infrastructure</span>
            </div>
            <Suspense fallback={<div className="h-40 glass rounded-[2.5rem] animate-pulse" />}>
                <ServicesSection />
            </Suspense>
        </section>

        {/* --- Tier 2: Blog (Weekly + Human) --- */}
        <section className="mb-40">
            <div className="flex items-center justify-between mb-12 pb-8 border-b border-white/5">
                <div className="flex flex-col">
                    <h2 className="text-xs uppercase font-black tracking-[0.4em] text-purple-500 mb-2">Tier 02 // Analysis</h2>
                    <span className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">Featured Insights</span>
                </div>
                <Link href="/blog" className="hidden md:block text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                    Explore all blog posts →
                </Link>
            </div>
            <Suspense fallback={<div className="h-64 glass rounded-[3rem] animate-pulse" />}>
                <FeaturedBlogSection />
            </Suspense>
        </section>

        {/* --- Tier 1: Reports (Fast News) --- */}
        <section className="mb-32">
          <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
              <div className="flex flex-col">
                <h2 className="text-xs uppercase font-black tracking-[0.4em] text-gray-500 mb-2">Tier 01 // Fast News</h2>
                <span className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">Market Intelligence</span>
              </div>
              <Link href="/reports" className="hidden md:block text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                    View all reports →
              </Link>
          </div>
          <Suspense fallback={<div className="grid grid-cols-3 gap-8"><div className="h-64 glass animate-pulse rounded-3xl" /><div className="h-64 glass animate-pulse rounded-3xl" /><div className="h-64 glass animate-pulse rounded-3xl" /></div>}>
            <ReportsList />
          </Suspense>
        </section>

        <footer className="py-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Built by Ayato Studio</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-700">© 2026 Intelligence Synergy</span>
            </div>
            <div className="flex gap-8">
                <Link href="/privacy" className="text-[10px] font-black uppercase tracking-widest text-gray-700 hover:text-gray-500">Privacy</Link>
                <Link href="/terms" className="text-[10px] font-black uppercase tracking-widest text-gray-700 hover:text-gray-500">Terms</Link>
            </div>
        </footer>
      </div>
    </main>
  );
}
