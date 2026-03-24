import { OGImageRoute } from 'astro-og-canvas'

// Content pages (blog posts, etc.)
const contentPages = import.meta.glob('/src/content/**/*.{md,mdx}', { eager: true })

// Map content file paths to the URL paths the site actually uses:
//   index.md   (lang: ko)  -> /blog/ko/{slug}.png
//   index.en.md             -> /blog/en/{slug}.png
//   index.it.md             -> /blog/it/{slug}.png
const contentPagesMap: Record<string, any> = {}
for (const [path, page] of Object.entries(contentPages)) {
  const relativePath = path.replace('/src/content', '')
  contentPagesMap[relativePath] = page
}

/** Convert a content file path to the OG image slug the pages expect. */
function contentPathToSlug(path: string, page: any): string {
  // path looks like: /blog/{slug}/index.md or /blog/{slug}/index.en.md
  const match = path.match(/^\/blog\/([^/]+)\/index(?:\.([a-z]{2}))?\.mdx?$/)
  if (match) {
    const slug = match[1]
    const lang = match[2] || (page as any).frontmatter?.lang || 'ko'
    return `/blog/${lang}/${slug}.png`
  }
  // Fallback: strip extension, add .png
  return path.replace(/\.[^.]*$/, '') + '.png'
}

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'route',
  pages: contentPagesMap,
  getSlug: contentPathToSlug,
  getImageOptions: (_path, page) => ({
    title: page.frontmatter.title || page.frontmatter.name || '',
    description: page.frontmatter.description || '',
    logo: {
      path: './public/static/logo.png',
      size: [80, 80],
    },
    font: {
      title: {
        families: ['Geist Mono', 'Noto Sans KR'],
        weight: 'Bold',
        size: 48,
        color: [255, 255, 255],
      },
      description: {
        families: ['Geist Mono', 'Noto Sans KR'],
        weight: 'Normal',
        size: 28,
        color: [156, 163, 175],
      },
    },
    fonts: [
      './public/fonts/GeistMonoVF.woff2',
      './public/fonts/NotoSansKR-Regular.ttf',
    ],
    bgGradient: [[24, 24, 27]],
    padding: 80,
  }),
})
