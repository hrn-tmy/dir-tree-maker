export type Template = {
  id: string
  label: string
  content: string
}

export type TemplateGroup = {
  label: string
  templates: Template[]
}

export const templateGroups: TemplateGroup[] = [
  {
    label: 'TypeScript',
    templates: [
      {
        id: 'nextjs-app',
        label: 'Next.js (App Router)',
        content: `app  # App Router ルートディレクトリ
  (auth)  # 認証関連ルートグループ
    login
      page.tsx
    register
      page.tsx
  (dashboard)  # ダッシュボードルートグループ
    layout.tsx
    page.tsx
  api  # APIルート
    hello
      route.ts
  layout.tsx  # ルートレイアウト
  page.tsx  # トップページ
  globals.css
components  # 共通コンポーネント
  ui
    Button.tsx
    Input.tsx
  layout
    Header.tsx
    Footer.tsx
lib  # ユーティリティ・ヘルパー
  utils.ts
  auth.ts  # 認証ロジック
public  # 静的ファイル`,
      },
      {
        id: 'nextjs-pages',
        label: 'Next.js (Pages Router)',
        content: `pages  # ページディレクトリ
  api  # APIルート
    hello.ts
  _app.tsx  # カスタムApp
  _document.tsx  # カスタムDocument
  index.tsx  # トップページ
  about.tsx
components  # 共通コンポーネント
  layout
    Header.tsx
    Footer.tsx
  ui
    Button.tsx
styles
  globals.css
  Home.module.css
lib  # ユーティリティ
  utils.ts
public  # 静的ファイル`,
      },
      {
        id: 'vite-react',
        label: 'Vite + React',
        content: `src
  assets  # 画像・フォントなどの静的ファイル
  components
    ui
      Button.tsx
    layout
      Header.tsx
  pages  # ページコンポーネント
    Home.tsx
    About.tsx
  hooks  # カスタムフック
    useAuth.ts
  lib  # ユーティリティ
    utils.ts
  App.tsx  # ルートコンポーネント
  main.tsx  # エントリーポイント
  index.css
public  # 静的ファイル`,
      },
      {
        id: 'nuxt',
        label: 'Nuxt.js',
        content: `assets  # CSS・画像などの静的ファイル
components  # 自動インポートコンポーネント
  AppHeader.vue
  AppFooter.vue
  ui
    BaseButton.vue
composables  # コンポーザブル関数
  useAuth.ts
layouts  # レイアウト
  default.vue
  auth.vue
middleware  # ミドルウェア
  auth.ts
pages  # ファイルベースルーティング
  index.vue
  about.vue
  users
    [id].vue  # 動的ルート
plugins  # プラグイン
  myPlugin.ts
server  # サーバーサイド
  api
    hello.get.ts
public  # 静的ファイル`,
      },
      {
        id: 'sveltekit',
        label: 'SvelteKit',
        content: `src
  lib  # $lib エイリアスでアクセス可能
    components
      Button.svelte
      Header.svelte
    server  # サーバーサイドのみ
      db.ts
    utils.ts
  routes  # ファイルベースルーティング
    +layout.svelte  # ルートレイアウト
    +page.svelte  # トップページ
    about
      +page.svelte
    api
      hello
        +server.ts  # APIエンドポイント
  app.html  # HTMLテンプレート
  app.css
static  # 静的ファイル`,
      },
      {
        id: 'nestjs',
        label: 'NestJS',
        content: `src
  common  # 共通モジュール
    decorators
    filters  # 例外フィルター
    guards  # ガード
    interceptors
    pipes  # バリデーションパイプ
  modules  # 機能モジュール
    users
      dto
        create-user.dto.ts
        update-user.dto.ts
      users.controller.ts  # コントローラー
      users.service.ts  # サービス
      users.module.ts  # モジュール定義
  app.controller.ts
  app.service.ts
  app.module.ts  # ルートモジュール
  main.ts  # エントリーポイント
test  # E2Eテスト
  app.e2e-spec.ts`,
      },
    ],
  },
  {
    label: 'JavaScript',
    templates: [
      {
        id: 'express',
        label: 'Express.js',
        content: `src
  routes  # ルーター
    index.ts
    users.ts
  controllers  # コントローラー
    usersController.ts
  middleware  # ミドルウェア
    auth.ts
    errorHandler.ts
  models  # データモデル
    User.ts
  services  # ビジネスロジック
    usersService.ts
  config  # 設定
    index.ts
  app.ts  # Expressアプリ設定
  server.ts  # エントリーポイント
tests
  users.test.ts`,
      },
    ],
  },
  {
    label: 'Python',
    templates: [
      {
        id: 'fastapi',
        label: 'FastAPI',
        content: `app
  api  # APIルーター
    v1
      endpoints
        users.py
        items.py
      api.py  # ルーター集約
  core  # 設定・セキュリティ
    config.py
    security.py
  db  # データベース
    base.py
    session.py
  models  # SQLAlchemyモデル
    user.py
    item.py
  schemas  # Pydanticスキーマ
    user.py
    item.py
  services  # ビジネスロジック
    user.py
  main.py  # エントリーポイント
tests
  test_users.py`,
      },
      {
        id: 'django',
        label: 'Django',
        content: `project  # プロジェクト設定ディレクトリ
  settings
    base.py  # 共通設定
    development.py
    production.py
  urls.py  # URLルーティング
  wsgi.py
  asgi.py
apps  # アプリケーション群
  users
    migrations  # マイグレーション
    templates
      users
        list.html
    admin.py  # 管理画面設定
    models.py  # データモデル
    serializers.py  # DRFシリアライザー
    urls.py
    views.py
  common  # 共通処理
    models.py
    utils.py
static  # 静的ファイル
templates  # テンプレート
manage.py  # 管理コマンド`,
      },
      {
        id: 'flask',
        label: 'Flask',
        content: `app
  blueprints  # ブループリント
    auth
      __init__.py
      routes.py
    api
      __init__.py
      routes.py
  models  # データモデル
    user.py
  services  # ビジネスロジック
    auth.py
  extensions.py  # Flask拡張の初期化
  __init__.py  # アプリケーションファクトリ
tests
  test_auth.py
instance  # インスタンス設定（Git管理外）
  config.py`,
      },
    ],
  },
  {
    label: 'Ruby',
    templates: [
      {
        id: 'rails',
        label: 'Ruby on Rails',
        content: `app
  controllers  # コントローラー
    application_controller.rb
    users_controller.rb
  models  # モデル
    application_record.rb
    user.rb
  views  # ビュー
    layouts
      application.html.erb
    users
      index.html.erb
      show.html.erb
  helpers
  mailers  # メーラー
  jobs  # バックグラウンドジョブ
config
  routes.rb  # ルーティング
  database.yml  # DB設定
db
  migrate  # マイグレーション
  schema.rb  # スキーマ定義
lib  # 独自ライブラリ
public  # 静的ファイル
spec  # テスト (RSpec)
  models
  requests`,
      },
    ],
  },
  {
    label: 'PHP',
    templates: [
      {
        id: 'laravel',
        label: 'Laravel',
        content: `app
  Console  # コンソールコマンド
  Exceptions  # 例外ハンドラー
  Http
    Controllers
      Auth  # 認証コントローラー
      Api
        UserController.php
    Middleware
    Requests  # フォームリクエスト
  Models  # Eloquentモデル
    User.php
  Services  # サービスクラス
  Providers  # サービスプロバイダー
config  # 設定ファイル
database
  factories  # ファクトリ
  migrations  # マイグレーション
  seeders  # シーダー
resources
  views  # Bladeテンプレート
    layouts
      app.blade.php
    welcome.blade.php
  css
  js
routes
  api.php  # APIルート
  web.php  # Webルート
tests
  Feature
  Unit`,
      },
    ],
  },
  {
    label: 'Java',
    templates: [
      {
        id: 'spring-boot',
        label: 'Spring Boot',
        content: `src
  main
    java
      com
        example
          app
            controller  # コントローラー
              UserController.java
            service  # サービス
              UserService.java
            repository  # リポジトリ
              UserRepository.java
            model  # エンティティ
              User.java
            dto  # データ転送オブジェクト
              UserDto.java
            config  # 設定クラス
              SecurityConfig.java
            AppApplication.java  # エントリーポイント
    resources
      application.yml  # アプリケーション設定
      static  # 静的ファイル
      templates  # テンプレート
  test
    java
      com
        example
          app
            UserControllerTest.java`,
      },
    ],
  },
]
