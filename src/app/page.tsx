import { Suspense } from "react";
import { fetchReports } from "@/lib/api";
import ReportCard from "@/components/ReportCard";

// Ayato Studio Portal - Static Export Mode

async function ReportsList() {
  const reports = await fetchReports();

  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="glass rounded-full p-8 mb-6 animate-pulse">
            <svg className="w-12 h-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        </div>
        <h3 className="text-xl font-black text-white/40 tracking-widest uppercase">No Intel Found</h3>
        <p className="text-gray-600 mt-2 font-medium">Ayato is currently scanning the markets...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-purple-600/10 blur-[120px] animation-delay-2000 animate-pulse" />
      </div>

      <div className="container mx-auto px-6 py-20 md:py-32">
        {/* Hero Section */}
        <div className="relative mb-24 md:mb-32">
          <div className="glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-blue-400/80">System Live // Intelligence Core</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.85] mb-8">
            AYATO<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">STUDIO</span>
          </h1>
          
          <div className="max-w-2xl">
            <p className="text-lg md:text-2xl text-gray-400 font-medium leading-relaxed tracking-tight">
              Privacy-first financial intelligence. <br className="hidden md:block" />
              Automated analysis powered by advanced generative AI.
            </p>
          </div>
        </div>

        {/* Intelligence Section */}
        <section id="intel" className="relative">
          <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
              <div className="flex flex-col">
                <h2 className="text-xs uppercase font-black tracking-[0.3em] text-gray-500 mb-2">Market Reports</h2>
                <span className="text-2xl md:text-4xl font-black text-white tracking-tight">LATEST INTEL</span>
              </div>
              <div className="hidden md:flex gap-4">
                  <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Global Coverage</span>
                      <span className="text-xs font-black text-white">ACTIVE</span>
                  </div>
              </div>
          </div>

          <ReportsList />
        </section>

        {/* Footer info */}
        <footer className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Built for the future of finance</span>
            </div>
            <div className="flex items-center gap-8">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-700">© 2026 Ayato Studio</span>
            </div>
        </footer>
      </div>
    </main>
  );
}
