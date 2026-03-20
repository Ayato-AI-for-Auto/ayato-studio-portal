import Link from "next/link";
import { Report } from "../lib/api";

export default function ReportCard({ report }: { report: Report }) {
    const isEnergy = report.category === "Energy" || report.market === "energy";
    
    return (
        <Link href={`/reports/${report.filename}`} className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 backdrop-blur-md transition-all hover:bg-white/10 hover:shadow-2xl ${isEnergy ? 'hover:shadow-amber-500/10' : 'hover:shadow-blue-500/10'}`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] md:text-xs font-bold ${isEnergy ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
                        {isEnergy && (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        )}
                        {!isEnergy && (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        )}
                        {report.category}
                    </span>
                </div>
                <span className="text-xs md:text-sm text-gray-500 font-medium">
                    {new Date(report.timestamp).toLocaleDateString('ja-JP')}
                </span>
            </div>
            <h3 className={`mb-2 text-lg md:text-xl font-bold text-white transition-colors leading-tight ${isEnergy ? 'group-hover:text-amber-400' : 'group-hover:text-blue-400'}`}>
                {report.title}
            </h3>
            <p className="line-clamp-3 text-sm text-gray-500 mb-6 leading-relaxed">
                {report.content.replace(/[#*`]/g, "")}
            </p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isEnergy ? 'text-amber-500/60' : 'text-blue-500/60'}`}>{report.market}</span>
                    <div className="h-1 w-1 rounded-full bg-gray-800" />
                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">{report.language}</span>
                </div>
                <span className={`text-xs font-black group-hover:translate-x-1 transition-transform ${isEnergy ? 'text-amber-400' : 'text-blue-400'}`}>Read Report →</span>
            </div>
        </Link>
    );
}
