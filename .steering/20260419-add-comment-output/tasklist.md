# タスクリスト: コメント付き出力機能

## ステータス凡例
- [ ] 未着手
- [x] 完了

---

## 1. 環境セットアップ

- [x] Tailwind CSS v4 と `@tailwindcss/vite` をインストール
- [x] `vite.config.ts` に `@tailwindcss/vite` プラグインを追加
- [x] `src/index.css` を `@import "tailwindcss"` に置き換え

## 2. コメントパース機能

- [x] `src/lib/parseTree.ts` の `TreeNode` 型に `comment?: string` を追加
- [x] `splitComment` ヘルパー関数を追加（` #` をコメント区切りとしてパース）
- [x] `parseTree` 関数で `splitComment` を使用し、`comment` を返すよう修正

## 3. プレビュー表示

- [x] `src/components/TreePreview.tsx` でコメントがある場合に `  # コメント` を末尾に付加

## 4. クリップボードコピー

- [x] `src/lib/parseTree.ts` に `buildTreeText` 関数を追加（ツリーをテキスト文字列で返す）
- [x] `src/components/CopyButton.tsx` を新規作成
- [x] `src/App.tsx` に `CopyButton` を組み込む

## 5. Tailwind への移行

- [x] `src/App.tsx` の Plain CSS クラスを Tailwind クラスに置き換え
- [x] 動作・見た目が移行前と同等であることを確認

## 完了条件

- `src  # ソースコード` のようなコメント付き入力がプレビューに正しく反映される
- コメントなしの行と混在しても表示が崩れない
- `C#` のようにスペースなしの `#` はコメントとみなされない
- コピーボタンでコメント込みのツリーテキストが取得できる
- Tailwind 移行後もレイアウト・スタイルが崩れていない
