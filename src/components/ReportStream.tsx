"use client";

import { useEffect, useState } from "react";
import { fetchReports, Report } from "../lib/api";
import ReportCard from "./ReportCard";

export default function ReportStream() {
    const [reports, setReports] = useState<Report[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchReports();
                setReports(data);
            } catch (e: any) {
                console.error("Failed to load reports:", e);
                setError(
                    e.message?.includes("401") || e.message?.includes("403") || e.status === 401
                        ? "Authentication Error: Please ensure the Supabase Anon Key is used (not the secret key)."
                        : "Unable to connect to the Intelligence Hub."
                );
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const filteredReports = activeCategory === "All" 
        ? reports 
        : reports.filter(r => r.category === activeCategory || (activeCategory === "Energy" && r.market === "energy"));

    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-64 rounded-2xl bg-white/5 border border-white/10" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-[2.5rem] border border-red-500/20 bg-red-500/5 p-16 text-center backdrop-blur-2xl">
                <div className="mx-auto mb-6 h-12 w-12 text-red-500/40">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <p className="text-red-400 mb-2 font-black text-xl">Connectivity Disrupted</p>
                <p className="text-sm text-red-500/60 max-w-sm mx-auto">{error}</p>
            </div>
        );
    }

    if (reports.length === 0) {
        return (
            <div className="rounded-[2.5rem] border border-white/5 bg-white/5 p-32 text-center backdrop-blur-2xl">
                <div className="mx-auto mb-8 h-16 w-16 text-gray-700">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <p className="text-2xl font-black text-gray-600 mb-3">Silent Engine</p>
                <p className="text-sm text-gray-700 max-w-xs mx-auto">The Intelligence Engine hasn't delivered any artifacts to the portal yet.</p>
            </div>
        );
    }

    const categories = ["All", "AI/Tech", "Energy"];

    return (
        <div>
            <div className="flex flex-wrap items-center gap-2 mb-10">
                <span className="text-xs text-gray-500 mr-2 uppercase tracking-widest font-bold">Filter By Category:</span>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                            activeCategory === cat
                                ? (cat === "Energy" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-blue-500/20 text-blue-400 border border-blue-500/30")
                                : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {filteredReports.length === 0 ? (
                <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
                    <p className="text-gray-500 italic">No reports found for this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredReports.map((report, idx) => (
                        <ReportCard key={idx} report={report} />
                    ))}
                </div>
            )}
        </div>
    );
}
