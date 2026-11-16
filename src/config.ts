// サイト全体の基本情報。名前・リンク・ナビゲーションはここだけ直せば全ページに反映されます。
// { en: ..., ja: ... } と書いた項目は、英語ページと日本語ページで出し分けられます。

export const SITE = {
  name: { en: 'Hiroto Tagata', ja: '田形 寛斗' },
  // 名前の横に小さく添える別表記
  altName: { en: '田形 寛斗', ja: 'Hiroto Tagata' },
  description: {
    en: 'Hiroto Tagata — Ph.D. candidate at Kyoto University working on energy-efficient circuits for AI: computing-in-memory and LUT-based accelerators.',
    ja: '田形寛斗（京都大学大学院 情報学研究科 博士後期課程）の個人サイト。AI 向けの省エネルギー集積回路（Compute-in-Memory、LUT 型アクセラレータ）の研究。',
  },
  role: { en: 'Ph.D. Candidate', ja: '博士後期課程 3年' },
  affiliation: {
    en: 'Graduate School of Informatics, Kyoto University',
    ja: '京都大学大学院 情報学研究科',
  },
  lab: { en: 'Sato Laboratory', ja: '佐藤研究室' },
  // 顔写真を public/images/ に置いたらパスを書く（例: '/images/profile.jpg'）。空なら頭文字のプレースホルダー。
  photo: '/images/profile.jpg',
  // CVのPDFを public/ に置いたらパスを書く（例: '/cv.pdf'）。空ならボタンを出さない。
  cvPdf: '',
  // 論文リストで太字にする自分の名前の表記
  me: ['H. Tagata', 'Hiroto Tagata', '田形寛斗', '田形 寛斗'],
};

// 空文字のリンクは表示されません。並び順がそのままボタンの順になります（プロフィールと経歴ページに表示）。
export const LINKS: { label: string; href: string }[] = [
  { label: 'Email', href: '' }, // 例: 'mailto:you@example.com'
  { label: 'Google Scholar', href: '' },
  { label: 'ORCID', href: '' },
  { label: 'researchmap', href: '' },
  { label: 'GitHub', href: '' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/%E5%AF%9B%E6%96%97-%E7%94%B0%E5%BD%A2-125171238/' },
  { label: 'X', href: '' },
  { label: 'Zenn', href: '' },
];

export const NAV = [
  { key: 'nav.about', href: '/' },
  { key: 'nav.publications', href: '/publications/' },
  { key: 'nav.cv', href: '/cv/' },
  { key: 'nav.blog', href: '/blog/' },
] as const;
