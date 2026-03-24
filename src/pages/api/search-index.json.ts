import type { APIRoute } from 'astro'
import { getAllPosts, getTranslation } from '@/lib/data-utils'

export const prerender = true

export const GET: APIRoute = async () => {
  try {
    const posts = await getAllPosts()

    const searchIndex = await Promise.all(
      posts.map(async (post) => {
        const enTranslation = await getTranslation(post.id, 'en')
        const title = enTranslation?.data.title ?? post.data.title
        const description = enTranslation?.data.description ?? post.data.description

        // Use English translation body if available, otherwise fall back to base post
        const sourcePost = enTranslation ?? post
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
          url: `/blog/en/${post.id}`,
          // Include full content for better search results
          content: textContent, // Full content for indexing
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
    // Return empty array on error instead of failing
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  }
}

