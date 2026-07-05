import type { SupportedLang } from '@/consts'

const SCHEME_RE = /^[a-z][a-z0-9+.-]*:/i
const FILE_EXTENSION_RE = /\/[^/?#]+\.[^/?#]+$/

function splitUrlSuffix(href: string) {
  const hashIndex = href.indexOf('#')
  const beforeHash = hashIndex === -1 ? href : href.slice(0, hashIndex)
  const hash = hashIndex === -1 ? '' : href.slice(hashIndex)
  const queryIndex = beforeHash.indexOf('?')

  return {
    pathname: queryIndex === -1 ? beforeHash : beforeHash.slice(0, queryIndex),
    query: queryIndex === -1 ? '' : beforeHash.slice(queryIndex),
    hash,
  }
}

export function normalizeInternalHref(href: string): string {
  if (
    !href ||
    href.startsWith('#') ||
    href.startsWith('//') ||
    SCHEME_RE.test(href)
  ) {
    return href
  }

  const { pathname, query, hash } = splitUrlSuffix(href)

  if (
    !pathname ||
    pathname === '/' ||
    pathname.endsWith('/') ||
    FILE_EXTENSION_RE.test(pathname)
  ) {
    return `${pathname}${query}${hash}`
  }

  return `${pathname}/${query}${hash}`
}

export function toAbsoluteUrl(href: string, base: string | URL): string {
  return new URL(normalizeInternalHref(href), base).href
}

export function postPath(lang: SupportedLang | string, slug: string): string {
  return `/blog/${encodeURIComponent(lang)}/${encodeURI(slug)}/`
}

export function tagPath(tag: string): string {
  return `/tags/${encodeURIComponent(tag)}/`
}

export function authorPath(authorId: string): string {
  return `/authors/${encodeURIComponent(authorId)}/`
}
