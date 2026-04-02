
import React from 'react';
import Link from 'next/link';

export default function TokuteiPage() {
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
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    </nav>
                </div>
            </header>

            <article className="mx-auto max-w-4xl px-6 py-24">
                <div className="mb-16">
                    <div className="flex items-center gap-3 text-blue-500 font-bold text-xs uppercase tracking-[0.3em] mb-6">
                        <div className="h-px w-12 bg-blue-500/50" />
                        Legal / Compliance
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 leading-[0.9]">
                        特定商取引法に基づく表記
                    </h2>
                    <p className="text-gray-500 text-sm">最終更新日: 2026年2月28日</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden">
                        <table className="w-full text-sm text-left border-collapse">
                            <tbody>
                                <tr className="border-b border-white/5">
                                    <th className="p-8 md:p-10 w-1/3 bg-white/[0.01] font-black text-gray-400 uppercase tracking-widest text-[10px]">販売業者</th>
                                    <td className="p-8 md:p-10 text-gray-200 font-medium">Ayato Studio (運営者: )</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <th className="p-8 md:p-10 bg-white/[0.01] font-black text-gray-400 uppercase tracking-widest text-[10px]">代表責任者</th>
                                    <td className="p-8 md:p-10 text-gray-200 font-medium">[代表者名をご記入ください]</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <th className="p-8 md:p-10 bg-white/[0.01] font-black text-gray-400 uppercase tracking-widest text-[10px]">所在地</th>
                                    <td className="p-8 md:p-10 text-gray-200 font-medium">[住所をご記入ください]</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <th className="p-8 md:p-10 bg-white/[0.01] font-black text-gray-400 uppercase tracking-widest text-[10px]">電話番号</th>
                                    <td className="p-8 md:p-10 text-gray-200 font-medium">[電話番号をご記入ください]</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <th className="p-8 md:p-10 bg-white/[0.01] font-black text-gray-400 uppercase tracking-widest text-[10px]">メールアドレス</th>
                                    <td className="p-8 md:p-10 text-blue-400 font-medium">Cwblog69@gmail.com</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <th className="p-8 md:p-10 bg-white/[0.01] font-black text-gray-400 uppercase tracking-widest text-[10px]">販売価格</th>
                                    <td className="p-8 md:p-10 text-gray-200 font-medium">各プランの紹介ページ（料金プラン）をご参照ください。表示価格は消費税込みの価格です。</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <th className="p-8 md:p-10 bg-white/[0.01] font-black text-gray-400 uppercase tracking-widest text-[10px]">商品代金以外の必要料金</th>
                                    <td className="p-8 md:p-10 text-gray-200 font-medium">インターネット接続料金その他の電気通信回線の通信に関する費用（お客様のご負担となります）。</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <th className="p-8 md:p-10 bg-white/[0.01] font-black text-gray-400 uppercase tracking-widest text-[10px]">引き渡し時期</th>
                                    <td className="p-8 md:p-10 text-gray-200 font-medium">お支払い手続き完了後、直ちにご利用いただけます。</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <th className="p-8 md:p-10 bg-white/[0.01] font-black text-gray-400 uppercase tracking-widest text-[10px]">お支払方法</th>
                                    <td className="p-8 md:p-10 text-gray-200 font-medium">クレジットカード、その他当社が指定する方法（Stripe経由）。</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <th className="p-8 md:p-10 bg-white/[0.01] font-black text-gray-400 uppercase tracking-widest text-[10px]">提供開始後のキャンセル・返品</th>
                                    <td className="p-8 md:p-10 text-gray-200 font-medium">デジタルコンテンツの性質上、提供開始後の返品・キャンセルはお受けできません。解約は次回の更新日までに行うものとし、日割り計算による返金は行いません。</td>
                                </tr>
                                <tr>
                                    <th className="p-8 md:p-10 bg-white/[0.01] font-black text-gray-400 uppercase tracking-widest text-[10px]">動作環境</th>
                                    <td className="p-8 md:p-10 text-gray-200 font-medium">最新のWebブラウザ（Chrome, Firefox, Safari, Edge等）の動作要件に準じます。</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-16 p-8 md:p-10 rounded-[2rem] border border-blue-500/20 bg-blue-500/5">
                    <p className="text-gray-400 text-sm leading-relaxed">
                        ※上記項目で「[ ]」となっている箇所については、法的に運営者の個人情報または法人情報を開示する必要があります。
                        実際のサービス運営にあたっては、運営者様の最新情報を正確にご入力いただくようお願い申し上げます。
                    </p>
                </div>
            </article>

            <footer className="mt-24 border-t border-white/5 py-12 bg-black/40 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-6 flex justify-between items-center text-gray-500 text-xs">
                    <p>&copy; 2026 Ayato Studio. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                        <span className="text-white font-bold">特定商取引法に基づく表記</span>
                        <Link href="/" className="hover:text-white">Back to Hub</Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
