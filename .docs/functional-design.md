# 機能設計書

## アーキテクチャ

バックエンドなしの純粋なフロントエンドアプリケーション。すべての処理はブラウザ内で完結する。

```
┌──────────────────────────────────────────────────┐
│                    ブラウザ                       │
│                                                  │
│  ┌─────────────┐  挿入  ┌──────────────────────┐ │
│  │  Templates  │───────▶│                      │ │
│  │ (テンプレ)  │        │   EditorPane (入力)  │ │
│  └─────────────┘        │                      │ │
│  ┌─────────────┐  挿入  │                      │ │
│  │ LocalImport │───────▶│                      │ │
│  │(FSAccess API│        └──────────┬───────────┘ │
│  └─────────────┘                  │ テキスト     │
│                                   ▼              │
│                          ┌────────────────────┐  │
│                          │   parseTree()      │  │
│                          │  (パースロジック)  │  │
│                          └────────┬───────────┘  │
│                                   │ TreeNode[]   │
│                                   ▼              │
│                          ┌────────────────────┐  │
│                          │   TreePreview      │  │
│                          │  (プレビュー表示)  │  │
│                          └────────────────────┘  │
└──────────────────────────────────────────────────┘
```

## データモデル

### TreeNode（ツリーノード）

```typescript
type TreeNode = {
  name: string       // ファイル/ディレクトリ名
  comment?: string   // インラインコメント（# 以降）
  depth: number      // 階層の深さ（0 がルート）
  isLast: boolean    // 同階層の最後の要素か
  ancestors: boolean[] // 各祖先階層に後続兄弟があるか（│ の描画に使用）
}
```

### Template（テンプレート）

```typescript
type Template = {
  id: string      // 識別子（例: "nextjs-app", "rails"）
  label: string   // 表示名（例: "Next.js (App Router)"）
  content: string // エディタに挿入するインデントテキスト
}

type TemplateGroup = {
  label: string       // グループ表示名（例: "TypeScript"）
  templates: Template[]
}
```

対応テンプレート（13種）: Next.js App Router / Next.js Pages Router / Vite+React / Nuxt.js / SvelteKit / NestJS / Express.js / FastAPI / Django / Flask / Ruby on Rails / Laravel / Spring Boot

## コンポーネント設計

```
App（input state・scroll 同期ロジックを管理）
├── TemplateSelector（テンプレート選択）
├── LocalImportButton（ローカル読み込み）
├── textarea（入力エリア）
├── CopyButton（クリップボードコピー）
└── TreePreview（ツリーレンダリング）
    └── parseTree()（パースロジック）
```

### 各コンポーネントの責務

| コンポーネント | 責務 |
|---------------|------|
| `App` | `input` state の管理、scroll 同期ロジック、コンポーネント間のデータ受け渡し |
| `TemplateSelector` | 13種のテンプレートを言語グループ別に表示・選択時に `input` を置き換え |
| `LocalImportButton` | File System Access API でフォルダを開き、インデントテキストを生成して `input` に反映 |
| `TreePreview` | `input` を `parseTree()` に渡し、TreeNode 配列からツリー記号を組み立てて表示 |
| `CopyButton` | `buildTreeText()` でテキストを生成してクリップボードにコピー、2秒後に表示をリセット |

## 画面遷移図

画面は1ページのみ。モーダルなどの遷移はなし。

```
┌──────────────────────────────────────────────────────┐
│  dir-tree-maker                                      │
├─────────────────────────┬────────────────────────────┤
│  入力 [テンプレ▼][開く] │  プレビュー       [コピー] │
│                         │                            │
│  textarea ↕sync         │  pre ↕sync                 │
│  （インデント入力）      │  src/                      │
│                         │  ├── components/           │
│                         │  │   └── Button.tsx        │
│                         │  └── App.tsx               │
└─────────────────────────┴────────────────────────────┘
```

## コメント記法の仕様

入力テキストで `#` 以降をコメントとして扱う。

**入力例:**
```
src
  components  # UIコンポーネント群
    Button.tsx  # 汎用ボタン
  App.tsx  # エントリーポイント
```

**出力例:**
```
src/
├── components/  # UIコンポーネント群
│   └── Button.tsx  # 汎用ボタン
└── App.tsx  # エントリーポイント
```

- コメントはツリー記号の後、名前の右に `  # コメント` 形式で並記する
- `#` のエスケープは行わない。行内で最初に現れる ` #`（スペース + `#`）をコメント区切りとして扱う（`C#` のようにスペースなしで `#` が続く場合はコメントとみなさない）

### ディレクトリ・ファイルの判定ルール

| 条件 | 判定 |
|------|------|
| 入力行の末尾が `/` | ディレクトリ |
| 子要素（より深いインデントの次行）を持つ | ディレクトリ |
| 上記以外 | ファイル |

ディレクトリは出力時に名前の末尾に `/` を付加する。

## スクロール同期の仕様

- 入力エリア（`textarea`）とプレビュー（`pre`）のスクロール位置をパーセンテージで双方向に連動する
- スクロール割合の計算: `ratio = scrollTop / (scrollHeight - clientHeight)`
- 連動先の `scrollTop = ratio × (scrollHeight - clientHeight)` で設定
- 無限ループ防止のため `isSyncing` フラグ（`useRef`）を使用し、`requestAnimationFrame` でリセットする

## ローカル読み込みの仕様

- File System Access API (`showDirectoryPicker`) を使用
- 読み込み後、ディレクトリ構造をインデントテキストに変換してエディタに挿入
- 以下のディレクトリは自動除外する: `.git`, `node_modules`, `.next`, `dist`, `build`, `__pycache__`, `.DS_Store`
- API 非対応ブラウザ（Firefox など）ではボタンを非表示にする
