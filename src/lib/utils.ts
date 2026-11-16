import { getCollection, type CollectionEntry } from 'astro:content';

/** 公開する記事（本番ビルドでは draft: true を除外）を新しい順で返す */
export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => (import.meta.env.PROD ? !data.draft : true));
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export type Post = CollectionEntry<'blog'>;

/** タグ（slug）→ { 表示名, 記事 } */
export async function getTagMap() {
  const posts = await getPosts();
  const byTag = new Map<string, { name: string; posts: Post[] }>();
  for (const p of posts) {
    for (const t of p.data.tags) {
      const key = slugifyTag(t);
      if (!byTag.has(key)) byTag.set(key, { name: t, posts: [] });
      byTag.get(key)!.posts.push(p);
    }
  }
  return byTag;
}

/** 'YYYY' / 'YYYY.MM' を比較用の数値に */
export const ymValue = (s: string) => {
  const [y, m = '0'] = s.split('.');
  return Number(y) * 100 + Number(m);
};

export const byYmDesc = <T extends { data: { date: string } }>(a: T, b: T) =>
  ymValue(b.data.date) - ymValue(a.data.date);

export const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

/** 2026-11-17 形式 */
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export const slugifyTag = (t: string) =>
  t
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
