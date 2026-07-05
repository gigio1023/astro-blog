const LEGACY_POST_TIMESTAMP_RE = /^\/blog\/(ko|en|it)\/([^/]+)\/(\d{10,})\/?$/
const LEGACY_DEFAULT_LANG_POST_RE =
  /^\/blog\/(?!ko(?:\/|$)|en(?:\/|$)|it(?:\/|$))([^/]+)\/?$/
const LEGACY_DEFAULT_LANG_POST_TIMESTAMP_RE =
  /^\/blog\/(?!ko(?:\/|$)|en(?:\/|$)|it(?:\/|$))([^/]+)\/(\d{10,})\/?$/
const PUBLIC_FILE_RE =
  /\.(?:avif|css|gif|ico|jpg|jpeg|js|json|map|mp3|mp4|pdf|png|svg|txt|webmanifest|webp|woff2?|xml)$/i
const RESERVED_PREFIXES = ['/api/', '/_astro/', '/cdn-cgi/']
const DEFAULT_BLOG_LANG = 'en'

type MiddlewareContext = {
  request: Request
  next: () => Promise<Response>
}

function redirect(url: URL, pathname: string): Response {
  url.pathname = pathname
  return Response.redirect(url.toString(), 301)
}

export const onRequest = async ({ request, next }: MiddlewareContext) => {
  const url = new URL(request.url)
  const isNavigationRequest =
    request.method === 'GET' || request.method === 'HEAD'
  const legacyPostMatch = url.pathname.match(LEGACY_POST_TIMESTAMP_RE)
  const legacyDefaultLangPostMatch = url.pathname.match(
    LEGACY_DEFAULT_LANG_POST_RE,
  )
  const legacyDefaultLangPostTimestampMatch = url.pathname.match(
    LEGACY_DEFAULT_LANG_POST_TIMESTAMP_RE,
  )

  if (isNavigationRequest && legacyPostMatch) {
    return redirect(url, `/blog/${legacyPostMatch[1]}/${legacyPostMatch[2]}/`)
  }

  if (isNavigationRequest && legacyDefaultLangPostTimestampMatch) {
    return redirect(
      url,
      `/blog/${DEFAULT_BLOG_LANG}/${legacyDefaultLangPostTimestampMatch[1]}/`,
    )
  }

  if (
    isNavigationRequest &&
    legacyDefaultLangPostMatch &&
    !/^\d+$/.test(legacyDefaultLangPostMatch[1])
  ) {
    return redirect(
      url,
      `/blog/${DEFAULT_BLOG_LANG}/${legacyDefaultLangPostMatch[1]}/`,
    )
  }

  const shouldNormalizeSlash =
    isNavigationRequest &&
    url.pathname !== '/' &&
    !url.pathname.endsWith('/') &&
    !RESERVED_PREFIXES.some((prefix) => url.pathname.startsWith(prefix)) &&
    !PUBLIC_FILE_RE.test(url.pathname)

  if (shouldNormalizeSlash) {
    return redirect(url, `${url.pathname}/`)
  }

  return next()
}
