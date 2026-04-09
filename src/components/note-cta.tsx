"use client"

import { motion } from "framer-motion"
import { ArrowRight, Zap, Database, Cpu, Layout } from "lucide-react"

export function NoteCTA() {
  return (
    <section className="mt-16 relative overflow-hidden rounded-[2.5rem] border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent p-1">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-[2.5rem]" />
      
      <div className="relative p-8 md:p-12 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] border border-amber-500/20">
            <Zap className="h-3 w-3" />
            Core Engine Implementation
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white leading-tight">
            実装の「心臓部」を<br />
            手に入れませんか？
          </h2>
          
          <p className="text-gray-400 text-lg leading-relaxed font-medium max-w-xl">
            この記事で解説したロジックを具現化する、デバッグ済みソースコード、ADR（設計決定記録）、および構築手順書。Ayato Studio の技術資産を note で公開中。
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {[
              { icon: Database, text: "DB Healing" },
              { icon: Cpu, text: "Hybrid Prompt" },
              { icon: Layout, text: "Action Engine" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-amber-500/60 uppercase tracking-widest bg-amber-500/5 px-3 py-1.5 rounded-lg border border-amber-500/10">
                <item.icon className="h-3 w-3" />
                {item.text}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-auto">
          <motion.a
            href="https://note.com/ayato_studio"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center justify-center gap-3 px-10 py-6 rounded-2xl bg-amber-500 text-black font-black uppercase tracking-widest text-sm shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)] hover:bg-amber-400 transition-all"
          >
            資産を note で入手する
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.a>
          <p className="mt-4 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Ready to deploy to your infrastructure
          </p>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-amber-500/10 blur-[100px] -z-10" />
    </section>
  )
}
