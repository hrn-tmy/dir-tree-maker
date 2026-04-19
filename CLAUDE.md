# CLAUDE.md

このファイルは、リポジトリで作業する Claude Code (claude.ai/code) へのガイダンスを提供。

## プロジェクト概要

`dir-tree-maker` は、ブラウザ上でリアルタイムにディレクトリツリーを作成・表示できるサービス。README や設計書などの構造化ドキュメントを作りたい開発者をターゲットにしている。

### 主要機能
実装する際は、以下の優先順で実装を行うこと
1. **リアルタイムツリー編集** — ブラウザ上で入力すると即座にツリーが表示される
2. **コメント付き出力** — ファイル/ディレクトリにインラインコメントを付けられる（例: `src/api/  # FastAPI routes`）
3. **フレームワークテンプレート** — Next.js / Rails / FastAPI などの雛形をワンクリックで読み込み
4. **ローカルディレクトリ読み込み** — File System Access API でローカルフォルダを開いてツリー表示

## コマンド

```bash
npm run dev      # 開発サーバー起動 (http://localhost:5173)
npm run build    # 本番ビルド (tsc + vite build)
npm run preview  # ビルド成果物のプレビュー
```

## 技術スタック

- **フレームワーク:** React 19 + TypeScript
- **ビルドツール:** Vite
- **スタイリング:** CSS (src/index.css)
- **デプロイ:** 静的サイト（バックエンドなし）

## ドキュメントの分類

### 永続的ドキュメント(/.docs)
アプリケーション全体の「何を作るか」「どう作るか」を定義するドキュメント。
アプリケーション基本設計や方針が変わらない限り更新されない。

- **production-requirements.md** - プロダクト要求定義書
  - プロダクトビジョンと目的
  - ターゲットユーザーと課題・ニーズ
  - 主要な機能一覧
  - 成功の定義
  - ユーザーストーリー
  - 受け入れ条件
  - 機能要件
  - 非機能要件

- **functional-design.md** - 機能設計書
  - アーキテクチャ・データモデル（ER図）
  - コンポーネント設計・画面遷移図
  - API設計(任意)

- **architecture.md** - 技術仕様書
  - 技術スタック・開発ツール
  - 技術的制約
  - パフォーマンス要件

- **repository-structure.md** - リポジトリ構造定義書
  - フォルダ・ファイル構成
  - ディレクトリの役割
  - ファイル配置ルール

- **development-guidelines.md** - 開発ガイドライン
  - コーディング規約
  - 命名規則
  - スタイリング規約
  - テスト規約
  - Git規約

### 作業単位のドキュメント(.steering/[YYYYMMDD]-[開発タイトル])
特定の開発作業における「今回何をするか」を定義する一時的なステアリングファイル
作業完了後は参照用として保持されるが、新しい作業では新しいディレクトリを作成

- **requirements.md** - 今回の作業の要求内容
  - 変更・追加する機能の説明
  - ユーザーストーリー
  - 受け入れ条件
  - 制約事項

- **design.md** - 変更内容の設計
  - 実装アプローチ
  - 変更するコンポーネント
  - データ構造の変更
  - 影響範囲の分析

- **tasklist.md** - タスクリスト
  - 具体的な実装タスク
  - タスクの進捗状況
  - 完了条件

### ステアリングファイルの命名規則

```bash
.steering/[YYYYMMDD]-[開発タイトル]
```

**例**
- `.steering/20260420-add-dir-tree`
- `.steering/20260421-fix-read-template-bug`
- `.steering/20260422-improve-performance`

## 開発プロセス

### 初回セットアップ時の手順

#### 1. フォルダ作成
```bash
mkdir -p .docs
mkdir -p .steering
```

#### 2. 永続的ドキュメントの作成（/.docs）

アプリケーション全体の設計を定義
各ドキュメント作成後、必ず確認・承認を得てから次に進むこと

1. `.docs/product-requirements.md` - プロダクト要求定義書
2. `.docs/functional-design.md` - 機能設計書
3. `.docs/architecture.md` - 技術仕様書
4. `.docs/repository-structure.md` - リポジトリ構造定義書
5. `.docs/development-guidelines.md` - 開発ガイドライン

**重要:** 1ファイルごとに作成後、必ず確認・承認を得てから次のファイル作成を行うこと

#### 3. ステアリングファイルの作成
```bash
mkdir -p .steering/[YYYYMMDD]-initial-implementation
```

作成するドキュメント
1. `.steering/[YYYYMMDD]-initial-implementation/requirements.md`
2. `.steering/[YYYYMMDD]-initial-implementation/design.md`
3. `.steering/[YYYYMMDD]-initial-implementation/tasklist.md`

#### 4. 環境セットアップ
Reactを最新バージョンのViteを用いてプロジェクトを作成
TypeScriptとTailwindCSSを使うように設定する
極力ライブラリは使わないように実装するが、使用したい場合はどんなライブラリをどのように使うか、なぜ使うのかを明確にし承認を得てから使用すること

#### 5. 実装開始
`.steering/[YYYYMMDD]-initial-implementation/tasklist.md`に基づいて実装を進めること

### 機能追加・修正時の手順

- 永続的ドキュメント(`/.docs`)への影響を確認
- 変更が基本設計に影響する場合は`/.docs`を更新

## 図表・ダイアグラムの記載ルール

### 記載場所
関連する永続ドキュメント内に直接記載・追記すること

**配置例**
- ユースケース図：`functional-design.md`内に記載
- 画面遷移図：`functional-design.md`内に記載
- システム構成図：`functional-design.md`または`architecture.md`内に記載

### 記述形式
1. Mermaid記法（推奨）
2. ASCIIアート（シンプルな図表の時に使用）

### 図表の更新
- 設計変更時は対応する図表も更新すること

## 注意事項
- ドキュメントの作成・更新は段階的に行い、各段階で承認を得ること
- `.steering/`ディレクトリについては、日付と開発タイトルで明確に識別できるようにする
- 永続的ドキュメントと作業単位のドキュメントを混同しないこと
- コード変更後は必ずリント・型チェックを行うこと
- セキュリティを考慮したコーディング（XSS対策、入力バリデーションなど）
- 図表は必要最小限にとどめ、メンテナンスコストを避ける