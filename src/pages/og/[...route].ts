import type { APIRoute, GetStaticPaths } from 'astro'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getCollection } from 'astro:content'

// Load fonts once at module level
const fontsDir = join(process.cwd(), 'public/fonts')
const geistDir = join(process.cwd(), 'node_modules/geist/dist/fonts/geist-sans')
const geistBold = readFileSync(join(geistDir, 'Geist-Bold.ttf'))
const geistRegular = readFileSync(join(geistDir, 'Geist-Regular.ttf'))
const pretendardBold = readFileSync(join(fontsDir, 'Pretendard-Bold.otf'))
const pretendardRegular = readFileSync(join(fontsDir, 'Pretendard-Regular.otf'))

const fonts = [
  { name: 'Geist', data: geistBold, weight: 700 as const, style: 'normal' as const },
  { name: 'Geist', data: geistRegular, weight: 400 as const, style: 'normal' as const },
  { name: 'Pretendard', data: pretendardBold, weight: 700 as const, style: 'normal' as const },
  { name: 'Pretendard', data: pretendardRegular, weight: 400 as const, style: 'normal' as const },
]

const ogCacheVersion = 1
const ogCacheDir = join(process.cwd(), '.astro/og-cache')

// Paw print SVG as data URL for satori background-image
const pawSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><ellipse cx="150" cy="190" rx="55" ry="48" fill="white"/><ellipse cx="90" cy="115" rx="28" ry="32" transform="rotate(-10 90 115)" fill="white"/><ellipse cx="145" cy="95" rx="25" ry="30" fill="white"/><ellipse cx="200" cy="100" rx="26" ry="30" transform="rotate(8 200 100)" fill="white"/><ellipse cx="240" cy="140" rx="24" ry="28" transform="rotate(25 240 140)" fill="white"/></svg>`
const pawDataUrl = `data:image/svg+xml,${encodeURIComponent(pawSvg)}`

function cachePathForOgImage(title: string, description: string) {
  const hash = createHash('sha256')
    .update(JSON.stringify({ version: ogCacheVersion, title, description }))
    .digest('hex')
  return join(ogCacheDir, `${hash}.png`)
}

async function readCachedOgImage(title: string, description: string) {
  if (process.env.OG_IMAGE_CACHE === '0') return null

  try {
    return await readFile(cachePathForOgImage(title, description))
  } catch {
    return null
  }
}

async function writeCachedOgImage(title: string, description: string, png: Uint8Array) {
  if (process.env.OG_IMAGE_CACHE === '0') return

  await mkdir(ogCacheDir, { recursive: true })
  await writeFile(cachePathForOgImage(title, description), png)
}

function buildOgImage(title: string, description: string) {
  // satori uses React-like element objects
  return {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        background: '#06060f',
        display: 'flex',
        position: 'relative' as const,
      },
      children: [
        // Gradient orb — top right (blue)
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '-40px',
              right: '40px',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(96,165,250,0.18) 0%, transparent 70%)',
            },
          },
        },
        // Gradient orb — bottom left (indigo/violet)
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              bottom: '-60px',
              left: '20px',
              width: '420px',
              height: '420px',
              background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)',
            },
          },
        },
        // Subtle center wash
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '100px',
              left: '300px',
              width: '600px',
              height: '400px',
              background: 'radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)',
            },
          },
        },
        // Paw watermark — top right
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '44px',
              right: '72px',
              width: '90px',
              height: '90px',
              backgroundImage: `url("${pawDataUrl}")`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              opacity: 0.04,
            },
          },
        },
        // Content container
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '72px 80px',
              width: '100%',
              height: '100%',
            },
            children: [
              // Site name — top left
              {
                type: 'div',
                props: {
                  style: {
                    position: 'absolute',
                    top: '56px',
                    left: '80px',
                    fontFamily: 'Geist, Pretendard',
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.12)',
                    letterSpacing: '0.06em',
                  },
                  children: 'sunghogigio.com',
                },
              },
              // Title
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Geist, Pretendard',
                    fontWeight: 700,
                    fontSize: title.length > 40 ? '48px' : '58px',
                    color: '#f0f0f5',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                  },
                  children: title,
                },
              },
              // Description
              ...(description && description !== '.'
                ? [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'Geist, Pretendard',
                          fontWeight: 400,
                          fontSize: '24px',
                          color: 'rgba(255,255,255,0.32)',
                          lineHeight: 1.5,
                          marginTop: '16px',
                        },
                        children:
                          description.length > 120
                            ? description.slice(0, 117) + '...'
                            : description,
                      },
                    },
                  ]
                : []),
            ],
          },
        },
      ],
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog')
  const paths: { params: { route: string }; props: { title: string; description: string } }[] = []

  for (const post of posts) {
    if (post.data.draft) continue
    const lang = post.data.lang || 'ko'
    const slug = post.data.translationOf || post.id
    const route = `blog/${lang}/${slug}.png`

    paths.push({
      params: { route },
      props: {
        title: post.data.title || '',
        description: post.data.description || '',
      },
    })
  }

  return paths
}

export const GET: APIRoute = async ({ props }) => {
  const { title, description } = props as { title: string; description: string }

  const cached = await readCachedOgImage(title, description)
  if (cached) {
    return new Response(new Uint8Array(cached), {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  }

  const element = buildOgImage(title, description)

  const svg = await satori(element as any, {
    width: 1200,
    height: 630,
    fonts,
  })

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  })
  const png = resvg.render().asPng()
  await writeCachedOgImage(title, description, png)

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
