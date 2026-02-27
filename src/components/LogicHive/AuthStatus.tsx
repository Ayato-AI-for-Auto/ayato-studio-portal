'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/api';

export default function AuthStatus() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!supabase) { setLoading(false); return; }

        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
            setLoading(false);
        };
        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event: string, session: any) => {
                setUser(session?.user || null);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase) return;
        setError('');
        setMessage('');

        if (isSignUp) {
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

    const handleLogout = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
    };

    if (loading) return <div className="text-white/20 animate-pulse text-xs">...</div>;

    // Logged in state
    if (user) {
        return (
            <div className="flex items-center space-x-4">
                <span className="text-xs font-mono text-white/40 truncate max-w-[140px]">{user.email}</span>
                <button
                    onClick={handleLogout}
                    className="text-xs font-bold text-red-400/60 hover:text-red-400 transition-colors"
                >
                    LOGOUT
                </button>
            </div>
        );
    }

    // Sign In / Sign Up form
    if (showForm) {
        return (
            <div className="relative">
                <div className="absolute right-0 top-8 w-72 p-5 rounded-2xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl z-50">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-white">
                            {isSignUp ? 'Create Account' : 'Sign In'}
                        </h3>
                        <button
                            onClick={() => setShowForm(false)}
                            className="text-white/30 hover:text-white text-xs"
                        >
                            CLOSE
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50"
                        />
                        {error && <p className="text-red-400 text-xs">{error}</p>}
                        {message && <p className="text-cyan-400 text-xs">{message}</p>}
                        <button
                            type="submit"
                            className="w-full py-2 rounded-lg bg-cyan-500 text-black text-sm font-bold hover:bg-cyan-400 transition-colors"
                        >
                            {isSignUp ? 'SIGN UP' : 'SIGN IN'}
                        </button>
                    </form>
                    <button
                        onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage(''); }}
                        className="mt-3 text-xs text-white/30 hover:text-white/60 transition-colors w-full text-center"
                    >
                        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                    </button>
                </div>
                <button
                    onClick={() => setShowForm(false)}
                    className="px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold"
                >
                    SIGN IN
                </button>
            </div>
        );
    }

    // Default: Show sign-in button
    return (
        <button
            onClick={() => setShowForm(true)}
            className="px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold hover:bg-cyan-500 hover:text-black transition-all duration-300"
        >
            SIGN IN
        </button>
    );
}
