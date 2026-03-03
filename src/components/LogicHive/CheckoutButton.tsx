'use client';

import React, { useState } from 'react';
import { createCheckoutSession, supabase } from '@/lib/api';

interface CheckoutButtonProps {
    priceId: string;
    variant: 'basic' | 'pro' | 'starter';
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
}

export default function CheckoutButton({ priceId, variant, className, children, disabled }: CheckoutButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        if (variant === 'starter') return; // Starter is free

        // 1. Proactive Auth Check: Avoid 'Processing' hang for unauthenticated users
        if (supabase) {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                console.log('No session found. Dispatching logichive:open-auth...');
                window.dispatchEvent(new CustomEvent('logichive:open-auth', { bubbles: true, detail: { from: 'CheckoutButton' } }));
                return;
            }
        }

        setLoading(true);
        try {
            const { url, error: checkoutError } = await createCheckoutSession(priceId);
            if (url) {
                window.location.href = url;
            } else if (checkoutError) {
                console.error('Checkout failed:', checkoutError);
                alert(`Checkout failed: ${checkoutError}`);
            } else {
                // No URL and no error usually means we should prompt for auth
                console.log('No URL/Error, likely need re-auth. Dispatching logichive:open-auth...');
                window.dispatchEvent(new CustomEvent('logichive:open-auth', { bubbles: true, detail: { from: 'CheckoutButton' } }));
            }
        } catch (error: any) {
            console.error('Unexpected checkout error:', error);
            alert(error.message || 'Failed to start checkout. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleCheckout}
            disabled={loading}
            className={`${className} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {loading ? 'Processing...' : children}
        </button>
    );
}
