# 公開方法ガイド

このプロジェクトはフロントエンドのみのViteアプリなので、まずはGitHub Pagesでの公開を推奨します。
VercelやNetlifyも使えますが、現状のMVPではGitHubリポジトリから直接公開できるGitHub Pagesが最もシンプルです。

## 推奨: GitHub Pages

向いている理由:

- フロントエンドのみでAPIがない
- すでにGitHubリポジトリがある
- 無料で始めやすい
- MVP公開に十分

注意点:

- リポジトリ名配下で公開する場合、Viteの `base` 設定が必要です。
- 公開URLが確定したら、`src/data/share.ts` の `siteUrl` も更新します。
- GitHub Pagesへのデプロイは `.github/workflows/deploy-pages.yml` で行います。
- GitHub側でPagesのSourceがGitHub Actionsになっている必要があります。

## GitHub Pages用の想定URL

通常は以下の形式になります。

```text
https://pachitjp-ai.github.io/ai-sidehustle-diagnosis/
```

このURLで公開する場合、Viteのbaseは以下になります。

```ts
base: '/ai-sidehustle-diagnosis/'
```

## 現在の公開設定

`vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/ai-sidehustle-diagnosis/',
  plugins: [react()],
});
```

`src/data/share.ts`:

```ts
siteUrl: 'https://pachitjp-ai.github.io/ai-sidehustle-diagnosis/',
```

GitHub Actions:

```text
.github/workflows/deploy-pages.yml
```

`main` にpushされると、buildして `dist/` をGitHub Pagesへデプロイします。

## GitHub Pages公開後の確認

1. `npm.cmd run build`
2. `npm.cmd test`
3. GitHub PagesのURLを開く
4. ホーム画面が表示される
5. 10問回答して結果ページまで進める
6. XシェアURLに公開URLが含まれる
7. CTAがURL未設定なら準備中表示のままになっている

## 代替候補

Vercel:

- 独自ドメインやプレビュー環境を使いたい場合に向いています。
- GitHub連携が必要です。

Netlify:

- 静的サイト公開に向いています。
- フォームや簡単なリダイレクトを使いたくなった場合に便利です。

## やってはいけないこと

- 公開URLが未確定のまま `siteUrl` を仮URLで入れない
- ユーザー確認なしでGitHub Pages設定を進めない
- CTA本番URLを確認なしで入れない
- build/testなしで公開設定を変更しない
