import { SITE } from '@/consts'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getAllPosts, getTranslation } from '@/lib/data-utils'

export async function GET(context: APIContext) {
  try {
    const posts = await getAllPosts()

    const items = await Promise.all(
      posts.map(async (post) => {
        const enTranslation = await getTranslation(post.id, 'en')
        const title = enTranslation?.data.title ?? post.data.title
        const description = enTranslation?.data.description ?? post.data.description

        return {
          title,
          description,
          pubDate: post.data.date,
          link: `/blog/en/${post.id}/`,
        }
      }),
    )

    return rss({
      title: SITE.title,
      description: SITE.description,
      site: context.site ?? SITE.href,
      items,
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new Response('Error generating RSS feed', { status: 500 })
  }
}
