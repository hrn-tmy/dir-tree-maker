import { useState } from 'react'
import { TreePreview } from './components/TreePreview'
import { CopyButton } from './components/CopyButton'
import { TemplateSelector } from './components/TemplateSelector'
import { LocalImportButton } from './components/LocalImportButton'

const PLACEHOLDER = `src
  components  # UIコンポーネント群
    Button.tsx  # 汎用ボタン
    Header.tsx  # ヘッダー
  lib
    api.ts  # API通信
  App.tsx  # ルートコンポーネント
  main.tsx  # エントリーポイント`

export default function App() {
  const [input, setInput] = useState(PLACEHOLDER)

  return (
    <div className="flex flex-col h-dvh bg-[#0f1117] text-slate-200 p-6 gap-4 max-w-6xl mx-auto w-full">
      <header>
        <h1 className="text-lg font-semibold text-slate-400 tracking-widest">dir-tree-maker</h1>
      </header>
      <main className="flex-1 grid grid-cols-2 gap-4 min-h-0">
        <div className="flex flex-col gap-2 min-h-0">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-widest">入力</label>
            <div className="flex items-center gap-2">
              <TemplateSelector onSelect={setInput} />
              <LocalImportButton onImport={setInput} />
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            placeholder="ディレクトリ構造を入力（インデントで階層を表現）"
            className="flex-1 resize-none bg-[#1e2330] border border-slate-700 rounded-lg text-slate-200 font-mono text-sm leading-relaxed p-4 outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2 min-h-0">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-widest">プレビュー</label>
            <CopyButton input={input} />
          </div>
          <pre className="flex-1 bg-[#1e2330] border border-slate-700 rounded-lg font-mono text-sm leading-relaxed p-4 overflow-auto whitespace-pre">
            <TreePreview input={input} />
          </pre>
        </div>
      </main>
    </div>
  )
}
