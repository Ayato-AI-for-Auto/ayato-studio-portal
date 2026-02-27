# Ayato Studio Portal システム詳細設計書

## 1. システム概要
`ayato_studio_portal` は、Ayato Intelligence Engine (Reporter) が生成した分析レポートを視覚的かつユーザーフレンドリーに表示するための「デジタル玄関口（フロントエンド）」です。Next.js (App Router) を採用し、高速なレンダリングとモダンな UI/UX を提供するとともに、SEO 要件・広告マネタイズ機能（Google AdSense等）を統合しています。

---

## 2. 技術スタック
*   **コアフレームワーク**: Next.js 16 (App Router)
*   **言語**: TypeScript
*   **スタイリング**: Tailwind CSS v4, PostCSS
*   **デプロイ基盤**: Firebase Hosting (`firebase.json` 設定済み)
*   **統合サービス**: Google Analytics, Google Ads, Google AdSense

---

## 3. ディレクトリ・コンポーネント構成

```text
ayato_studio_portal/
├── public/                 # 静的ファイル (ads.txt 等)
├── src/
│   ├── app/                # Next.js App Router コア
│   │   ├── layout.tsx      # 全体レイアウト（フォント、Analytics 統合等）
│   │   ├── page.tsx        # プレミアム UI (Landing Page / Dashboard)
│   │   ├── sitemap.ts      # 動的サイトマップ生成
│   │   ├── robots.ts       # クローラー向けロボット制御
│   │   └── globals.css     # Tailwind エントリポイント
│   ├── components/         # 再利用可能な UI コンポーネント
│   │   ├── Analytics.tsx   # トラッキングタグ・AdSense スクリプト管理
│   │   └── ReportCard.tsx  # レポート情報を視覚的に表現するカード
│   └── lib/                # ユーティリティと外部連携
│       └── api.ts          # Portal Manager との通信クライアント
├── next.config.ts          # Next.js 基本設定
└── tailwind.config.ts / postcss.config.mjs # スタイリング設定
```

---

## 4. コンポーネント詳細

### 4.1. データフェッチ層 (`src/lib/api.ts`)
*   **`fetchReports`**: サーバーサイドコンポーネント用。環境変数 `NEXT_PUBLIC_API_URL` (または `MANAGER_URL`) を通じて、GCS と連携するバックエンド `ayato_portal_manager` の `/api/v1/reports` エンドポイントへアクセスし、永続化されたレポート一覧を取得する。常に最新の情報を表示するために、キャッシュ戦略（`no-store`等）を活用している。

### 4.2. UI プレゼンテーション層
*   **`page.tsx`**: Ayato Studio の第一印象を決定づけるページ。ダークモードとガラスモーフィズムを基調とし、アニメーションを取り入れた「プレミアム・エントランス」。API から取得したレポート配列を反復処理し、`ReportCard` に渡してグリッド表示する。
*   **`ReportCard.tsx`**: 各レポートのメタデータ（タイトル、カテゴリ、言語設定、スコア、タイムスタンプ）を解析し、情報を分かりやすく区分して表示する。外部アフィリエイトリンクへの誘導など、ビジネス上のコンバージョンポイントとなる場合がある。

### 4.3. 分析・マーケティング統合 (`src/components/Analytics.tsx`)
*   環境変数 (`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_ADS_ID`, `NEXT_PUBLIC_ADSENSE_ID`) を参照。
*   Next.js の `next/script` を用いて、`afterInteractive` 戦略で Google Analytics、タグマネージャー、AdSense スクリプトを非同期かつパフォーマンスを落とさずにロードしている。

### 4.4. SEO および クローラー最適化
*   **`sitemap.ts`**: 単なる静的ページのリストではなく、ビルド時・アクセス時に Portal Manager に問い合わせ、動的に生成された個々のレポートURLを `sitemap.xml` に反映する。これにより、新着レポートが速やかに Google のインデックス対象となる。
*   **`robots.ts`**: クローラーに対してクロール対象（すべてのルート）と除外対象（内部向けAPI等）を指定し、`ayato-studio.ai/sitemap.xml` の場所を明記している。

---

## 5. 主要なデータフロー

1.  **クライアントからのアクセス**: ユーザー（または Googlebot）が `ayato-studio.ai` にアクセス。
2.  **Next.js サーバー処理**: 
    - `page.tsx` が Server Component として実行され、`src/lib/api.ts` の `fetchReports` を呼び出す。
3.  **ダウンストリーム API**: Next.js サーバーから Cloud Run 上の `ayato_portal_manager` へ GET 要求を発行。Manager は Google Cloud Storage (GCS) から履歴を読み取って応答を返す。
4.  **レンダリング**: 取得したデータを元に HTML をサーバー側で構築。完成したページと Tailwind のスタイル、Analytics スクリプトがクライアントへ渡される。
5.  **Analytics / Ads ロード**: ブラウザ側で Hydration 後に各タグが動き出し、トラッキングと広告表示が完了する。

---

## 6. デプロイ要件とライフサイクル
*   リポジトリ内には `.github/workflows/deploy.yml` などの CI/CD 構成が含まれる場合があり、`npm install`、`npm run build` を経て、Firebase CLI (`firebase deploy`) によって Firebase Hosting に公開される。
*   ビルドパイプラインは `eslint` および TypeScript による型チェックを通過しなければならない。
