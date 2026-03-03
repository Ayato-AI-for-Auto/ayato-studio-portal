
import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
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
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
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
                        Terms of Service
                    </h2>
                    <p className="text-gray-500 text-sm">最終更新日: 2026年2月27日</p>
                </div>

                <div className="space-y-16">
                    {/* Section 1 */}
                    <section className="p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                        <h3 className="text-2xl font-black mb-6 text-blue-400">第1条 - サービスの概要</h3>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                Ayato Studio（以下「本サービス」）は、AIを活用した市場インテリジェンスレポートの生成・配信、
                                および LogicHive プラットフォームを通じた開発者向けツールの提供を行うサービスです。
                            </p>
                            <p>
                                本サービスは Ayato Studio 運営者（以下「運営者」）が運営しており、
                                ユーザーが本サービスを利用することにより、本利用規約に同意したものとみなします。
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                        <h3 className="text-2xl font-black mb-6 text-blue-400">第2条 - 免責事項および無保証</h3>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                本サービス（Ayato Studio および LogicHive）で提供されるレポート、分析記事、および
                                <strong className="text-white">LogicHive を通じて提供・共有される全てのコード（関数）</strong>は、
                                AIによって生成されたもの、またはユーザーによって登録されたものであり、
                                <strong className="text-blue-400">「現状有姿（As-Is）」</strong>で提供されます。
                            </p>
                            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                                <p className="text-red-400 font-bold mb-3">【重要】損害賠償責任の制限</p>
                                <ul className="space-y-2 text-sm">
                                    <li>- 運営者は、本サービスから取得したコードの正確性、安全性、適切性、または特定の目的への適合性について一切の保証を行いません。</li>
                                    <li>- 本サービスが提供するコードを実際のプロジェクトに適用した結果生じたいかなる損害（システム停止、データの損失、知財侵害、金銭的損失等）についても、運営者は一切の責任を負いません。</li>
                                    <li>- ユーザーは、提供されたコードをご自身の責任においてレビューし、必要に応じて修正・検証した上で利用するものとします。</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                        <h3 className="text-2xl font-black mb-6 text-blue-400">第3条 - 広告の掲載について</h3>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                本サービスでは、運営費の一部を捻出するために、以下の第三者配信の広告サービスを利用しています。
                            </p>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
                                    <p className="font-bold text-white mb-2">Google AdSense</p>
                                    <p className="text-sm text-gray-400">
                                        Google LLC が提供する広告配信サービスです。
                                        Cookie を使用してユーザーの興味に基づいた広告を表示する場合があります。
                                        詳細は <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Google 広告ポリシー</a> をご確認ください。
                                    </p>
                                </div>
                                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
                                    <p className="font-bold text-white mb-2">A8.net</p>
                                    <p className="text-sm text-gray-400">
                                        株式会社ファンコミュニケーションズが運営するアフィリエイトサービスです。
                                        本サービス内に掲載されるアフィリエイトリンクを経由して商品やサービスを購入された場合、
                                        運営者に広告報酬が支払われます。
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400">
                                広告の配信にあたり、第三者が Cookie やウェブビーコンを使用して、
                                ユーザーの本サービスや他サイトへのアクセス情報に基づき広告配信を行う場合があります。
                                ユーザーは、Google の広告設定ページ（<a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">ads settings</a>）にて、
                                パーソナライズ広告を無効にすることができます。
                            </p>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                        <h3 className="text-2xl font-black mb-6 text-blue-400">第4条 - 著作権・知的財産権</h3>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                本サービスに掲載されるAI生成コンテンツの著作権は運営者に帰属します。
                                ただし、引用元がある情報については、各原著作者の権利が優先されます。
                            </p>
                            <p>
                                本サービスのコンテンツの無断複製、転載、改変、再配布は禁止されています。
                                引用を行う場合は、出典として「Ayato Studio」を明記し、該当ページへのリンクを設置してください。
                            </p>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                        <h3 className="text-2xl font-black mb-6 text-blue-400">第5条 - 禁止事項</h3>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <ul className="space-y-2">
                                <li>- 本サービスの情報を利用した違法行為</li>
                                <li>- 本サービスへの不正アクセスやシステムへの攻撃</li>
                                <li>- 本サービスのコンテンツの無断転載・商業利用</li>
                                <li>- その他、運営者が不適切と判断する行為</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section className="p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                        <h3 className="text-2xl font-black mb-6 text-blue-400">第6条 - 規約の変更</h3>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                運営者は、必要に応じて本規約を変更することがあります。
                                変更後の規約は、本ページに掲載された時点で効力を生じるものとします。
                            </p>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="p-8 md:p-10 rounded-[2rem] border border-blue-500/20 bg-blue-500/5">
                        <h3 className="text-2xl font-black mb-6 text-blue-400">お問い合わせ</h3>
                        <p className="text-gray-300 leading-relaxed">
                            本規約に関するお問い合わせは、以下よりご連絡ください。
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
                        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/tokutei" className="hover:text-white">特定商取引法に基づく表記</Link>
                        <span className="text-white font-bold">Terms of Service</span>
                        <Link href="/" className="hover:text-white">Back to Hub</Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
