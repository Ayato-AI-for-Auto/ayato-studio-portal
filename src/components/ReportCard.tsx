import Link from "next/link";
import { Report } from "../lib/api";
import { cn } from "@/lib/utils";

export default function ReportCard({ report }: { report: Report }) {
    const market = (report.market || "tech").toLowerCase();
    
    // Theme mapping: [AccentColor, GlowColor, IconDescription]
    const themes: Record<string, { accent: string, border: string, glow: string, bg: string, text: string }> = {
        tech: { 
            accent: "blue-500", 
            border: "blue-500/20", 
            glow: "blue-500/10", 
            bg: "blue-500/5", 
            text: "blue-400" 
        },
        finance: { 
            accent: "amber-500", 
            border: "amber-500/20", 
            glow: "amber-500/10", 
            bg: "amber-500/5", 
            text: "amber-400" 
        },
        energy: { 
            accent: "emerald-500", 
            border: "emerald-500/20", 
            glow: "emerald-500/10", 
            bg: "emerald-500/5", 
            text: "emerald-400" 
        }
    };

    const theme = themes[market] || themes.tech;
    
    return (
        <Link
            href={`/reports/${report.slug}`}
            className={cn(
                "group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-3xl transition-all duration-500 hover:bg-white/[0.08] hover:scale-[1.02] hover:border-white/20",
                "shadow-2xl flex flex-col h-full",
                `hover:shadow-${theme.accent}/20`
            )}
        >
            {/* Background Glow Overlay */}
            <div className={cn(
                "absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl",
                `bg-${theme.accent}/10`
            )} />

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <span className={cn(
                        "inline-flex items-center gap-2 rounded-xl px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors",
                        `bg-${theme.bg} text-${theme.text} border border-${theme.border}`
                    )}>
                        {market === "energy" ? (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        ) : market === "finance" ? (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ) : (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                            </svg>
                        )}
                        {report.category}
                    </span>
                </div>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                    {new Date(report.timestamp).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                </span>
            </div>

            <h3 className={cn(
                "mb-4 text-xl md:text-2xl font-black text-white transition-colors leading-[1.1] tracking-tight group-hover:tracking-tighter",
                `group-hover:text-${theme.text}`
            )}>
                {report.title}
            </h3>

            <p className="line-clamp-2 text-sm text-gray-400 mb-8 leading-relaxed font-medium">
                {report.content.replace(/[#*`>!\[\]]/g, "").slice(0, 160).trim()}...
            </p>

            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] mb-0.5 md:mb-1">Sector</span>
                        <span className={cn("text-xs font-black uppercase tracking-widest", `text-${theme.accent}`)}>{market}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-500">
                    <span className={cn("text-xs font-black uppercase tracking-[0.1em]", `text-${theme.text}`)}>Deep Dive</span>
                    <svg className={cn("w-4 h-4", `text-${theme.text}`)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}
