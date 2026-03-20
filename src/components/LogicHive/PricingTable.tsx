'use client';

import React, { useEffect, useState } from 'react';
import { fetchCurrentOrganization } from '@/lib/api';
import CheckoutButton from '@/components/LogicHive/CheckoutButton';
import { supabase } from '@/lib/api';

const BASIC_PRICE_ID = "price_1T5LsGPCeWLY3R8VTNru2yRK";
const PRO_PRICE_ID = "price_1T5LsHPCeWLY3R8V9yDLnPMG";

export default function PricingTable() {
    const [planType, setPlanType] = useState<string>('free');
    const [loading, setLoading] = useState(true);

    const loadOrg = async () => {
        const { org } = await fetchCurrentOrganization();
        if (org) {
            setPlanType(org.plan_type || 'free');
        } else {
            setPlanType('free');
        }
        setLoading(false);
    };

    useEffect(() => {
        let isMounted = true;
        
        const init = async () => {
            if (isMounted) await loadOrg();
        };
        init();

        // Listen for auth changes to reload org data
        if (!supabase) return () => { isMounted = false; };
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
            if (isMounted) loadOrg();
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);

    // Helper to render the CTA button based on plan
    const renderCTA = (tierPlan: string, priceId: string, variant: 'basic' | 'pro' | 'free') => {
        if (planType === tierPlan) {
            return (
                <button className="w-full py-4 rounded-2xl bg-white/5 transition-colors font-bold text-white/50 cursor-default border border-white/5">
                    Current Plan
                </button>
            );
        }

        if (tierPlan === 'free') {
            return (
                <button className="w-full py-4 rounded-2xl bg-white/5 transition-colors font-bold text-white/20 cursor-not-allowed">
                    Available
                </button>
            );
        }

        return (
            <CheckoutButton
                priceId={priceId}
                variant={variant as 'basic' | 'pro' | 'starter'}
                disabled={!hasAgreedToTerms}
                className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 ${!hasAgreedToTerms
                    ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                    : variant === 'basic'
                        ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/20'
                        : 'border border-white/10 hover:bg-white/10 shadow-lg shadow-purple-500/10'
                    }`}
            >
                {hasAgreedToTerms ? 'Subscribe Now' : 'Agree to Terms First'}
            </CheckoutButton>
        );
    };

    return (
        <section id="pricing" className="mb-40">
            <div className="text-center mb-16">
                {/* Status Banner */}
                <div className="max-w-3xl mx-auto mb-12 p-1 rounded-3xl bg-gradient-to-r from-yellow-500/10 via-orange-500/20 to-yellow-500/10 border border-yellow-500/20 backdrop-blur-xl shadow-2xl shadow-yellow-500/10">
                    <div className="px-8 py-5 rounded-[22px] bg-black/60 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                        <div className="flex items-center gap-3">
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                            </span>
                            <span className="text-xs font-black text-yellow-500 uppercase tracking-widest">Field Testing Phase</span>
                        </div>
                        <div className="h-px w-8 bg-white/10 hidden md:block" />
                        <p className="text-sm font-bold text-white/90 leading-relaxed">
                            現在、有料プランは実地テスト中（準備中）です。正式なサービス開始までお待ちください。
                        </p>
                    </div>
                </div>

                <h2 className="text-4xl font-bold mb-4">Choose Your Scale</h2>
                <p className="text-white/40 font-medium mb-8">Start for free, scale as your automation grows.</p>

                {/* Terms Consent Checkbox */}
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group cursor-pointer hover:border-cyan-500/30 transition-all"
                    onClick={() => setHasAgreedToTerms(!hasAgreedToTerms)}>
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${hasAgreedToTerms ? 'bg-cyan-500 border-cyan-500' : 'border-white/20 group-hover:border-white/40'}`}>
                        {hasAgreedToTerms && <span className="text-black text-xs font-bold font-sans">✓</span>}
                    </div>
                    <label className="text-sm font-medium text-white/60 cursor-pointer select-none group-hover:text-white/80 transition-colors">
                        I agree to the <a href="/terms" className="text-cyan-400 hover:underline" onClick={(e) => e.stopPropagation()}>Terms of Service</a>, <a href="/privacy" className="text-cyan-400 hover:underline" onClick={(e) => e.stopPropagation()}>Privacy Policy</a>, and <a href="/tokutei" className="text-cyan-400 hover:underline" onClick={(e) => e.stopPropagation()}>特定商取引法に基づく表記</a>.
                    </label>
                </div>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto transition-opacity duration-500 ${loading ? 'opacity-50' : 'opacity-100'}`}>
                {/* Free */}
                <div className={`p-10 rounded-[40px] border flex flex-col transition-all duration-500 ${planType === 'free' ? 'border-white/20 bg-white/5' : 'border-white/5 bg-white/[0.01]'}`}>
                    <h4 className="text-xl font-bold mb-2">Starter</h4>
                    <div className="text-4xl font-black mb-6">Free</div>
                    <p className="text-white/30 text-sm mb-8 font-medium">Perfect for individuals exploring AI orchestration.</p>
                    <ul className="space-y-4 mb-10 flex-grow text-sm font-medium text-white/50">
                        <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Shared Community Hub</li>
                        <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Public Verification</li>
                        <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Basic AI Insight</li>
                    </ul>
                    {renderCTA('free', '', 'free')}
                </div>

                {/* Basic */}
                <div className={`p-10 rounded-[40px] border-2 flex flex-col relative overflow-hidden transition-all duration-500 ${planType === 'basic' ? 'border-cyan-400 bg-cyan-400/10' : 'border-cyan-500/50 bg-cyan-500/[0.02]'} shadow-[0_0_40px_rgba(6,182,212,0.1)]`}>
                    <div className="absolute top-0 right-0 px-4 py-1.5 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest rounded-bl-xl">POPULAR</div>
                    <h4 className={`text-xl font-bold mb-2 ${planType === 'basic' ? 'text-white' : 'text-cyan-400'}`}>Basic</h4>
                    <div className="text-4xl font-black mb-2">$9<span className="text-lg text-white/30">/mo</span></div>
                    <p className="text-white/40 text-sm mb-8 font-medium">For professionals and active developers.</p>
                    <ul className="space-y-4 mb-10 flex-grow text-sm font-medium text-white/70">
                        <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Private Org-Hive</li>
                        <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> 1,000 Verified Calls / mo</li>
                        <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> AI Lab Basic Scoring</li>
                    </ul>
                    {renderCTA('basic', BASIC_PRICE_ID, 'basic')}
                </div>

                {/* Pro */}
                <div className={`p-10 rounded-[40px] border flex flex-col transition-all duration-500 ${planType === 'pro' ? 'border-purple-400 bg-purple-400/10' : 'border-white/5 bg-white/[0.01]'}`}>
                    <h4 className={`text-xl font-bold mb-2 ${planType === 'pro' ? 'text-white' : 'text-purple-400'}`}>Pro</h4>
                    <div className="text-4xl font-black mb-6">$14<span className="text-lg text-white/30">/mo</span></div>
                    <p className="text-white/30 text-sm mb-8 font-medium">Unleash full potential for high-scale automation.</p>
                    <ul className="space-y-4 mb-10 flex-grow text-sm font-medium text-white/50">
                        <li className="flex items-center"><span className="text-purple-400 mr-2">✓</span> 10,000 Verified Calls / mo</li>
                        <li className="flex items-center"><span className="text-purple-400 mr-2">✓</span> Priority Rerank Support</li>
                        <li className="flex items-center"><span className="text-purple-400 mr-2">✓</span> Advanced AI Insights</li>
                    </ul>
                    {renderCTA('pro', PRO_PRICE_ID, 'pro')}
                </div>
            </div>
        </section>
    );
}
