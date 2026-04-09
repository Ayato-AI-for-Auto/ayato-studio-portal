"use client"

import { motion } from "framer-motion"
import { ExternalLink, Zap } from "lucide-react"
import { NoteArticle } from "@/lib/types"
import { formatDate } from "@/lib/utils"

interface NoteCardProps {
  article: NoteArticle
}

export function NoteCard({ article }: NoteCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 shadow-2xl transition-all hover:border-amber-500/50 hover:shadow-amber-500/10"
    >
      {/* Premium Badge */}
      {article.isPremium && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 backdrop-blur-md border border-amber-500/30">
          <Zap className="h-3 w-3" />
          Core Engine Asset
        </div>
      )}

      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-amber-500/5 blur-[80px] transition-all group-hover:bg-amber-500/10" />

      <div className="relative flex flex-col h-full space-y-4">
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
          <span className="flex items-center gap-1.5 text-amber-500/80">
            <span className="h-1 w-1 rounded-full bg-amber-500" />
            note.com
          </span>
          <span>{formatDate(article.pubDate)}</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold leading-tight tracking-tight text-white group-hover:text-amber-100 transition-colors">
            {article.title}
          </h3>
          <p className="line-clamp-2 text-sm text-gray-400 leading-relaxed">
            {article.contentSnippet}
          </p>
        </div>

        <div className="pt-4 mt-auto">
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-400 transition-colors"
          >
            資産を入手する
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Decorative Border Bottom */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent transition-all duration-500 group-hover:w-full" />
    </motion.div>
  )
}
