import rss from '@astrojs/rss';
import { getPosts } from '../lib/utils';
import { SITE } from '../config';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: `${SITE.name.en} — Blog`,
    description: SITE.description.en,
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      categories: p.data.tags,
      link: `/blog/${p.id}/`,
    })),
  });
}
