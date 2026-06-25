# URL設定ガイド

公開URLやCTAの本番URLが決まったときにだけ使う手順です。
URL設定は外部導線に関わるため、Codexが勝手に進めず、ユーザー確認が必要な変更として扱います。

## 設定するURL

サイト公開URL:

- 編集ファイル: `src/data/share.ts`
- 編集項目: `shareContent.siteUrl`
- 用途: XシェアURLにサイトURLを含める

CTA本番URL:

- 編集ファイル: `src/data/cta.ts`
- 編集項目: 各タイプの `url`
- 用途: 結果ページのCTAボタンから詳細ページへ移動する

## サイト公開URLの設定例

```ts
export const shareContent: ShareContent = {
  siteName: '現実派AI副業診断',
  messageTemplate: '私は「{resultTitle}」でした。まず月1万円を現実的に目指すAI副業タイプを診断できます。',
  hashtags: ['現実派AI副業診断', 'AI副業'],
  siteUrl: 'https://example.com',
};
```

## CTA本番URLの設定例

```ts
writing: {
  title: 'まずは投稿10本と小さなテンプレを作る',
  description: '30日ロードマップでは、投稿ネタ出し、note構成、テンプレ販売ページの作り方を順番にまとめる予定です。',
  buttonLabel: '30日ロードマップを見る',
  pendingLabel: '準備中',
  pendingMessage: '詳細版は準備中です。今は上の30日プレビューを見ながら、1週目の投稿づくりから始めてください。',
  url: 'https://example.com/writing-roadmap',
},
```

## 設定後に必ず確認すること

1. URLが本番用で正しいことをユーザーに確認する。
2. `npm.cmd run build` を実行する。
3. `npm.cmd test` を実行する。
4. スマホ幅で結果ページを開き、CTAボタンが押せる状態になっていることを確認する。
5. XシェアURLに `siteUrl` が含まれていることを確認する。

## やってはいけないこと

- ユーザー確認なしで本番URLを入れない
- アフィリエイトリンクをコンポーネント内に直書きしない
- 4タイプのうち一部だけURLを入れて放置しない
- テストやbuildを省略しない
- 短縮URLや出どころ不明のURLを使わない
