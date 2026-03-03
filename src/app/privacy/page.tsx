
import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 overflow-x-hidden">
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1)_0%,rgba(5,5,5,1)_100%)]" />

            <header className="border-b border-white/5 bg-black/40 backdrop-blur-2xl sticky top-0 z-50">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-xl shadow-lg shadow-blue-500/40 transform group-hover:rotate-6 transition-transform">
                            A
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold tracking-tight">Ayato Studio</h1>
                            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Back to Portal</p>
                        </div>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm text-gray-400">
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </nav>
                </div>
            </header>

            <article className="mx-auto max-w-4xl px-6 py-24">
                <div className="mb-16">
                    <div className="flex items-center gap-3 text-blue-500 font-bold text-xs uppercase tracking-[0.3em] mb-6">
                        <div className="h-px w-12 bg-blue-500/50" />
                        Legal
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 leading-[0.9]">
                        Privacy Policy
                    </h2>
                    <p className="text-gray-500 text-sm">最終更新日: 2026年2月27日</p>
                </div>

                <div className="space-y-16">
                    {/* Section 1 */}
                    <section className="p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                        <h3 className="text-2xl font-black mb-6 text-blue-400">第1条 - 個人情報の収集</h3>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                本サービスでは、ユーザーの利便性向上およびサービス改善のために、
                                以下の情報を収集する場合があります。
                            </p>
                            <ul className="space-y-2 text-gray-300">
                                <li>- アクセス解析データ（IPアドレス、ブラウザの種類、参照元URL、アクセス日時等）</li>
                                <li>- Cookie により収集される情報</li>
                                <li>- ユーザーが任意で提供するメールアドレス等の情報（アカウント登録時）</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                        <h3 className="text-2xl font-black mb-6 text-blue-400">第2条 - 個人情報の利用目的</h3>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>収集した個人情報は、以下の目的にのみ使用します。</p>
                            <ul className="space-y-2">
                                <li>- 本サービスの提供・運営・改善</li>
                                <li>- ユーザーからのお問い合わせへの対応</li>
                                <li>- 利用状況の分析・統計処理</li>
                                <li>- 広告の配信およびその効果測定</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                        <h3 className="text-2xl font-black mb-6 text-blue-400">第3条 - Cookie の使用について</h3>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                本サービスでは、ユーザー体験の向上および広告配信のために Cookie を使用しています。
                            </p>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
                                    <p className="font-bold text-white mb-2">Google Analytics</p>
                                    <p className="text-sm text-gray-400">
                                        Google LLC が提供するアクセス解析ツールです。
                                        Cookie を使用してトラフィックデータを収集しますが、個人を特定する情報は含まれません。
                                        詳細は <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Google プライバシーポリシー</a> をご確認ください。
                                    </p>
                                </div>
                                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
                                    <p className="font-bold text-white mb-2">Google AdSense</p>
                                    <p className="text-sm text-gray-400">
                                        Cookie を使用してユーザーの過去のアクセス情報に基づき、
                                        関連性の高い広告を表示します。ユーザーは
                                        <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300"> 広告設定 </a>
                                        からパーソナライズ広告を無効にできます。
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400">
                                ユーザーはブラウザの設定により Cookie の受け入れを拒否することが可能ですが、
                                その場合、本サービスの一部機能が利用できなくなる可能性があります。
                            </p>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                        <h3 className="text-2xl font-black mb-6 text-blue-400">第4条 - 第三者への情報提供</h3>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                運営者は、以下の場合を除き、ユーザーの個人情報を第三者に提供することはありません。
                            </p>
                            <ul className="space-y-2">
                                <li>- ユーザー本人の同意がある場合</li>
                                <li>- 法令に基づく場合</li>
                                <li>- 人の生命、身体または財産の保護のために必要な場合</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                        <h3 className="text-2xl font-black mb-6 text-blue-400">第5条 - プライバシーポリシーの変更</h3>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                運営者は、必要に応じて本ポリシーを変更することがあります。
                                変更後のプライバシーポリシーは、本ページに掲載された時点で効力を生じるものとします。
                            </p>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="p-8 md:p-10 rounded-[2rem] border border-blue-500/20 bg-blue-500/5">
                        <h3 className="text-2xl font-black mb-6 text-blue-400">お問い合わせ</h3>
                        <p className="text-gray-300 leading-relaxed">
                            本ポリシーに関するお問い合わせは、以下よりご連絡ください。
                        </p>
                        <p className="mt-4 text-blue-400 font-bold">
                            Email: contact@ayato-studio.ai
                        </p>
                    </section>
                </div>
            </article>

            <footer className="mt-24 border-t border-white/5 py-12 bg-black/40 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-6 flex justify-between items-center text-gray-500 text-xs">
                    <p>&copy; 2026 Ayato Studio. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="text-white font-bold">Privacy Policy</span>
                        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                        <Link href="/tokutei" className="hover:text-white">特定商取引法に基づく表記</Link>
                        <Link href="/" className="hover:text-white">Back to Hub</Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
