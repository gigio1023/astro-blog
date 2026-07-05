import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const distDir = join(process.cwd(), 'dist')
const sitemapPath = join(distDir, 'sitemap-0.xml')
const siteOrigin = 'https://sunghogigio.com'
const failures = []

function fail(message) {
  failures.push(message)
}

function isFileUrlPath(pathname) {
  return /\/[^/]+\.[^/]+$/.test(pathname)
}

function isCanonicalPagePath(pathname) {
  return pathname === '/' || pathname.endsWith('/') || isFileUrlPath(pathname)
}

function shouldSkipInternalPath(pathname) {
  return pathname.startsWith('/_astro/') || pathname.startsWith('/cdn-cgi/')
}

function routePathForHtml(filePath) {
  const rel = relative(distDir, filePath).split(sep).join('/')

  if (rel === 'index.html') return '/'
  if (rel.endsWith('/index.html'))
    return `/${rel.slice(0, -'index.html'.length)}`
  return `/${rel}`
}

function walkHtml(dir, result = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      walkHtml(fullPath, result)
    } else if (entry.endsWith('.html')) {
      result.push(fullPath)
    }
  }

  return result
}

if (!existsSync(distDir) || !existsSync(sitemapPath)) {
  fail('Run npm run build before npm run check:seo.')
} else {
  const sitemap = readFileSync(sitemapPath, 'utf8')
  const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  )
  const sitemapPaths = new Set(sitemapUrls.map((url) => new URL(url).pathname))

  for (const url of sitemapUrls) {
    const { pathname } = new URL(url)

    if (!isCanonicalPagePath(pathname)) {
      fail(`Sitemap URL is not canonical: ${url}`)
    }

    if (/\/\d{10,}\/?$/.test(pathname)) {
      fail(`Sitemap contains a legacy timestamp URL: ${url}`)
    }

    if (/^\/tags\/[^/]+\/$/.test(pathname)) {
      fail(`Sitemap contains noindex tag page: ${url}`)
    }

    if (/^\/authors\/[^/]+\/$/.test(pathname)) {
      fail(`Sitemap contains noindex author page: ${url}`)
    }
  }

  for (const htmlPath of walkHtml(distDir)) {
    const html = readFileSync(htmlPath, 'utf8')
    const htmlWithoutCodeBlocks = html.replace(/<pre\b[\s\S]*?<\/pre>/gi, '')
    const routePath = routePathForHtml(htmlPath)

    if (
      html.includes('name="robots" content="noindex') &&
      sitemapPaths.has(routePath)
    ) {
      fail(`Noindex page is present in sitemap: ${routePath}`)
    }

    for (const match of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
      const href = match[1]

      if (href.includes('{{')) {
        fail(`Unresolved template URL in ${routePath}: ${href}`)
        continue
      }

      if (!href.startsWith('/') || href.startsWith('//')) {
        continue
      }

      const { pathname } = new URL(href, siteOrigin)

      if (shouldSkipInternalPath(pathname)) {
        continue
      }

      if (!isCanonicalPagePath(pathname)) {
        fail(`Internal page URL is not canonical in ${routePath}: ${href}`)
      }
    }

    for (const match of htmlWithoutCodeBlocks.matchAll(
      new RegExp(`${siteOrigin.replaceAll('.', '\\.')}[^"'<\\s]+`, 'g'),
    )) {
      const url = match[0]
      const { pathname } = new URL(url)

      if (!isCanonicalPagePath(pathname)) {
        fail(`Absolute site URL is not canonical in ${routePath}: ${url}`)
      }
    }
  }

  const searchIndexPath = join(distDir, 'api/search-index.json')
  if (existsSync(searchIndexPath)) {
    const searchIndex = JSON.parse(readFileSync(searchIndexPath, 'utf8'))

    for (const item of searchIndex) {
      if (item.url && !isCanonicalPagePath(item.url)) {
        fail(`Search index URL is not canonical: ${item.url}`)
      }
    }
  }
}

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'))
  process.exit(1)
}

console.log('SEO indexing checks passed.')
