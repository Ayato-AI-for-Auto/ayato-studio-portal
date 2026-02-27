'use client';

import React, { useState } from 'react';
import { createCheckoutSession } from '@/lib/api';

interface CheckoutButtonProps {
    priceId: string;
    variant: 'basic' | 'pro' | 'starter';
    className?: string;
    children: React.ReactNode;
}

export default function CheckoutButton({ priceId, variant, className, children }: CheckoutButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        if (variant === 'starter') return; // Starter is free

        setLoading(true);
        try {
            const checkoutUrl = await createCheckoutSession(priceId);
            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            } else {
                alert('Please sign in or create an account to subscribe.');
                // Here we could trigger a login modal
            }
        } catch (error) {
            console.error('Checkout failed:', error);
            alert('Failed to start checkout. Please try again.');
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
