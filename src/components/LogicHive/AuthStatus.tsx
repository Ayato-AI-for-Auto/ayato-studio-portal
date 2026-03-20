'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/api';

export default function AuthStatus() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (!supabase) {
            console.error('LogicHive Supabase client is missing.');
            setLoading(false);
            return;
        }

        const checkUser = async () => {
            const client = supabase;
            if (!client) return;
            try {
                const { data: { session } } = await client.auth.getSession();
                setUser(session?.user || null);
            } catch (err) {
                console.error('Failed to get Supabase session:', err);
            } finally {
                setLoading(false);
            }
        };
        checkUser();

        // Listen for all auth events to keep header in sync
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event: string, session: any) => {
                console.log('Auth event change:', event);
                setUser(session?.user || null);
                if (event === 'SIGNED_IN') setShowForm(false);
            }
        );

        // Listener for manual triggers (e.g. from CheckoutButton)
        const openAuthHandler = (e: Event) => {
            console.log('Received logichive:open-auth event', e);
            setShowForm(prev => {
                if (!prev) return true;
                return prev;
            });
            setIsSignUp(true);
        };
        window.addEventListener('logichive:open-auth', openAuthHandler);

        return () => {
            subscription.unsubscribe();
            window.removeEventListener('logichive:open-auth', openAuthHandler);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase) return;
        setError('');
        setMessage('');

        if (isSignUp) {
            if (password !== confirmPassword) {
                setError('Passwords do not match.');
                return;
            }
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) {
                setError(error.message);
            } else {
                setMessage('Check your email for a confirmation link.');
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                setError(error.message);
            }
        }
    };

    const handleSignOut = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
        router.refresh();
    };

    if (loading) return <div className="text-white/20 animate-pulse text-xs">...</div>;

    // Logged in state
    if (user) {
        return (
            <div className="flex items-center space-x-4">
                <span className="text-xs font-mono text-white/40 truncate max-w-[140px]">{user.email}</span>
                <button
                    onClick={handleSignOut}
                    className="text-xs font-bold text-red-400/60 hover:text-red-400 transition-colors"
                >
                    LOGOUT
                </button>
            </div>
        );
    }

    // Sign In / Sign Up Modal
    if (showForm) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300">
                <div
                    className="w-full max-w-md p-10 rounded-[40px] border border-white/10 bg-[#0a0a0a]/90 shadow-[0_0_100px_rgba(34,211,238,0.1)] relative overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Animated accent gradient */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-2xl font-black text-white tracking-tighter">
                                {isSignUp ? 'CREATE ACCOUNT' : 'WELCOME BACK'}
                            </h3>
                            <p className="text-white/40 text-xs font-medium mt-1">
                                {isSignUp ? 'Join the logic revolution' : 'Sign in to access your hive'}
                            </p>
                        </div>
                        <button
                            onClick={() => setShowForm(false)}
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12.002a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {isSignUp && (
                            <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Confirm Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all pr-12"
                                />
                            </div>
                        )}

                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                                {error}
                            </div>
                        )}
                        {message && (
                            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-5 mt-4 rounded-2xl bg-cyan-500 text-black text-sm font-black hover:bg-cyan-400 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-cyan-500/20"
                        >
                            {isSignUp ? 'GET STARTED' : 'CONTINUE'}
                        </button>
                    </form>

                    <button
                        onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage(''); setShowPassword(false); }}
                        className="mt-8 text-xs text-white/30 hover:text-white transition-colors w-full text-center font-bold"
                    >
                        {isSignUp ? 'ALREADY HAVE AN ACCOUNT? SIGN IN' : "DON'T HAVE AN ACCOUNT? SIGN UP"}
                    </button>
                </div>
            </div>
        );
    }

    // Default: Show sign-in button
    return (
        <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-black hover:bg-cyan-500 hover:text-black transition-all duration-300 tracking-widest"
        >
            SIGN IN
        </button>
    );
}
