import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 多言語版（en / zh など）の共通スキーマ。画像・URLは日本語側を流用し、表示テキストのみ保持。
const localized = z.object({
  title: z.string(),
  summary: z.string(),
  hero: z.object({ eyebrow: z.string().default(''), title: z.string(), lead: z.string() }),
  conceptHeading: z.string(),
  conceptBody: z.array(z.string()),
  panorama: z.object({ title: z.string(), sub: z.string() }).optional(),
  features: z.array(z.object({ title: z.string(), desc: z.string() })).default([]),
  special: z.object({ eyebrow: z.string(), title: z.string(), body: z.string() }).optional(),
  rooms: z.array(z.object({ floor: z.string(), title: z.string(), desc: z.string() })).default([]),
  gallery: z.array(z.object({ title: z.string(), desc: z.string() })).default([]),
  amenities: z.array(z.string()).default([]),
  specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
  specsNote: z.string().optional(),
  info: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
  booking: z
    .object({ heading: z.string(), lead: z.string(), bookingLabel: z.string().optional() })
    .optional(),
});

// 物件・施設コレクション。1物件＝1つの .md ファイル（src/content/properties/）。
// genres にジャンルを複数指定すると、各ジャンルの一覧（/stay・/resort-rental・/residence）に自動掲載される。
const properties = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/properties' }),
  schema: z.object({
    title: z.string(),
    nameEn: z.string().optional(),
    genres: z.array(z.enum(['stay', 'resort-rental', 'residence'])),
    order: z.number().default(0),
    summary: z.string(),
    cardImage: z.string(),
    hero: z.object({
      image: z.string(),
      eyebrow: z.string().default(''),
      title: z.string(),
      lead: z.string(),
    }),
    concept: z.object({
      heading: z.string(),
      body: z.array(z.string()),
      image: z.string(),
    }),
    panorama: z.object({ image: z.string(), title: z.string(), sub: z.string() }).optional(),
    features: z
      .array(z.object({ icon: z.string(), title: z.string(), desc: z.string() }))
      .default([]),
    special: z
      .object({ eyebrow: z.string(), title: z.string(), body: z.string(), image: z.string() })
      .optional(),
    rooms: z
      .array(z.object({ floor: z.string(), title: z.string(), desc: z.string(), image: z.string() }))
      .default([]),
    floorplan: z.string().optional(),
    gallery: z
      .array(z.object({ image: z.string(), title: z.string(), desc: z.string() }))
      .default([]),
    amenities: z.array(z.object({ icon: z.string(), label: z.string() })).default([]),
    location: z.object({ address: z.string(), mapEmbed: z.string() }),
    info: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    // この物件専用のInstagramフィード（Behold.so の Feed ID）。設定すると物件ページにフィードを表示。
    instagramWidgetId: z.string().optional(),
    // 賃貸物件の物件概要（不動産表示規約に対応するコンパクトな仕様表）
    specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    specsNote: z.string().optional(),
    booking: z
      .object({
        heading: z.string().optional(),
        lead: z.string().optional(),
        bookingUrl: z.string().optional(),
        bookingLabel: z.string().optional(),
        // Beds24: 予約ページのURL（新規タブで開く推奨）。設定すると予約ボタンが Beds24 を優先。
        beds24Url: z.string().optional(),
        // Beds24: 任意のインライン埋め込み iframe の src（カレンダー/予約ページ）。
        beds24Iframe: z.string().optional(),
        airbnb: z.string().optional(),
        contact: z.string().optional(),
      })
      .default({}),
    // 多言語版（任意）。en=英語、zh=繁体中文。
    en: localized.optional(),
    zh: localized.optional(),
  }),
});

// お知らせ／ジャーナルの多言語版（任意）。body があれば記事ページを生成。
const newsLocalized = z.object({
  title: z.string(),
  summary: z.string().optional(),
  body: z.array(z.string()).optional(),
});

// お知らせ／ジャーナル コレクション。1記事＝1つの .md（src/content/news/）。
// body（段落の配列）があれば記事ページ（/news/<slug>/）を生成、無ければ一覧に出る告知行のみ。
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string().default('お知らせ'),
    summary: z.string().optional(),
    image: z.string().optional(),
    body: z.array(z.string()).optional(),
    // 本文ページの代わりに外部（Instagram等）へ飛ばす告知の場合に指定。
    link: z.string().optional(),
    draft: z.boolean().default(false),
    en: newsLocalized.optional(),
    zh: newsLocalized.optional(),
  }),
});

export const collections = { properties, news };

// ジャンルの表示ラベル（日本語）
export const GENRE_LABELS: Record<string, string> = {
  stay: '宿泊',
  'resort-rental': 'リゾート賃貸',
  residence: '居住用賃貸',
};

// お知らせのカテゴリー表示ラベル（多言語）。未定義カテゴリは元の文字列をそのまま表示。
export const NEWS_CATEGORY_LABELS: Record<string, { en: string; zh: string }> = {
  'お知らせ': { en: 'News', zh: '公告' },
  '宿泊': { en: 'Stays', zh: '住宿' },
  '取り組み': { en: 'Community', zh: '社區' },
  '富士山': { en: 'Mt. Fuji', zh: '富士山' },
  '周辺': { en: 'Area Guide', zh: '周邊資訊' },
};

// 一覧・記事ページのUIラベル（多言語）
export const NEWS_UI: Record<string, { eyebrow: string; title: string; lead: string; all: string; readMore: string; back: string; empty: string }> = {
  ja: { eyebrow: 'News', title: 'お知らせ・ジャーナル', lead: '宿やまちの最新情報、季節の便りをお届けします。', all: 'お知らせ一覧へ', readMore: '続きを読む', back: 'お知らせ一覧へ戻る', empty: '現在準備中です。' },
  en: { eyebrow: 'News', title: 'News & Journal', lead: 'Updates from our stays and town, and notes from the seasons.', all: 'View all news', readMore: 'Read more', back: 'Back to all news', empty: 'Coming soon.' },
  zh: { eyebrow: 'News', title: '最新消息・日誌', lead: '為您送上住宿與在地的最新資訊，以及季節的來信。', all: '查看所有消息', readMore: '閱讀更多', back: '返回消息一覽', empty: '準備中。' },
};
