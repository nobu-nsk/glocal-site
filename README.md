# グローカルコミューン Webサイト（Astro）

合同会社グローカルコミューン公式サイトの Astro プロジェクトです。
静的サイトとしてビルドされ、Cloudflare Pages 等にそのままデプロイできます。

## セットアップと起動

```bash
cd glocal-site
npm install        # 初回のみ（依存をインストール）
npm run dev        # 開発サーバー（http://localhost:4321）
npm run build      # 本番ビルド → dist/ に出力
npm run preview    # ビルド結果をローカルで確認
```

> 注: このプロジェクトをエージェントのサンドボックス越し（ネットワークマウント）でビルドすると、
> 一時ファイル削除の権限エラー（EPERM）が出ることがあります。これはマウントの制約で、
> ご自身のMac上で `npm install` → `npm run build` すれば問題なく動作します。
> 既存の `node_modules` / `dist` / `.astro` が残っている場合は削除してから `npm install` してください。

## 構成

```
src/
├─ content.config.ts          物件コレクションの定義（スキーマ／ジャンル）
├─ content/properties/        ★物件データ（1物件＝1ファイル）
│   └─ gfk.md                 グローカル富士河口湖
├─ layouts/BaseLayout.astro   共通レイアウト（head・ヘッダー・フッター・共通JS）
├─ components/
│   ├─ Header.astro / Footer.astro
│   ├─ PropertyCard.astro     一覧用の物件カード（ジャンルタグ付き）
│   └─ GenreListing.astro     ジャンル別一覧（タグで絞り込み）
├─ pages/
│   ├─ index.astro            トップページ
│   ├─ properties/[slug].astro ★宿泊LP共通テンプレート（物件データから生成）
│   ├─ stay/index.astro       宿泊（タグ=stay の一覧）
│   ├─ resort-rental/index.astro リゾート賃貸（タグ=resort-rental）
│   └─ residence/index.astro  居住用賃貸（タグ=residence）
└─ styles/global.css          共通の基本スタイル
public/images/<slug>/         物件ごとの画像
```

## 物件の追加方法（テンプレートを複製）

1. `public/images/<slug>/` に写真を入れる（例: `public/images/kasugai/`）。
2. `src/content/properties/<slug>.md` を作成し、`gfk.md` を参考に内容を記入。
   - `genres: [stay]` … この物件が属するジャンル（複数可）。
     例: `[stay, resort-rental]` とすると「宿泊」と「リゾート賃貸」の両一覧に表示されます。
   - `hero` / `concept` / `rooms` / `gallery` / `amenities` / `location` などを記入。
3. これだけで `/properties/<slug>/` のLPが生成され、該当ジャンルの一覧にも自動掲載されます。

## ギャラリー・客室の文言編集

物件の `.md` ファイル内の `gallery:` と `rooms:` の各行（`title` / `desc`）を書き換えるだけで反映されます。
画像を増減したい場合は行を追加・削除します。

## ジャンル（タグ）

- `stay` … 宿泊　/　`resort-rental` … リゾート賃貸　/　`residence` … 居住用賃貸
- 1物件に複数タグを付けられ、各ジャンルの一覧ページに同時に表示されます。
- 物件の正規URLは `/properties/<slug>/` の1つだけ（情報の重複なし）。

## デプロイ（Cloudflare Pages）

1. このリポジトリを GitHub に push。
2. Cloudflare Pages で当該リポジトリを連携。
3. ビルド設定: Build command = `npm run build` / Output directory = `dist`。
4. 独自ドメイン `glocal-commune.com` を割り当て（DNS設定）。

## 今後の拡張メモ

- 英語版（/en/）… Astro の i18n で主要ページ（トップ・会社概要・宿泊）を追加予定。
- お知らせ（/news/）… 別コレクション化して記事を追加できるようにする。
- 予約・問い合わせ … Beds24 予約エンジンや将来のゲスト管理システムへリンク／埋め込み。
