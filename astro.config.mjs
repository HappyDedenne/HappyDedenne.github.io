// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// サイトの URL。GitHub Actions で公開するときは、リポジトリの持ち主（GitHub のユーザー名）から
// https://<ユーザー名>.github.io を自動で組み立てるので、書き換える必要はありません。
// 独自ドメインを使うときだけ、GitHub のリポジトリ設定で環境変数 SITE_URL を設定するか、ここを直接書き換えます。
const owner = process.env.GITHUB_REPOSITORY_OWNER?.toLowerCase();
const site = process.env.SITE_URL || (owner ? `https://${owner}.github.io` : 'http://localhost:4321');

export default defineConfig({
  site,
  integrations: [mdx(), sitemap()],
  markdown: {
    // 数式（$...$ / $$...$$）を KaTeX で表示するため unified パイプラインを使う。.mdx にも同じ設定が効く。
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
