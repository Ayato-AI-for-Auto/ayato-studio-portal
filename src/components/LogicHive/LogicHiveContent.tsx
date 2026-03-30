'use client';

import React, { useState, useEffect } from 'react';
import { supabase, LogicHiveFunction } from '@/lib/api';
import Dashboard from './Dashboard';

interface LogicHiveContentProps {
    publicFunctions: LogicHiveFunction[];
}

export default function LogicHiveContent({ publicFunctions }: LogicHiveContentProps) {
    const [user, setUser] = useState<any>(null); // Keep any for user if imported type not available, ideally use User from supabase-js
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        if (!supabase) {
            setTimeout(() => {
                if (isMounted) setLoading(false);
            }, 0);
            return () => { isMounted = false; };
        }

        const checkUser = async () => {
            if (!supabase) return;
            const { data: { session } } = await supabase.auth.getSession();
            if (isMounted) {
                setUser(session?.user || null);
                setLoading(false);
            }
        };
        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (isMounted) setUser(session?.user || null);
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    if (loading) {
        return (
            <div className="py-40 text-center">
                <div className="inline-block w-8 h-8 border-4 border-white/5 border-t-cyan-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (user) {
        return (
            <div className="animate-in fade-in duration-700">
                <Dashboard />
            </div>
        );
    }

    // Public View (Hero + Features + Explorer)
    return (
        <div className="animate-in fade-in duration-700">
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
                    <a
                        href="https://github.com/Ayato-AI-for-Auto/LogicHive/releases/latest"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto px-10 py-4 rounded-xl bg-white text-black font-bold hover:bg-cyan-400 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] text-center"
                    >
                        Download LogicHive Edge (.exe)
                    </a>
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
                    <div className="mt-6 pt-6 border-t border-white/5">
                        <a
                            href="https://github.com/Ayato-AI-for-Auto/LogicHive/releases/latest"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 text-xs font-bold hover:underline"
                        >
                            GET CORE CLIENT →
                        </a>
                    </div>
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

                {publicFunctions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {publicFunctions.map((fn) => (
                            <div key={fn.id} className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                        {fn.tags?.[0] || 'Logic'}
                                    </div>
                                    <div className="text-cyan-400 font-mono text-xs">
                                        Score: {fn.reliability_score}
                                    </div>
                                </div>
                                <h4 className="text-lg font-bold mb-2 truncate text-white">{fn.name}</h4>
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
        </div>
    );
}
