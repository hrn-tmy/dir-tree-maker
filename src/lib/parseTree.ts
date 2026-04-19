export type TreeNode = {
  name: string
  comment?: string
  depth: number
  isLast: boolean
  ancestors: boolean[] // true = has sibling below at that depth
}

export function parseTree(input: string): TreeNode[] {
  const lines = input
    .split('\n')
    .map((line) => {
      const { name, comment } = splitComment(line.trim())
      return { raw: line, depth: getDepth(line), name, comment }
    })
    .filter((l) => l.name !== '')

  return lines.map((line, i) => {
    const siblings = lines.slice(i + 1)
    const isLast = !siblings.some((s) => s.depth === line.depth)

    const ancestors: boolean[] = []
    for (let d = 0; d < line.depth; d++) {
      const hasDescendant = siblings.some((s) => s.depth === d)
      ancestors.push(hasDescendant)
    }

    return { name: line.name, comment: line.comment, depth: line.depth, isLast, ancestors }
  })
}

export function buildTreeText(input: string): string {
  const nodes = parseTree(input)
  return nodes
    .map((node) => {
      let prefix = ''
      for (let d = 0; d < node.depth; d++) {
        prefix += node.ancestors[d] ? '│   ' : '    '
      }
      if (node.depth > 0) {
        prefix += node.isLast ? '└── ' : '├── '
      }
      const suffix = node.comment ? `  # ${node.comment}` : ''
      return prefix + node.name + suffix
    })
    .join('\n')
}

function splitComment(raw: string): { name: string; comment?: string } {
  const idx = raw.indexOf(' #')
  if (idx === -1) return { name: raw }
  return {
    name: raw.slice(0, idx).trim(),
    comment: raw.slice(idx + 2).trim(),
  }
}

function getDepth(line: string): number {
  const match = line.match(/^(\s*)/)
  if (!match) return 0
  const spaces = match[1].replace(/\t/g, '  ').length
  return Math.floor(spaces / 2)
}
