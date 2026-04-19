import { useState } from 'react'
import { readDirectoryAsText } from '../lib/localImport'

type Props = {
  onImport: (text: string) => void
}

export function LocalImportButton({ onImport }: Props) {
  const [loading, setLoading] = useState(false)

  if (!('showDirectoryPicker' in window)) return null

  const handleClick = async () => {
    setLoading(true)
    try {
      const picker = (window as unknown as { showDirectoryPicker: () => Promise<FileSystemDirectoryHandle> }).showDirectoryPicker
      const handle = await picker()
      const text = await readDirectoryAsText(handle)
      onImport(text)
    } catch (e) {
      if (e instanceof Error && e.name !== 'AbortError') {
        console.error(e)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="px-3 py-1 text-xs font-medium rounded-md bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-200 border border-slate-600 transition-colors"
    >
      {loading ? '読み込み中...' : 'フォルダを開く'}
    </button>
  )
}
