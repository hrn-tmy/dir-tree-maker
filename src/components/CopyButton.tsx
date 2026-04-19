import { useState } from 'react'
import { buildTreeText } from '../lib/parseTree'

type Props = {
  input: string
}

export function CopyButton({ input }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const text = buildTreeText(input)
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1 text-xs font-medium rounded-md bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
    >
      {copied ? 'コピー済み' : 'コピー'}
    </button>
  )
}
