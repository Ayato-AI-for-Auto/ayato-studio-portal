'use client';

import React, { useState, useEffect } from 'react';
import { LogicHiveFunction, fetchOrganizationMetrics, fetchOrganizationFunctions } from '@/lib/api';

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [functions, setFunctions] = useState<LogicHiveFunction[]>([]);
    const [metrics, setMetrics] = useState<{ usage: number; limit: number; plan: string } | null>(null);
    const [selectedFunction, setSelectedFunction] = useState<LogicHiveFunction | null>(null);

    useEffect(() => {
        const loadDashboardData = async () => {
            setLoading(true);
            try {
                const [metricsData, functionsData] = await Promise.all([
                    fetchOrganizationMetrics(),
                    fetchOrganizationFunctions()
                ]);
                setMetrics(metricsData);
                setFunctions(functionsData);
            } catch (error) {
                console.error('Error loading dashboard:', error);
            } finally {
                setLoading(false);
            }
        };
        loadDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="py-20 text-center">
                <div className="inline-block w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4" />
                <p className="text-white/40 font-medium">Analyzing logic warehouse...</p>
            </div>
        );
    }

    const usagePercent = metrics ? (metrics.usage / metrics.limit) * 100 : 0;

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header / Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Current Plan</p>
                    <h3 className="text-2xl font-black text-cyan-400 uppercase">{metrics?.plan || 'Free'}</h3>
                </div>
                <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl md:col-span-2">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Monthly Usage</p>
                            <h3 className="text-2xl font-black">{metrics?.usage} <span className="text-white/20 text-sm">/ {metrics?.limit} requests</span></h3>
                        </div>
                        <span className="text-xs font-bold text-white/40">{Math.round(usagePercent)}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-1000"
                            style={{ width: `${Math.min(usagePercent, 100)}%` }}
                        />
                    </div>
                </div>
                <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl text-center flex flex-col justify-center">
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Logic Assets</p>
                    <h3 className="text-4xl font-black">{functions.length}</h3>
                </div>
            </div>

            {/* Asset Table */}
            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl">
                <div className="p-8 border-b border-white/5 flex justify-between items-center">
                    <h2 className="text-xl font-black tracking-tight">Organization Assets</h2>
                    <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                        Verified Repository
                    </div>
                </div>

                {functions.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black text-white/30 uppercase tracking-widest bg-white/[0.01]">
                                    <th className="px-8 py-4">Function Name</th>
                                    <th className="px-8 py-4">Reliability</th>
                                    <th className="px-8 py-4">Executions</th>
                                    <th className="px-8 py-4">Registered</th>
                                    <th className="px-8 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {functions.map((fn) => (
                                    <tr key={fn.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{fn.name}</div>
                                            <div className="text-xs text-white/30 truncate max-w-[240px] mt-1">{fn.description || 'No description'}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="h-1.5 w-12 bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-cyan-500"
                                                        style={{ width: `${fn.reliability_score * 100}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-mono text-white/50">{fn.reliability_score}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-mono text-white/40">
                                            {(fn as any).call_count || 0}
                                        </td>
                                        <td className="px-8 py-6 text-xs text-white/30 font-medium uppercase">
                                            {new Date(fn.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-8 py-6">
                                            <button
                                                onClick={() => setSelectedFunction(fn)}
                                                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all"
                                            >
                                                Audit Code
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-24 text-center">
                        <p className="text-white/20 italic font-medium">The warehouse is empty. Use `lh sync push` to register logic assets.</p>
                    </div>
                )}
            </div>

            {/* Code Modal */}
            {selectedFunction && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-24 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        onClick={() => setSelectedFunction(null)}
                    />
                    <div className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col max-h-full animate-in zoom-in-95 duration-300">
                        <div className="p-8 border-b border-white/5 flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-black tracking-tighter uppercase">{selectedFunction.name}</h3>
                                <p className="text-white/40 text-sm mt-1">{selectedFunction.description}</p>
                            </div>
                            <button
                                onClick={() => setSelectedFunction(null)}
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-8 overflow-auto flex-1">
                            <div className="bg-black/50 border border-white/5 rounded-2xl p-6 font-mono text-sm leading-relaxed text-cyan-50/80">
                                <pre><code>{selectedFunction.code}</code></pre>
                            </div>
                        </div>
                        <div className="p-8 border-t border-white/5 flex justify-end gap-4">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(selectedFunction.code);
                                }}
                                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                                Copy Source
                            </button>
                            <button
                                onClick={() => setSelectedFunction(null)}
                                className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-black uppercase tracking-widest shadow-lg shadow-cyan-500/20 transition-all"
                            >
                                Close Audit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
