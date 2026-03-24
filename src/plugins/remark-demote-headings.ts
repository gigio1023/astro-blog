/**
 * Remark plugin that demotes all headings by one level in markdown content.
 * h1 → h2, h2 → h3, etc. This ensures the page has only one h1 (the post title)
 * while markdown authors can use # freely for top-level sections.
 */
import type { Root } from 'mdast'
import { visit } from 'unist-util-visit'

export function remarkDemoteHeadings() {
  return (tree: Root) => {
    visit(tree, 'heading', (node) => {
      if (node.depth < 6) {
        node.depth = (node.depth + 1) as 1 | 2 | 3 | 4 | 5 | 6
      }
    })
  }
}
