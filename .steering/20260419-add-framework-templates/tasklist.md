# タスクリスト: フレームワークテンプレート機能

## ステータス凡例
- [x] 未着手
- [x] 完了

---

## 1. テンプレートデータの作成

- [x] `src/templates/index.ts` を新規作成し、`Template` / `TemplateGroup` 型を定義
- [x] TypeScript グループのテンプレートを追加（Next.js App Router, Next.js Pages Router, Vite + React, Nuxt.js, SvelteKit, NestJS）
- [x] JavaScript グループのテンプレートを追加（Express.js）
- [x] Python グループのテンプレートを追加（FastAPI, Django, Flask）
- [x] Ruby グループのテンプレートを追加（Ruby on Rails）
- [x] PHP グループのテンプレートを追加（Laravel）
- [x] Java グループのテンプレートを追加（Spring Boot）

## 2. TemplateSelector コンポーネントの作成

- [x] `src/components/TemplateSelector.tsx` を新規作成
- [x] `<select>` + `<optgroup>` でグループ別テンプレート一覧を表示
- [x] 選択時に `onSelect(content)` を呼び出し、選択後に value をリセット

## 3. App.tsx への組み込み

- [x] `TemplateSelector` を import し、入力ペインのラベル行右側に配置
- [x] `onSelect` で `setInput(content)` を呼び出すよう接続

## 完了条件

- 全13種のテンプレートがセレクトボックスに表示される
- テンプレート選択後、エディタの内容が選択したテンプレートに置き換わる
- 置き換え後もエディタの編集・プレビューのリアルタイム更新が正常に動作する
- 同じテンプレートを連続して選択し直せる（value リセット）
- テンプレートにコメントが含まれ、プレビューに反映される
