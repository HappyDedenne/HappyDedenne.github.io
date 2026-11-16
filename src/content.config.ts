import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';

/** YAMLの配列ファイルを読み込み、各要素にidと並び順(order)を付ける */
const yamlList = (path: string) =>
  file(path, {
    parser: (text) =>
      ((parse(text) ?? []) as Record<string, unknown>[]).map((d, i) => ({
        id: String(d.id ?? i),
        order: i,
        ...d,
      })),
  });

/** 文字列、または { en: '...', ja: '...' } */
const L = z.union([z.string(), z.object({ en: z.string(), ja: z.string() })]);
/** 文字列の配列、または { en: [...], ja: [...] } */
const LA = z.union([z.array(z.string()), z.object({ en: z.array(z.string()), ja: z.array(z.string()) })]);

const yearMonth = z.string().regex(/^\d{4}(\.\d{2})?$/, 'YYYY または YYYY.MM 形式で、引用符で囲んで書いてください');

// ---- Blog / profile -----------------------------------------------------
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'ja']).default('ja'),
    draft: z.boolean().default(false),
  }),
});

// トップページの自己紹介文（src/content/profile/en.md, ja.md）
const profile = defineCollection({
  loader: glob({ base: './src/content/profile', pattern: '*.md' }),
  schema: z.object({}),
});

// ---- Publications ---------------------------------------------------------
const publications = defineCollection({
  loader: yamlList('src/data/publications.yaml'),
  schema: z.object({
    order: z.number(),
    type: z.enum(['journal', 'international', 'domestic']),
    authors: LA,
    title: z.string(),
    venue: L,
    details: L.optional(),
    date: yearMonth,
    doi: z.string().optional(),
    url: z.string().optional(),
    pdf: z.string().optional(),
    presentation: z.enum(['oral', 'poster', 'oral+poster']).optional(),
    note: L.optional(),
    award: L.optional(),
    lang: z.enum(['en', 'ja']).default('en'),
    selected: z.boolean().default(false),
  }),
});

// ---- Home ---------------------------------------------------------------
const news = defineCollection({
  loader: yamlList('src/data/news.yaml'),
  schema: z.object({ order: z.number(), date: yearMonth, text: L, link: z.string().optional() }),
});

const research = defineCollection({
  loader: yamlList('src/data/research.yaml'),
  schema: z.object({
    order: z.number(),
    title: L,
    period: z.string(),
    summary: L,
    keywords: z.array(z.string()).default([]),
  }),
});

// ---- CV -----------------------------------------------------------------
const education = defineCollection({
  loader: yamlList('src/data/cv/education.yaml'),
  schema: z.object({
    order: z.number(),
    period: L,
    degree: L,
    school: L,
    lab: L.optional(),
    advisor: L.optional(),
    research: L.optional(),
  }),
});

// インターン・職歴（アルバイト/RA/研究員）・研修を1ファイルで管理し、category で欄を分ける
const experience = defineCollection({
  loader: yamlList('src/data/cv/experience.yaml'),
  schema: z.object({
    order: z.number(),
    period: z.string(),
    category: z.enum(['internship', 'employment', 'training']),
    kind: z.enum(['ra', 'fellow', 'parttime', 'oa', 'mentor']).optional(),
    title: L,
    org: L,
    place: L.optional(),
    note: L.optional(),
  }),
});

const awards = defineCollection({
  loader: yamlList('src/data/cv/awards.yaml'),
  schema: z.object({
    order: z.number(),
    date: yearMonth,
    title: L,
    org: L,
    work: L.optional(),
    note: L.optional(),
  }),
});

const fellowships = defineCollection({
  loader: yamlList('src/data/cv/fellowships.yaml'),
  schema: z.object({ order: z.number(), period: z.string(), title: L, org: L.optional() }),
});

const skills = defineCollection({
  loader: yamlList('src/data/cv/skills.yaml'),
  schema: z.object({ order: z.number(), group: L, items: z.array(L) }),
});

const activities = defineCollection({
  loader: yamlList('src/data/cv/activities.yaml'),
  schema: z.object({ order: z.number(), period: z.string().optional(), title: L, org: L.optional() }),
});

export const collections = {
  blog,
  profile,
  publications,
  news,
  research,
  education,
  experience,
  awards,
  fellowships,
  skills,
  activities,
};
