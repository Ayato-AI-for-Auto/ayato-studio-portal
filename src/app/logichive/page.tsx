
import React from 'react';
import Link from 'next/link';
import { fetchLogicHiveFunctions } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function LogicHivePage() {
    const functions = await fetchLogicHiveFunctions();

    return (
        <div className="min-h-screen bg-[#030303] text-white selection:bg-cyan-500/30">
            {/* Background decoration */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-20">
                {/* Nav Header */}
                <header className="flex justify-between items-center mb-24">
                    <Link href="/" className="group flex items-center space-x-2">
                        <span className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 group-hover:from-cyan-400 group-hover:to-blue-600 transition-all duration-300">
                            AYATO STUDIO
                        </span>
                        <span className="text-sm font-medium text-white/30 tracking-widest uppercase">/ PORTAL</span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/50">
                        <Link href="#features" className="hover:text-white transition-colors">FEATURES</Link>
                        <Link href="#explorer" className="hover:text-white transition-colors">EXPLORER</Link>
                        <Link href="#pricing" className="hover:text-white transition-colors">PRICING</Link>
                        <button className="px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                            CONSOLE
                        </button>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="text-center mb-40">
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-bold tracking-widest uppercase">
                        Logic Management Protocol
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
                        Your Logic,<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                            Verified & Secured.
                        </span>
                    </h1>
                    <p className="text-xl text-white/50 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                        LogicHive is the centralized logic warehouse for modern autonomous teams.
                        Collect, verify, and reuse functions across all your AI agents.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
                        <button className="w-full md:w-auto px-10 py-4 rounded-xl bg-white text-black font-bold hover:bg-cyan-400 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            Get Started for Free
                        </button>
                        <button className="w-full md:w-auto px-10 py-4 rounded-xl border border-white/10 bg-white/5 font-bold hover:bg-white/10 transition-all duration-300">
                            Read Documentation
                        </button>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
                    <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm group hover:border-cyan-500/30 transition-all duration-500">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                            📦
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Org-Hive</h3>
                        <p className="text-white/40 leading-relaxed font-medium">
                            Private, isolated namespaces for your company&apos;s mission-critical code assets.
                            Securely share intellectual property within your team.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm group hover:border-purple-500/30 transition-all duration-500">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                            🧪
                        </div>
                        <h3 className="text-2xl font-bold mb-4">AI Lab</h3>
                        <p className="text-white/40 leading-relaxed font-medium">
                            Automated test generation and reliability scoring in secure sandboxes.
                            Every line of code is audited for security and performance.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm group hover:border-blue-500/30 transition-all duration-500">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                            🚀
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Edge-Native</h3>
                        <p className="text-white/40 leading-relaxed font-medium">
                            Blazing fast local integration with your favorite IDE and CLI via MCP.
                            Access global wisdom directly from your terminal.
                        </p>
                    </div>
                </section>

                {/* Explorer Preview */}
                <section id="explorer" className="mb-40">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-bold tracking-tight mb-4">Function Explorer</h2>
                            <p className="text-white/40 font-medium">Recently registered verified logic assets.</p>
                        </div>
                        <button className="text-cyan-400 text-sm font-bold hover:underline">View All Assets →</button>
                    </div>

                    {functions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {functions.map((fn) => (
                                <div key={fn.id} className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                            {fn.tags?.[0] || 'Logic'}
                                        </div>
                                        <div className="text-cyan-400 font-mono text-xs">
                                            Score: {fn.quality_score}
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-bold mb-2 truncate">{fn.name}</h4>
                                    <p className="text-white/30 text-sm mb-4 line-clamp-2 h-10 font-medium">
                                        {fn.description || 'No description provided.'}
                                    </p>
                                    <div className="flex justify-between items-center text-[11px] font-mono text-white/20">
                                        <span>{new Date(fn.created_at).toLocaleDateString()}</span>
                                        <button className="text-white/40 hover:text-white transition-colors">COPY ID</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
                            <p className="text-white/30 font-medium italic">No public assets found. Be the first to push verified logic.</p>
                        </div>
                    )}
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="mb-40">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Choose Your Scale</h2>
                        <p className="text-white/40 font-medium">Start for free, scale as your automation grows.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Free */}
                        <div className="p-10 rounded-[40px] border border-white/5 bg-white/[0.01] flex flex-col">
                            <h4 className="text-xl font-bold mb-2">Starter</h4>
                            <div className="text-4xl font-black mb-6">Free</div>
                            <p className="text-white/30 text-sm mb-8 font-medium">Perfect for individuals exploring AI orchestration.</p>
                            <ul className="space-y-4 mb-10 flex-grow text-sm font-medium text-white/50">
                                <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Shared Community Hub</li>
                                <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Public Verification</li>
                                <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Basic AI Insight</li>
                            </ul>
                            <button className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors font-bold">Get Started</button>
                        </div>

                        {/* Basic */}
                        <div className="p-10 rounded-[40px] border-2 border-cyan-500/50 bg-cyan-500/[0.02] shadow-[0_0_40px_rgba(6,182,212,0.1)] flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 px-4 py-1.5 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest rounded-bl-xl">POPULAR</div>
                            <h4 className="text-xl font-bold mb-2 text-cyan-400">Basic</h4>
                            <div className="text-4xl font-black mb-2">$29<span className="text-lg text-white/30">/mo</span></div>
                            <p className="text-white/40 text-sm mb-8 font-medium">For professional builders and small teams.</p>
                            <ul className="space-y-4 mb-10 flex-grow text-sm font-medium text-white/70">
                                <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Private Org-Hive</li>
                                <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> AI Lab Scoring</li>
                                <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Quota Management</li>
                            </ul>
                            <button className="w-full py-4 rounded-2xl bg-cyan-500 text-black hover:bg-cyan-400 transition-colors font-bold shadow-lg shadow-cyan-500/20">Subscribe Now</button>
                        </div>

                        {/* Enterprise */}
                        <div className="p-10 rounded-[40px] border border-white/5 bg-white/[0.01] flex flex-col">
                            <h4 className="text-xl font-bold mb-2">Enterprise</h4>
                            <div className="text-4xl font-black mb-6">$99<span className="text-lg text-white/30">/mo</span></div>
                            <p className="text-white/30 text-sm mb-8 font-medium">Mission-critical logic for large organizations.</p>
                            <ul className="space-y-4 mb-10 flex-grow text-sm font-medium text-white/50">
                                <li className="flex items-center"><span className="text-purple-400 mr-2">✓</span> Custom Sandbox</li>
                                <li className="flex items-center"><span className="text-purple-400 mr-2">✓</span> Priority Rerank</li>
                                <li className="flex items-center"><span className="text-purple-400 mr-2">✓</span> Dedicated Support</li>
                            </ul>
                            <button className="w-full py-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors font-bold">Contact Sales</button>
                        </div>
                    </div>
                </section>

                {/* Footer Link */}
                <footer className="text-center py-20 border-t border-white/5">
                    <Link href="/" className="text-white/30 hover:text-white transition-colors text-sm font-medium">
                        ← Back to Ayato Studio Ecosystem
                    </Link>
                </footer>
            </div>
        </div>
    );
}
