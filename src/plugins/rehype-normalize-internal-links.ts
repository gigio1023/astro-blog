import { normalizeInternalHref } from '../lib/urls'

type HastNode = {
  type?: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: HastNode[]
}

function normalizeLinks(node: HastNode) {
  if (
    node.type === 'element' &&
    node.tagName === 'a' &&
    typeof node.properties?.href === 'string'
  ) {
    node.properties.href = normalizeInternalHref(node.properties.href)
  }

  for (const child of node.children ?? []) {
    normalizeLinks(child)
  }
}

export function rehypeNormalizeInternalLinks() {
  return (tree: HastNode) => {
    normalizeLinks(tree)
  }
}
