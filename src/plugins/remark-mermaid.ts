function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function remarkMermaid() {
  return (tree: any) => {
    const toReplace: { parent: any; index: number; value: string }[] = []

    ;(function walk(node: any, parent?: any, index?: number) {
      if (
        node.type === 'code' &&
        node.lang === 'mermaid' &&
        parent &&
        typeof index === 'number'
      ) {
        toReplace.push({ parent, index, value: node.value })
      }
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          walk(node.children[i], node, i)
        }
      }
    })(tree)

    for (const { parent, index, value } of toReplace) {
      parent.children[index] = {
        type: 'html',
        value: `<pre class="mermaid">${escapeHtml(value)}</pre>`,
      }
    }
  }
}
