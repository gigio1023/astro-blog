import type { APIRoute } from 'astro'
import { getAllPosts, getLocalizedTitle, getLocalizedDescription, getTranslation } from '@/lib/data-utils'
import { DEFAULT_LANG } from '@/consts'

export const prerender = true

export const GET: APIRoute = async () => {
  try {
    const posts = await getAllPosts()

    const searchIndex = await Promise.all(
      posts.map(async (post) => {
        const title = await getLocalizedTitle(post, DEFAULT_LANG)
        const description = await getLocalizedDescription(post, DEFAULT_LANG)

        // Use translation body in default language if available, otherwise fall back to base post
        const translation = await getTranslation(post.id, DEFAULT_LANG)
        const sourcePost = translation ?? post
        const htmlContent = (sourcePost as { body?: string }).body || ''
        const textContent = htmlContent
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()

        return {
          id: post.id || '',
          title: title || '',
          description: description || '',
          date: post.data.date?.toISOString() || new Date().toISOString(),
          tags: post.data.tags || [],
          authors: post.data.authors || [],
          url: `/blog/${DEFAULT_LANG}/${post.id}`,
          content: textContent,
        }
      }),
    )

    return new Response(JSON.stringify(searchIndex), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Error generating search index:', error)
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  }
}
