# dir-tree-maker

ブラウザ上でリアルタイムにディレクトリツリーを作成・編集できる Web アプリです。
README や設計書にそのまま貼れるツリーを素早く生成することを目的としています。

## 機能

### リアルタイムツリー編集
インデント（スペース2つ）でディレクトリの階層を表現すると、ツリー記号付きでリアルタイムにプレビューされます。

```
入力:
src
  components
    Button.tsx
  App.tsx

出力:
src/
├── components/
│   └── Button.tsx
└── App.tsx
```

### コメント付き出力
` # コメント` を付けると、ツリーの各行にコメントが並記されます。

```
入力:
src
  components  # UIコンポーネント群
    Button.tsx  # 汎用ボタン
  App.tsx  # ルートコンポーネント

出力:
src/
├── components/  # UIコンポーネント群
│   └── Button.tsx  # 汎用ボタン
└── App.tsx  # ルートコンポーネント
```

### フレームワークテンプレート
Next.js / Nuxt.js / SvelteKit / NestJS / FastAPI / Django / Laravel など13種類の雛形をワンクリックで読み込めます。

### ローカルディレクトリ読み込み
「フォルダを開く」ボタンからローカルのフォルダを選択すると、そのディレクトリ構造がエディタに反映されます。
`node_modules` / `.git` などのノイズになるディレクトリは自動除外されます。

> この機能は File System Access API を使用しているため、Chrome / Edge のみ対応しています。

## 開発

```bash
npm install
npm run dev      # 開発サーバー起動 (http://localhost:5173)
npm run build    # 本番ビルド
npm run preview  # ビルド成果物のプレビュー
```

## 技術スタック

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
