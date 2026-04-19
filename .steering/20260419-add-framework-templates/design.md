# 設計: フレームワークテンプレート機能

## 実装アプローチ

1. `src/templates/index.ts` にテンプレートデータを静的定義する
2. `src/components/TemplateSelector.tsx` を新規作成する
3. `src/App.tsx` に `TemplateSelector` を組み込み、選択時にエディタ内容を置き換える

## データ構造

### `Template` 型（`functional-design.md` の定義に準拠）

```typescript
type Template = {
  id: string
  label: string
  content: string  // コメント付きインデントテキスト形式
}
```

### `TemplateGroup` 型（UI のグループ表示用）

13種を言語別に `<optgroup>` でまとめるため、グループ型を追加する。

```typescript
type TemplateGroup = {
  label: string       // グループ表示名（例: "TypeScript"）
  templates: Template[]
}
```

### グループ構成

| グループ | 対象テンプレート |
|---------|----------------|
| TypeScript | Next.js (App Router), Next.js (Pages Router), Vite + React, Nuxt.js, SvelteKit, NestJS |
| JavaScript | Express.js |
| Python | FastAPI, Django, Flask |
| Ruby | Ruby on Rails |
| PHP | Laravel |
| Java | Spring Boot |

## コンポーネント設計

### `TemplateSelector`

```tsx
type Props = {
  onSelect: (content: string) => void
}
```

- `<select>` 要素に `<optgroup>` でグループ化して表示する
- 先頭に「テンプレートを選択...」のデフォルト option（value=""）を置く
- 選択時に `onSelect(template.content)` を呼び出す
- 選択後は value をリセットし、再度同じテンプレートを選び直せるようにする

### `App.tsx` の変更点

- `TemplateSelector` を入力ペインのラベル行（`入力` ラベルの右）に配置する
- `onSelect` で `setInput(content)` を呼ぶだけでよい

```
┌──────────────────────────────────────────────────────┐
│  dir-tree-maker                                      │
├─────────────────────────┬────────────────────────────┤
│  入力    [テンプレ ▼]   │  プレビュー     [コピー]   │
│                         │                            │
│  textarea               │  pre                       │
└─────────────────────────┴────────────────────────────┘
```

## テンプレートコンテンツの方針

- インデントは半角スペース2つで統一する
- 各ディレクトリ・重要ファイルにはコメントを付けて役割を明示する
- 実際のプロジェクトでよく使われる標準的な構成を採用する
- 設定ファイル（`.env`, `.gitignore` など）は含めない（ツリーが煩雑になるため）

## 変更するファイル

| ファイル | 変更種別 |
|---------|---------|
| `src/templates/index.ts` | 新規作成 |
| `src/components/TemplateSelector.tsx` | 新規作成 |
| `src/App.tsx` | `TemplateSelector` の追加・配置 |

既存の `parseTree.ts` と `TreePreview.tsx` は変更不要。
テンプレートの `content` が既存のインデントテキスト形式に準拠しているため、パースロジックをそのまま利用できる。
