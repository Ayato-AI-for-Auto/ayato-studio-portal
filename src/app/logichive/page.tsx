
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

            <div className="relative z-10 container mx-auto px-6 py-12 md:py-24">
                {/* Main Content Area (Conditional) */}
                <LogicHiveContent publicFunctions={functions} />

                {/* Pricing Section (Always available, but may be linked to from Dashboard) */}
                <div id="pricing" className="mt-20">
                    <PricingTable />
                </div>
            </div>
        </div>
    );
}
