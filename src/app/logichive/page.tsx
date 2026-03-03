
import React from 'react';
import Link from 'next/link';
import { fetchLogicHiveFunctions } from '@/lib/api';
import AuthStatus from '@/components/LogicHive/AuthStatus';
import PricingTable from '@/components/LogicHive/PricingTable';
import LogicHiveContent from '@/components/LogicHive/LogicHiveContent';

export default async function LogicHivePage() {
    const functions = await fetchLogicHiveFunctions();

    return (
        <div className="min-h-screen bg-[#030303] text-white selection:bg-cyan-500/30">
            {/* Background decoration */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-20">
                {/* Nav Header */}
                <header className="flex justify-between items-center mb-24">
                    <Link href="/" className="group flex items-center space-x-2">
                        <span className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 group-hover:from-cyan-400 group-hover:to-blue-600 transition-all duration-300">
                            AYATO STUDIO
                        </span>
                        <span className="text-sm font-medium text-white/30 tracking-widest uppercase">/ PORTAL</span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/50">
                        <Link href="#features" className="hover:text-white transition-colors uppercase">Features</Link>
                        <Link href="#explorer" className="hover:text-white transition-colors uppercase">Explorer</Link>
                        <Link href="#pricing" className="hover:text-white transition-colors uppercase">Pricing</Link>
                        <AuthStatus />
                    </div>
                </header>

                {/* Main Content Area (Conditional) */}
                <LogicHiveContent publicFunctions={functions} />

                {/* Pricing Section (Always available, but may be linked to from Dashboard) */}
                <div id="pricing">
                    <PricingTable />
                </div>

                {/* Footer Section */}
                <footer className="text-center py-20 border-t border-white/5 flex flex-col items-center gap-4">
                    <div className="flex gap-8 text-xs text-white/30 mb-4">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/tokutei" className="hover:text-white transition-colors">特定商取引法に基づく表記</Link>
                    </div>
                    <Link href="/" className="text-white/30 hover:text-white transition-colors text-sm font-medium">
                        ← Back to Ayato Studio Ecosystem
                    </Link>
                </footer>
            </div>
        </div>
    );
}
