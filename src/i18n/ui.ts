// 日英切り替えのための辞書とヘルパー
// 英語ページは /、日本語ページは /ja/ 以下。

export type Lang = 'en' | 'ja';
export const LANGS: Lang[] = ['en', 'ja'];

/** YAML などで { en: ..., ja: ... } と書かれた値を言語に応じて取り出す（文字列ならそのまま） */
export type Localized<T = string> = T | { en: T; ja: T };
export function t<T>(v: Localized<T> | undefined, lang: Lang): T | undefined {
  if (v && typeof v === 'object' && !Array.isArray(v) && 'en' in (v as object) && 'ja' in (v as object)) {
    return (v as { en: T; ja: T })[lang];
  }
  return v as T | undefined;
}

/** 言語に応じたパス（/publications/ → /ja/publications/） */
export const localePath = (path: string, lang: Lang) => (lang === 'ja' ? `/ja${path}` : path);

/** 現在のパスの反対言語版 */
export function switchPath(pathname: string): { lang: Lang; href: string } {
  if (pathname === '/ja' || pathname.startsWith('/ja/')) {
    return { lang: 'en', href: pathname.replace(/^\/ja/, '') || '/' };
  }
  return { lang: 'ja', href: `/ja${pathname}` };
}

export const langFromPath = (pathname: string): Lang =>
  pathname === '/ja' || pathname.startsWith('/ja/') ? 'ja' : 'en';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** 'YYYY' / 'YYYY.MM' → 'Nov 2026' / '2026年11月' */
export function ymLabel(s: string, lang: Lang) {
  const [y, m] = s.split('.');
  if (!m) return lang === 'ja' ? `${y}年` : y;
  return lang === 'ja' ? `${y}年${Number(m)}月` : `${MONTHS[Number(m) - 1]} ${y}`;
}

