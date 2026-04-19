# 要求内容: フレームワークテンプレート機能

## 変更・追加する機能の説明

主要フレームワークのディレクトリ構成の雛形をあらかじめ用意し、ユーザーがワンクリックで選択するとエディタにそのテンプレートが挿入される機能を実装する。
ゼロから手書きする手間をなくし、雛形をベースにカスタマイズできるようにする。

## 対象テンプレート

初期リリースとして以下の13種を用意する。

| ID | 表示名 | 言語/分類 |
|----|--------|----------|
| `nextjs-app` | Next.js (App Router) | TypeScript / フルスタック |
| `nextjs-pages` | Next.js (Pages Router) | TypeScript / フルスタック |
| `vite-react` | Vite + React | TypeScript / フロントエンド |
| `nuxt` | Nuxt.js | TypeScript / フルスタック |
| `sveltekit` | SvelteKit | TypeScript / フルスタック |
| `express` | Express.js | JavaScript / バックエンド |
| `nestjs` | NestJS | TypeScript / バックエンド |
| `fastapi` | FastAPI | Python / バックエンド |
| `django` | Django | Python / バックエンド |
| `flask` | Flask | Python / バックエンド |
| `rails` | Ruby on Rails | Ruby / フルスタック |
| `laravel` | Laravel | PHP / フルスタック |
| `spring-boot` | Spring Boot | Java / バックエンド |

## ユーザーストーリー

- 開発者として、テンプレート一覧からフレームワークを選択したら、エディタに標準的なディレクトリ構成が挿入されてほしい
- 開発者として、挿入されたテンプレートをそのまま編集してカスタマイズしたい
- 開発者として、テンプレートを選択し直したらエディタの内容がそのテンプレートに置き換わってほしい

## 受け入れ条件

- エディタ上部にテンプレート選択UIが表示される
- テンプレートを選択するとエディタの内容が選択したテンプレートのインデントテキストに置き換わる
- 置き換え後は通常の編集が可能（追記・削除など）
- テンプレートにはコメントを含め、各ディレクトリ・ファイルの役割が分かるようにする

## 制約事項

- テンプレートデータは `src/templates/index.ts` に静的データとして定義する（外部 API 不要）
- `functional-design.md` で定義した `Template` 型（`id`, `label`, `content`）に準拠する
- テンプレートの `content` はコメント付きインデントテキスト形式とし、既存のパースロジックをそのまま利用できるようにする
