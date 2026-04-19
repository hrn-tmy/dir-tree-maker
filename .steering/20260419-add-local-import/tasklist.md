# タスクリスト: ローカルディレクトリ読み込み機能

## ステータス凡例
- [x] 未着手
- [x] 完了

---

## 1. 型定義の確認・セットアップ

- [x] File System Access API の型（`FileSystemDirectoryHandle` など）が TypeScript で利用可能か確認
- [x] 必要であれば `@types/wicg-file-system-access` をインストール

## 2. 読み込みロジックの実装

- [x] `src/lib/localImport.ts` を新規作成
- [x] 除外リスト（`EXCLUDED`）を定義
- [x] `readDirectoryAsText` 関数を実装（再帰的にディレクトリを走査してインデントテキストを返す）
- [x] ディレクトリ優先・アルファベット順のソートを実装

## 3. コンポーネントの実装

- [x] `src/components/LocalImportButton.tsx` を新規作成
- [x] `'showDirectoryPicker' in window` で非対応ブラウザを判定し `null` を返す
- [x] `showDirectoryPicker` 呼び出し・`readDirectoryAsText` 呼び出し・`onImport` コールバックの処理フローを実装
- [x] `AbortError`（キャンセル）時はエディタを変更せずに終了する処理を実装
- [x] `loading` state でボタンを非活性化し、読み込み中であることを表示

## 4. App.tsx への組み込み

- [x] `LocalImportButton` を import し、入力ペインのラベル行（`TemplateSelector` の隣）に配置
- [x] `onImport` で `setInput(text)` を呼び出すよう接続

## 完了条件

- フォルダ選択ダイアログが開き、選択したフォルダの構造がエディタに反映される
- `node_modules` / `.git` などが自動除外される
- ディレクトリが先、その後ファイルがアルファベット順で並ぶ
- キャンセル時にエディタの内容が変わらない
- 読み込み中はボタンが非活性になる
- Firefox など非対応ブラウザではボタンが表示されない
