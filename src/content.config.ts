import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
    // 賃貸物件の物件概要（不動産表示規約に対応するコンパクトな仕様表）
    specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    specsNote: z.string().optional(),
    booking: z
      .object({
        heading: z.string().optional(),
        lead: z.string().optional(),
        bookingUrl: z.string().optional(),
        bookingLabel: z.string().optional(),
        airbnb: z.string().optional(),
        contact: z.string().optional(),
      })
      .default({}),
  }),
});

export const collections = { properties };

// ジャンルの表示ラベル（日本語）
export const GENRE_LABELS: Record<string, string> = {
  stay: '宿泊',
  'resort-rental': 'リゾート賃貸',
  residence: '居住用賃貸',
};
