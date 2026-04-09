import { Suspense } from "react";
import { getLocalArticles } from "@/lib/local-content";
import Link from 'next/link';

export const metadata = {
  title: "Academy - Ayato Studio",
  description: "AIを実務で活用するための基礎数学、理論、最新のハック手法を学ぶための教育セクション。",
};

async function AcademyList() {
  const articles = getLocalArticles('academy');

  if (articles.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">No lessons found yet. Under construction.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {articles.map((article) => (
        <div key={article.slug} className="relative group">
            <Link href={`/academy/${article.slug}`} className="block p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-500 group">
                <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                        Academy Series
                    </span>
                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                        {new Date(article.date).toLocaleDateString()}
                    </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-indigo-400 transition-colors mb-4 line-clamp-2 leading-tight">
                    {article.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-8">
                    {article.description || article.content.replace(/[#*`]/g, '').substring(0, 150) + "..."}
                </p>
                <div className="flex items-center text-indigo-500 text-xs font-black uppercase tracking-[0.2em]">
                    Start Learning <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
            </Link>
        </div>
      ))}
    </div>
  );
}

export default function AcademyPage() {
  return (
    <main className="min-h-screen bg-background py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-none">
            AYATO<br />
            <span className="text-indigo-500">ACADEMY</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            「計算できる」だけでなく「本質を理解する」。<br className="hidden md:block" />
            AIエンジニアに必須の数学的素養と、次世代のハック手法を紐解くアカデミー。
          </p>
        </div>

        <Suspense fallback={<div className="animate-pulse text-gray-700 font-black">Initializing curriculum...</div>}>
          <AcademyList />
        </Suspense>
      </div>
    </main>
  );
}
