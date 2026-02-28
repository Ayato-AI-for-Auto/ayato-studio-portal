import Link from "next/link";
import { Report } from "../lib/api";

export default function ReportCard({ report }: { report: Report }) {
    return (
        <Link href={`/reports/${report.filename}`} className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400">
                    {report.category}
                </span>
                <span className="text-sm text-gray-400">
                    {new Date(report.timestamp).toLocaleDateString('ja-JP')} {new Date(report.timestamp).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                {report.title}
            </h3>
            <p className="line-clamp-3 text-sm text-gray-400 mb-4">
                {report.content.replace(/[#*`]/g, "")}
            </p>
            <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">{report.market}</span>
                    <div className="h-1 w-1 rounded-full bg-gray-700" />
                    <span className="text-xs text-gray-500">{report.language.toUpperCase()}</span>
                </div>
                <span className="text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">Read →</span>
            </div>
        </Link>
    );
}
