import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Contact Us | Ayato Studio",
  description: "Get in touch with Ayato Studio for custom market analysis, feedback, or general inquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-white selection:bg-blue-500/30 overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1)_0%,rgba(3,3,3,1)_100%)]" />

      <div className="container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-2xl mx-auto">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-3 text-blue-500 font-bold text-xs uppercase tracking-[0.3em] mb-8">
              <div className="h-px w-12 bg-blue-500/50" />
              Communication
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
              GET IN<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">TOUCH</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium leading-relaxed max-w-sm mx-auto">
              Any questions, feedback, or custom research inquiries? We're here to help.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-32 h-32 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 01-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>
            
            <div className="relative z-10 text-center">
               <h3 className="text-xl font-black text-white mb-4 uppercase tracking-widest">Global Support</h3>
               <p className="text-3xl md:text-4xl font-black text-blue-400 mb-8 tracking-tighter select-all">
                 Cwblog69@gmail.com
               </p>
               <div className="h-px w-24 bg-white/10 mx-auto mb-8" />
               <p className="text-sm text-gray-500 leading-relaxed font-medium">
                 通常、24時間以内に専門スタッフが返信いたします。<br />
                 緊急度の高い調査依頼については、件名に「URGENT」とご記入ください。
               </p>
            </div>
          </div>

          <div className="mt-16 text-center">
              <Link 
                href="/"
                className="text-xs font-black uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors underline underline-offset-8 decoration-blue-500/30"
              >
                Back to Portal Hub
              </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