export const ui = {
  en: {
    'nav.about': 'About',
    'nav.publications': 'Publications',
    'nav.cv': 'CV',
    'nav.blog': 'Blog',
    'toggle.label': 'Language',
    'theme.toggle': 'Toggle dark mode',

    'home.about': 'About',
    'home.research': 'Research',
    'home.news': 'News',
    'home.latest': 'Latest Posts',
    'home.selected': 'Selected Publications',
    'home.topics': (n: number) => (n === 1 ? '1 topic' : `${n} topics`),
    'home.noPosts': 'No posts yet — coming soon.',
    'home.allPosts': 'All posts →',
    'home.fullList': 'Full list →',
    'home.location': 'Kyoto, Japan',

    'pub.title': 'Publications',
    'pub.journal': 'Journal Papers',
    'pub.international': 'International Conferences (peer-reviewed)',
    'pub.domestic': 'Domestic Conferences & Workshops (non-refereed)',
    'pub.items': (n: number) => (n === 1 ? '1 item' : `${n} items`),
    'pub.oral': 'Oral',
    'pub.poster': 'Poster',
    'pub.oral+poster': 'Oral + Poster',
    'pub.inJapanese': 'In Japanese',
    'pub.awards': 'Honors & Awards',
    'pub.details': 'Details ↗',

    'cv.title': 'Curriculum Vitae',
    'cv.pdf': 'Download PDF ↓',
    'cv.education': 'Education',
    'cv.interests': 'Research Interests',
    'cv.internships': 'Internships',
    'cv.employment': 'Employment (Part-time, RA, Research Fellow)',
    'cv.training': 'Training',
    'cv.publications': 'Publications',
    'cv.awards': 'Honors & Awards',
    'cv.scholarships': 'Scholarships',
    'cv.skills': 'Skills',
    'cv.activities': 'Extracurricular Activities',
    'cv.lab': 'Laboratory',
    'cv.advisor': 'Advisor',
    'cv.research': 'Research',
    'cv.thesis.bachelor': "Bachelor's thesis",
    'cv.thesis.master': "Master's thesis",
    'cv.thesis.doctor': 'Dissertation',
    'cv.kind.ra': 'RA',
    'cv.kind.fellow': 'Research Fellow',
    'cv.kind.parttime': 'Part-time',
    'cv.kind.oa': 'Office Assistant',
    'cv.kind.mentor': 'Mentor',

    'blog.title': 'Blog',
    'blog.lead': 'Technical notes on circuit design, computing-in-memory, EDA tools, and research life.',
    'blog.posts': (n: number) => (n === 1 ? '1 post' : `${n} posts`),
    'blog.empty': 'No posts yet — the first one is on its way.',
    'blog.all': 'All posts',
    'blog.back': '← All posts',
    'blog.contents': 'Contents',
    'blog.minRead': (n: number) => `${n} min read`,
    'blog.updated': 'updated',
    'blog.tagged': (tag: string) => `Posts tagged ${tag}.`,

    'footer.updated': 'Last updated',
    'footer.builtWith': 'Built with',
  },
  ja: {
    'nav.about': 'プロフィール',
    'nav.publications': '研究業績',
    'nav.cv': '経歴',
    'nav.blog': 'ブログ',
    'toggle.label': '言語',
    'theme.toggle': 'ダークモード切り替え',

    'home.about': 'プロフィール',
    'home.research': '研究テーマ',
    'home.news': 'お知らせ',
    'home.latest': '最新の記事',
    'home.selected': '主な研究業績',
    'home.topics': (n: number) => `${n} 件`,
    'home.noPosts': 'まだ記事はありません。',
    'home.allPosts': '記事一覧 →',
    'home.fullList': 'すべての業績 →',
    'home.location': '京都',

    'pub.title': '研究業績',
    'pub.journal': '論文誌',
    'pub.international': '国際会議（査読あり）',
    'pub.domestic': '国内学会・研究会（査読なし）',
    'pub.items': (n: number) => `${n} 件`,
    'pub.oral': '口頭発表',
    'pub.poster': 'ポスター発表',
    'pub.oral+poster': '口頭・ポスター発表',
    'pub.inJapanese': '日本語',
    'pub.awards': '受賞歴',
    'pub.details': '詳細 ↗',

    'cv.title': '経歴',
    'cv.pdf': 'PDF をダウンロード ↓',
    'cv.education': '学歴',
    'cv.interests': '研究分野',
    'cv.internships': 'インターンシップ',
    'cv.employment': '職歴（アルバイト・RA・研究員）',
    'cv.training': '研修',
    'cv.publications': '研究業績',
    'cv.awards': '受賞歴',
    'cv.scholarships': '奨学金',
    'cv.skills': 'スキル',
    'cv.activities': '課外活動',
    'cv.lab': '研究室',
    'cv.advisor': '指導教員',
    'cv.research': '研究内容',
    'cv.thesis.bachelor': '卒業論文',
    'cv.thesis.master': '修士論文',
    'cv.thesis.doctor': '博士論文',
    'cv.kind.ra': 'RA',
    'cv.kind.fellow': '研究員',
    'cv.kind.parttime': 'アルバイト',
    'cv.kind.oa': 'OA',
    'cv.kind.mentor': 'メンター',

    'blog.title': 'ブログ',
    'blog.lead': '回路設計、Compute-in-Memory、EDA ツール、研究生活などについての技術メモです。',
    'blog.posts': (n: number) => `${n} 件`,
    'blog.empty': 'まだ記事はありません。',
    'blog.all': '記事一覧',
    'blog.back': '← 記事一覧',
    'blog.contents': '目次',
    'blog.minRead': (n: number) => `${n} 分で読めます`,
    'blog.updated': '更新',
    'blog.tagged': (tag: string) => `タグ「${tag}」の記事`,

    'footer.updated': '最終更新',
    'footer.builtWith': 'Built with',
  },
} as const;

type Dict = (typeof ui)['en'];
export type UIKey = keyof Dict;

/** UI 文言を取り出す。use(lang)('nav.about') のように使う */
export function useUI(lang: Lang) {
  return <K extends UIKey>(key: K): (typeof ui)['en'][K] => (ui[lang] as unknown as Dict)[key] as Dict[K];
}
