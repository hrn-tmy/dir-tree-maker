# 設計: ローカルディレクトリ読み込み機能

## 実装アプローチ

1. `src/lib/localImport.ts` にディレクトリ読み込みロジックを実装する
2. `src/components/LocalImportButton.tsx` を新規作成する
3. `src/App.tsx` に `LocalImportButton` を組み込む

## ロジック設計（`src/lib/localImport.ts`）

### 除外リスト

```typescript
const EXCLUDED = new Set([
  '.git', 'node_modules', '.next', 'dist', 'build', '__pycache__', '.DS_Store',
])
```

### メイン関数

```typescript
export async function readDirectoryAsText(
  dirHandle: FileSystemDirectoryHandle
): Promise<string>
```

`showDirectoryPicker` の呼び出しはコンポーネント側で行い、取得した `FileSystemDirectoryHandle` をこの関数に渡す。
関数はインデントテキスト（文字列）を返す。

### 再帰処理の方針

```
readDir(handle, depth):
  entries = handle 内のエントリを収集
  dirs = entries のうちディレクトリ（除外リスト以外）をアルファベット順にソート
  files = entries のうちファイルをアルファベット順にソート
  順序: dirs → files（ディレクトリ優先）
  各エントリを "  ".repeat(depth) + name の形式で出力
  ディレクトリの場合は再帰呼び出し
```

インデントはスペース2つ固定とし、既存のパースロジック（`getDepth`）と合わせる。

### 型定義の補足

File System Access API の型は TypeScript の標準 lib に含まれていない場合があるため、
`@types/wicg-file-system-access` が必要かどうかをインストール時に確認する。

## コンポーネント設計（`src/components/LocalImportButton.tsx`）

```tsx
type Props = {
  onImport: (text: string) => void
}
```

### 状態管理

```typescript
const [loading, setLoading] = useState(false)
```

### 処理フロー

```
1. ボタンクリック
2. setLoading(true)
3. showDirectoryPicker() を呼び出す
   - キャンセル（AbortError）→ setLoading(false) で終了、エディタ変更なし
   - その他エラー → setLoading(false) で終了
4. readDirectoryAsText(handle) でテキストを生成
5. onImport(text) でエディタに反映
6. setLoading(false)
```

### ブラウザ対応確認

```typescript
const isSupported = 'showDirectoryPicker' in window
if (!isSupported) return null  // 非対応ブラウザでは何も表示しない
```

## App.tsx の変更点

`LocalImportButton` を入力ペインのラベル行に追加する。
`TemplateSelector` と並べて配置する。

```
┌──────────────────────────────────────────────────────┐
│  dir-tree-maker                                      │
├─────────────────────────┬────────────────────────────┤
│  入力  [テンプレ▼][開く]│  プレビュー       [コピー] │
│                         │                            │
│  textarea               │  pre                       │
└─────────────────────────┴────────────────────────────┘
```

## 変更するファイル

| ファイル | 変更種別 |
|---------|---------|
| `src/lib/localImport.ts` | 新規作成 |
| `src/components/LocalImportButton.tsx` | 新規作成 |
| `src/App.tsx` | `LocalImportButton` の追加・配置 |

既存の `parseTree.ts` / `TreePreview.tsx` / `TemplateSelector.tsx` は変更不要。
読み込んだテキストをそのまま `setInput` に渡すだけで、既存のパースロジックが動作する。
