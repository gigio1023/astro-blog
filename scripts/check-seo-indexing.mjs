import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const distDir = join(process.cwd(), 'dist')
const redirectsPath = join(distDir, '_redirects')
const sitemapPath = join(distDir, 'sitemap-0.xml')
const siteOrigin = 'https://sunghogigio.com'
const failures = []
const redirectExpectations = [
  ['/blog/ko/example-post', '/blog/ko/example-post/'],
  ['/blog/en/example-post', '/blog/en/example-post/'],
  ['/blog/it/example-post', '/blog/it/example-post/'],
  ['/blog/ko/example-post/1700000000000', '/blog/ko/example-post/'],
  ['/blog/en/example-post/1700000000000', '/blog/en/example-post/'],
  ['/blog/it/example-post/1700000000000', '/blog/it/example-post/'],
  ['/blog/example-post/1700000000000', '/blog/en/example-post/'],
  ['/blog/programmers-lifeboat', '/blog/en/programmers-lifeboat/'],
  ['/blog/programmers-lifeboat/', '/blog/en/programmers-lifeboat/'],
  ['/tags/agent', '/tags/agent/'],
  ['/authors/sungho-park', '/authors/sungho-park/'],
]
const redirectNonExpectations = [
  ['/blog/en/example-post', '/blog/en/en/'],
  ['/blog/ko/example-post', '/blog/en/ko/'],
  ['/blog/it/example-post', '/blog/en/it/'],
  ['/blog/2', '/blog/en/2/'],
]
const MAX_STATIC_REDIRECTS = 2000
const MAX_DYNAMIC_REDIRECTS = 100

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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function compileRedirectSource(source) {
  const names = []
  const pattern = source
    .split('/')
    .map((part) => {
      if (part === '*') {
        names.push('splat')
        return '(.*)'
      }

      if (part.startsWith(':')) {
        names.push(part.slice(1))
        return '([^/]+)'
      }

      return escapeRegExp(part)
    })
    .join('/')

  return { names, regex: new RegExp(`^${pattern}$`) }
}

function parseRedirects(redirects) {
  return redirects
    .split('\n')
    .map((line, index) => ({ line: line.trim(), lineNumber: index + 1 }))
    .filter(({ line }) => line && !line.startsWith('#'))
    .map(({ line, lineNumber }) => {
      const [source, destination, status = '302'] = line.split(/\s+/)
      const dynamic = source.includes(':') || source.includes('*')
      const { names, regex } = compileRedirectSource(source)

      return {
        source,
        destination,
        status,
        lineNumber,
        dynamic,
        names,
        regex,
      }
    })
}

function resolveRedirect(pathname, rules) {
  for (const rule of rules) {
    const match = pathname.match(rule.regex)

    if (!match) {
      continue
    }

    let destination = rule.destination
    rule.names.forEach((name, index) => {
      destination = destination.replaceAll(`:${name}`, match[index + 1])
    })

    return { ...rule, destination }
  }

  return null
}

if (!existsSync(distDir) || !existsSync(sitemapPath)) {
  fail('Run npm run build before npm run check:seo.')
} else {
  if (!existsSync(redirectsPath)) {
    fail('Cloudflare _redirects file is missing from dist.')
  } else {
    const redirects = readFileSync(redirectsPath, 'utf8')
    const redirectRules = parseRedirects(redirects)
    const dynamicRedirectCount = redirectRules.filter(
      (rule) => rule.dynamic,
    ).length
    const staticRedirectCount = redirectRules.length - dynamicRedirectCount

    if (staticRedirectCount > MAX_STATIC_REDIRECTS) {
      fail(
        `Cloudflare _redirects contains ${staticRedirectCount} static redirects; limit is ${MAX_STATIC_REDIRECTS}.`,
      )
    }

    if (dynamicRedirectCount > MAX_DYNAMIC_REDIRECTS) {
      fail(
        `Cloudflare _redirects contains ${dynamicRedirectCount} dynamic redirects; limit is ${MAX_DYNAMIC_REDIRECTS}.`,
      )
    }

    for (const [source, expectedDestination] of redirectExpectations) {
      const redirect = resolveRedirect(source, redirectRules)

      if (!redirect) {
        fail(`Cloudflare _redirects does not match ${source}.`)
        continue
      }

      if (redirect.destination !== expectedDestination) {
        fail(
          `Cloudflare _redirects sends ${source} to ${redirect.destination}; expected ${expectedDestination}. Matched line ${redirect.lineNumber}: ${redirect.source}`,
        )
      }
    }

    for (const [source, forbiddenDestination] of redirectNonExpectations) {
      const redirect = resolveRedirect(source, redirectRules)

      if (redirect?.destination === forbiddenDestination) {
        fail(
          `Cloudflare _redirects sends ${source} to forbidden destination ${forbiddenDestination}. Matched line ${redirect.lineNumber}: ${redirect.source}`,
        )
      }
    }
  }

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
