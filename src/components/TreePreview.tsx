import { parseTree } from '../lib/parseTree'

type Props = {
  input: string
}

export function TreePreview({ input }: Props) {
  const nodes = parseTree(input)

  if (nodes.length === 0) {
    return <span className="text-slate-500 italic">ここにツリーが表示されます</span>
  }

  return (
    <>
      {nodes.map((node, i) => {
        let prefix = ''
        for (let d = 0; d < node.depth; d++) {
          prefix += node.ancestors[d] ? '│   ' : '    '
        }
        if (node.depth > 0) {
          prefix += node.isLast ? '└── ' : '├── '
        }
        const suffix = node.comment ? `  # ${node.comment}` : ''
        return <div key={i}>{prefix + node.name + suffix}</div>
      })}
    </>
  )
}
