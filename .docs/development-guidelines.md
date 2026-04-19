# 開発ガイドライン

## コーディング規約

- 外部ライブラリを追加する場合は、使用目的・理由を明確にして承認を得てから導入する
- コメントは「なぜそう書いたか」が非自明な場合のみ記載する（何をしているかはコードで表現する）
- `any` 型の使用は禁止。型が不明な場合は `unknown` を使い、型ガードで絞り込む
- フォーマットは ESLint に従う。Prettier は未導入のため、インデント・クォートなどは ESLint のルールに準拠する

## 命名規則

| 対象 | 規則 | 例 |
|------|------|----|
| コンポーネントファイル | PascalCase | `TreePreview.tsx` |
| ロジック・ユーティリティファイル | camelCase | `parseTree.ts` |
| 型・インターフェース | PascalCase | `TreeNode`, `Template` |
| 変数・関数 | camelCase | `parseTree()`, `inputText` |
| CSS クラス | Tailwind ユーティリティクラスを直接使用 | `className="flex gap-4"` |

## スタイリング規約

- スタイリングは Tailwind CSS のユーティリティクラスを使用する
- カスタム CSS が必要な場合のみ `src/index.css` に追記する
- インラインスタイル（`style={}` 属性）は使用しない

## Git 規約

### ブランチ戦略

- `main` ブランチへの直接コミットは禁止
- 作業は `feature/` や `fix/` ブランチで行い、PR を通じて `main` にマージする
- PR はセルフレビュー後にマージしてよい（現時点でレビュアーなし）

### ブランチ命名

ブランチ名は英語・ケバブケースで記述する。

```
feature/[機能名]   # 新機能
fix/[修正内容]     # バグ修正
docs/[対象]        # ドキュメントのみの変更
```

### コミットメッセージ

```
feat: コメント付き出力機能を追加
fix: ルートノードのツリー記号が重複する問題を修正
docs: functional-design.md にコンポーネント設計を追記
```

プレフィックス: `feat` / `fix` / `docs` / `refactor` / `style` / `chore`

## 開発フロー

新機能・修正を行う前に、以下の順でドキュメントを作成し、各ステップで承認を得てから次へ進む。

1. `.steering/[YYYYMMDD]-[英語タイトル]/requirements.md` を作成・承認
2. `.steering/[YYYYMMDD]-[英語タイトル]/design.md` を作成・承認
3. `.steering/[YYYYMMDD]-[英語タイトル]/tasklist.md` を作成・承認
4. 実装
5. `/.docs` の該当ドキュメントに影響がある場合は更新

ステアリングディレクトリのタイトルは英語・ケバブケースで記述する（例: `20260419-add-comment-output`）。
