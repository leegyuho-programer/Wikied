import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_HOST;

  // Sitemap에 포함할 페이지 목록
  const staticPages = [
    { path: '', priority: 1.0 },
    { path: 'mypage', priority: 0.8 },
    { path: 'freeBoard', priority: 0.8 },
    { path: 'user', priority: 0.8 },
    { path: 'article', priority: 0.7 },
    { path: 'wikilist', priority: 0.7 },
    { path: 'posting', priority: 0.7 },
    { path: 'myAccount', priority: 0.5 },
    { path: 'userEdit', priority: 0.5 },
    { path: 'login', priority: 0.3 },
    { path: 'signup', priority: 0.3 },
  ];

  return staticPages.map(({ path, priority }) => ({
    url: `${baseUrl}/${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority,
  }));
}
