# リポジトリ構造定義書

## フォルダ・ファイル構成

```
dir-tree-maker/
├── .devcontainer/               # Dev Container 設定
│   └── devcontainer.json        # コンテナ環境定義
├── .steering/                   # 作業単位のステアリングファイル
│   └── [YYYYMMDD]-[タイトル]/   # 作業ごとのディレクトリ
│       ├── requirements.md      # 今回の作業の要求内容
│       ├── design.md            # 変更内容の設計
│       └── tasklist.md          # タスクリストと進捗
├── docs/                        # 永続的ドキュメント
│   ├── idea.md                  # 初期アイデアメモ
│   ├── product-requirements.md  # プロダクト要求定義書
│   ├── functional-design.md     # 機能設計書
│   ├── architecture.md          # 技術仕様書
│   ├── repository-structure.md  # リポジトリ構造定義書（本ファイル）
│   └── development-guidelines.md # 開発ガイドライン
├── src/                         # アプリケーションソースコード
│   ├── components/              # React コンポーネント
│   │   └── TreePreview.tsx      # ツリープレビュー表示コンポーネント
│   ├── lib/                     # ビジネスロジック・ユーティリティ
│   │   └── parseTree.ts         # インデントテキスト→TreeNode 変換ロジック
│   ├── templates/               # フレームワークテンプレートデータ
│   ├── App.tsx                  # ルートコンポーネント
│   ├── main.tsx                 # エントリーポイント
│   └── index.css                # グローバルスタイル（Tailwind ディレクティブ）
├── index.html                   # Vite エントリー HTML
├── vite.config.ts               # Vite 設定
├── tsconfig.json                # TypeScript 設定
├── package.json                 # 依存関係・スクリプト定義
├── package-lock.json            # 依存関係ロックファイル
├── README.md                    # プロジェクト概要
└── CLAUDE.md                    # Claude Code へのガイダンス
```

## ディレクトリの役割

| ディレクトリ | 役割 |
|-------------|------|
| `src/components/` | UI コンポーネント。1ファイル1コンポーネント |
| `src/lib/` | コンポーネントに依存しない純粋なロジック（パース処理など） |
| `src/templates/` | テンプレート機能で使うフレームワーク別の雛形データ（JSON or TS） |
| `docs/` | 設計・仕様ドキュメント。実装とは独立して管理 |
| `.steering/` | 作業単位の一時ドキュメント。完了後も参照用として保持 |

## ファイル配置ルール

- コンポーネントは `src/components/` に配置し、PascalCase で命名する（例: `TreePreview.tsx`）
- ロジックはコンポーネントから切り出して `src/lib/` に配置し、camelCase で命名する（例: `parseTree.ts`）
- テンプレートデータは `src/templates/index.ts` にまとめてエクスポートする
- テスト対象のファイルが増えた場合は `src/` 配下に `__tests__/` を設ける
