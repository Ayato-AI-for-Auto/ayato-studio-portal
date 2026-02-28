import Link from "next/link";
import ReportStream from "../components/ReportStream";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1)_0%,rgba(5,5,5,1)_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Animated Gradient Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full -z-10" />

      <header className="border-b border-white/5 bg-black/40 backdrop-blur-2xl sticky top-0 z-50">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-xl shadow-lg shadow-blue-500/40 transform hover:rotate-6 transition-transform">
              A
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Ayato Studio <span className="text-blue-500">Portal</span></h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Intelligence Orchestration</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#reports" className="hover:text-white transition-colors cursor-pointer">Reports</a>
            <Link href="/logichive" className="hover:text-white transition-colors">LogicHive (SaaS)</Link>
            <a href="#" className="hover:text-white transition-colors">Enterprise</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-medium text-gray-400 hover:text-white">Sign In</button>
            <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden">
              <div className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-8 animate-bounce">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Ayato Studio 2.0 is Live
          </div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            Decoupled <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Intelligence.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            The orchestration layer for autonomous analysis.
            Stateless agents, persistent memory, and high-fidelity reporting for the modern business landscape.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#reports" className="w-full sm:w-auto rounded-full bg-white px-8 py-4 text-sm font-black text-black transition-all hover:bg-gray-200 hover:scale-105 active:scale-95 shadow-2xl shadow-white/10">
              View Live Reports
            </a>
            <Link href="/logichive" className="w-full sm:w-auto rounded-full bg-white/5 border border-white/10 px-8 py-4 text-sm font-black text-white backdrop-blur-xl transition-all hover:bg-white/10">
              Explore LogicHive
            </Link>
          </div>
        </div>
      </div>

      {/* Projects Grid Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="#reports" className="group p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-8xl font-black">01</span>
            </div>
            <div className="relative z-10">
              <div className="h-12 w-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500 mb-6 font-black group-hover:scale-110 transition-transform">
                R
              </div>
              <h3 className="text-3xl font-black mb-4 group-hover:text-blue-400 transition-colors">Ayato Reporter</h3>
              <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
                Autonomous market intelligence engine delivering deep-dive reports on AI trends and research.
              </p>
            </div>
          </Link>

          <Link href="/logichive" className="group p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-8xl font-black">02</span>
            </div>
            <div className="relative z-10">
              <div className="h-12 w-12 rounded-2xl bg-cyan-600/20 flex items-center justify-center text-cyan-500 mb-6 font-black group-hover:scale-110 transition-transform">
                L
              </div>
              <h3 className="text-3xl font-black mb-4 group-hover:text-cyan-400 transition-colors">LogicHive (SaaS)</h3>
              <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
                The logic warehouse for AI agents. Push, verify, and reuse functions across your organization.
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section id="reports" className="mx-auto max-w-7xl px-6 py-24 scroll-mt-20">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-blue-500 font-bold text-xs uppercase tracking-widest mb-4">
              <div className="h-px w-8 bg-blue-500/50" />
              Latest Artifacts
            </div>
            <h2 className="text-4xl font-black tracking-tight mb-4">
              Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Stream</span>
            </h2>
            <p className="text-gray-400 max-w-xl">
              Real-time analysis reports generated by the Ayato Intelligence Engine.
              Fully persistent and SEO-optimized insights delivered via Decoupled Orchestration.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 mr-2">Market Sensitivity:</span>
            <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors">Global (Any)</button>
            <button className="px-4 py-2 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-400 text-xs font-bold">Japanese (JP)</button>
          </div>
        </div>

        <ReportStream />
      </section>

      {/* Feature Highlight */}
      < section className="mx-auto max-w-7xl px-6 py-32" >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative h-[400px] rounded-[2.5rem] bg-black border border-white/10 overflow-hidden flex items-center justify-center p-12">
              <div className="text-center">
                <div className="text-6xl font-black mb-4">GCS</div>
                <div className="text-xs text-blue-500 font-black uppercase tracking-[0.3em]">Persistent Memory</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-black mb-6">Built for <span className="text-blue-500">Longevity.</span></h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Unlike ephemeral agents, Ayato Studio utilizes high-performance Google Cloud Storage hooks.
              Every report, every insight, and every advertisement is etched into persistent layers,
              surviving service restarts and ensuring your knowledge base only grows.
            </p>
            <ul className="space-y-4">
              {[
                "Unified Monetization Engine (AdSense & A8.net)",
                "Decoupled Service Orchestration",
                "Dynamic SEO & Sitemap Generation",
                "Stateless Intelligence Workers"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                  <div className="h-5 w-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-500">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section >

      <footer className="mt-24 border-t border-white/5 py-24 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-black">A</div>
                <span className="font-bold text-lg">Ayato Studio</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Next-generation intelligence orchestration and business analysis.
                Leveraging decoupled cloud architectures for maximum scalability and performance.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div>
                <h4 className="font-bold text-white mb-6">Engine</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                  <li><a href="#" className="hover:text-blue-500">Reporter</a></li>
                  <li><a href="#" className="hover:text-blue-500">Portal Manager</a></li>
                  <li><a href="#" className="hover:text-blue-500">Intelligence API</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-6">Social</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                  <li><a href="#" className="hover:text-blue-500">Twitter (X)</a></li>
                  <li><a href="#" className="hover:text-blue-500">GitHub</a></li>
                  <li><a href="#" className="hover:text-blue-500">LinkedIn</a></li>
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h4 className="font-bold text-white mb-6">Legal</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                  <li><a href="#" className="hover:text-blue-500">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-blue-500">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-xs text-gray-600">
              &copy; 2026 Ayato Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
            <div className="flex items-center gap-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-[10px] font-black tracking-widest uppercase">Powered By</span>
              <div className="text-sm font-black text-white/80 tracking-tighter italic">Google Cloud Platform</div>
              <div className="text-sm font-black text-white/80 tracking-tighter italic">Next.js</div>
            </div>
          </div>
        </div>
      </footer>
    </main >
  );
}
