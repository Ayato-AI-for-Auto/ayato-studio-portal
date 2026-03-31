import Link from "next/link";
import { Report } from "../lib/api";
import { cn } from "@/lib/utils";

export default function ReportCard({ report }: { report: Report }) {
    const isEnergy = report.category === "Energy" || report.market === "energy";
    
    return (
        <Link
            href={`/reports/${report.slug}`}
            className={cn(
                "group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-3xl transition-all duration-500 hover:bg-white/[0.08] hover:scale-[1.02] hover:border-white/20",
                "shadow-2xl flex flex-col h-full",
                isEnergy ? "hover:shadow-amber-500/20" : "hover:shadow-blue-500/20"
            )}
        >
            {/* Background Glow Overlay */}
            <div className={cn(
                "absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl",
                isEnergy ? "bg-amber-500/10" : "bg-blue-500/10"
            )} />

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <span className={cn(
                        "inline-flex items-center gap-2 rounded-xl px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors",
                        isEnergy ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    )}>
                        {isEnergy ? (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        ) : (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                isEnergy ? "group-hover:text-amber-400" : "group-hover:text-blue-400"
            )}>
                {report.title}
            </h3>

            <p className="line-clamp-2 text-sm text-gray-400 mb-8 leading-relaxed font-medium">
                {report.content.replace(/[#*`>!\[\]]/g, "").slice(0, 160).trim()}...
            </p>

            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] mb-0.5 md:mb-1">Market</span>
                        <span className={cn("text-xs font-black uppercase tracking-widest", isEnergy ? "text-amber-500" : "text-blue-500")}>{report.market}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-500">
                    <span className={cn("text-xs font-black uppercase tracking-[0.1em]", isEnergy ? "text-amber-400" : "text-blue-400")}>Deep Dive</span>
                    <svg className={cn("w-4 h-4", isEnergy ? "text-amber-400" : "text-blue-400")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}
