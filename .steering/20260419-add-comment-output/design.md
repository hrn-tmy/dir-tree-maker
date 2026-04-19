# 設計: コメント付き出力機能

## 実装アプローチ

以下の2つの変更を並行して行う。

1. **コメントパース機能の追加** — `parseTree.ts` でコメントを抽出し、`TreePreview.tsx` でレンダリング
2. **Tailwind CSS の導入** — 既存の `index.css` の Plain CSS スタイルを Tailwind クラスに置き換え、`App.tsx` を Tailwind クラスでリライト

CopyButton はこの作業で合わせて実装する（requirements.md の受け入れ条件にコピーへの反映が含まれているため）。

## データ構造の変更

### `TreeNode` 型（`src/lib/parseTree.ts`）

`comment` フィールドを追加する。

```typescript
// 変更前
export type TreeNode = {
  name: string
  depth: number
  isLast: boolean
  ancestors: boolean[]
}

// 変更後
export type TreeNode = {
  name: string
  comment?: string  // 追加: ' #' 以降のコメント文字列
  depth: number
  isLast: boolean
  ancestors: boolean[]
}
```

## 変更するファイル

### 1. `src/lib/parseTree.ts`

コメントを抽出するヘルパー関数 `splitComment` を追加し、`parseTree` 内の name 生成部分で使用する。

```typescript
// 追加するヘルパー関数
function splitComment(raw: string): { name: string; comment?: string } {
  const idx = raw.indexOf(' #')
  if (idx === -1) return { name: raw }
  return {
    name: raw.slice(0, idx).trim(),
    comment: raw.slice(idx + 2).trim(),
  }
}
```

`parseTree` 内の `.map()` でこの関数を呼び出す:

```typescript
.map((line) => {
  const trimmed = line.trim()
  const { name, comment } = splitComment(trimmed)
  return { raw: line, depth: getDepth(line), name, comment }
})
```

戻り値にも `comment` を含める:

```typescript
return { name: line.name, comment: line.comment, depth: line.depth, isLast, ancestors }
```

### 2. `src/components/TreePreview.tsx`

ツリー行の組み立て部分で、`comment` があれば末尾に `  # コメント` を付加する。

```typescript
// 変更前
return <div key={i}>{prefix + node.name}</div>

// 変更後
const suffix = node.comment ? `  # ${node.comment}` : ''
return <div key={i}>{prefix + node.name + suffix}</div>
```

### 3. `src/components/CopyButton.tsx`（新規作成）

`TreePreview` が表示するテキスト（コメント含む）をクリップボードにコピーする。
`App` からツリーテキストを文字列として生成する関数 `buildTreeText` を `parseTree.ts` に追加し、それを使用する。

```typescript
// parseTree.ts に追加
export function buildTreeText(input: string): string {
  // parseTree() と同じロジックでテキストを組み立てて返す
}
```

CopyButton は `input: string` を受け取り、内部で `buildTreeText` を呼んでコピーする。

### 4. `src/App.tsx`

- Plain CSS クラス名（`container`, `editor`, `pane`, `preview`）を Tailwind クラスに置き換え
- `CopyButton` を `PreviewPane` 相当の領域に配置

### 5. `src/index.css`

Tailwind v4 の導入に合わせて内容を置き換える。

```css
@import "tailwindcss";
```

既存の Plain CSS は削除し、スタイルはすべて Tailwind ユーティリティクラスで表現する。

### 6. `vite.config.ts`

Tailwind v4 の Vite プラグインを追加する。

```typescript
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## 影響範囲の分析

| ファイル | 変更種別 | 影響 |
|---------|---------|------|
| `src/lib/parseTree.ts` | 拡張 | `TreeNode` 型の変更は `TreePreview.tsx` に波及するが後方互換（`comment` はオプショナル） |
| `src/components/TreePreview.tsx` | 拡張 | `comment` フィールドを参照するだけで既存ロジックに影響なし |
| `src/components/CopyButton.tsx` | 新規 | 影響なし |
| `src/App.tsx` | クラス名の置き換え | Tailwind 導入による見た目の変更あり（機能は同一） |
| `src/index.css` | 全書き換え | Tailwind 導入。既存クラス名は削除するため `App.tsx` の同期が必須 |
| `vite.config.ts` | プラグイン追加 | ビルド設定の変更のみ |
