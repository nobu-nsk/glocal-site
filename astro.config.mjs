// @ts-check
import { defineConfig } from 'astro/config';

// 自社サイト（静的出力）。Cloudflare Pages へそのままデプロイ可能。
export default defineConfig({
  site: 'https://www.glocal-commune.com',
  trailingSlash: 'always',
});
