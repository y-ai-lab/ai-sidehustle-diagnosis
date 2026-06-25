# 現実派AI副業診断 MVP

AI副業初心者向けの無料診断サイトです。
10問程度の質問に答えると、4つのAI副業タイプのうち最も合うタイプを表示し、結果ページで具体的な行動プランを提示します。

## 技術構成

- Vite
- React
- TypeScript
- Vitest
- フロントエンドのみ
- API接続なし
- スマホ優先UI

## 開発運用ルール

今後Codexで開発を進めるときは、先に [docs/DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md) を確認してください。
編集場所、build/test手順、Codexへの依頼テンプレート、やってはいけないことをまとめています。
公開前の確認は [docs/PUBLISH_CHECKLIST.md](docs/PUBLISH_CHECKLIST.md) を使ってください。
公開方法を決めるときは [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md) を確認してください。
公開URLやCTA本番URLを設定するときは [docs/URL_SETUP_GUIDE.md](docs/URL_SETUP_GUIDE.md) を使ってください。
Git管理を始める前は [docs/GIT_START_CHECKLIST.md](docs/GIT_START_CHECKLIST.md) を確認してください。
リモートリポジトリへ接続するときは [docs/REMOTE_REPO_GUIDE.md](docs/REMOTE_REPO_GUIDE.md) を確認してください。

## 診断タイプ

1. AIライティング・コンテンツ型
2. AI画像/POD・クリエイター型
3. ノーコード/ミニツール開発型
4. リサーチ・まとめメディア型

## ディレクトリ構成

```text
src/
  App.tsx                         画面遷移と回答状態の管理
  main.tsx                        Reactのエントリポイント
  styles.css                      全体スタイル
  components/
    HomePage.tsx                  診断開始ページ
    ProgressBar.tsx               質問進捗バー
    QuestionCard.tsx              質問カード
    ResultPage.tsx                結果ページ
  data/
    cta.ts                        結果タイプ別のCTA文言と遷移先
    questions.ts                  質問、選択肢、スコア配点
    results.ts                    診断結果の表示文言
    roadmaps.ts                   30日ロードマップの中身
    share.ts                      Xシェア文と公開URL
  utils/
    calculateResult.ts            スコア集計と結果判定
    calculateResult.test.ts       診断ロジックとデータ整合性テスト
  types.ts                        共通型定義
```

## セットアップ

```bash
npm install
npm run dev
```

PowerShellで `npm.ps1` の実行ポリシーエラーが出る場合は、以下のように `npm.cmd` を使います。

```bash
npm.cmd install
npm.cmd run dev
```

## よく使うコマンド

```bash
npm run build
npm test
npm run preview
```

## 診断データの編集方法

質問を編集する場合は `src/data/questions.ts` を変更します。

- `id`: 質問の識別子
- `title`: 質問文
- `subtitle`: 補足文、任意
- `options`: 選択肢
- `scores`: 選択肢ごとの加点

結果ページの文言を編集する場合は `src/data/results.ts` を変更します。

- `title`: 結果タイプ名
- `tagline`: 一言でいうと
- `strengths`: 強み
- `weaknesses`: 注意すべき弱み
- `suited`: 向いているAI副業
- `unsuited`: 向いていないAI副業
- `firstSteps`: 最初の3ステップ
- `roadmap7Days`: 7日間ロードマップ
- `aiTools`: まず使うAIツール

CTA文言とリンク先は `src/data/cta.ts` を変更します。

- `title`: CTAセクションの見出し
- `description`: CTAの補足文
- `buttonLabel`: ボタン文言
- `pendingLabel`: URL未設定時のボタン文言
- `pendingMessage`: URL未設定時に表示する準備中メッセージ
- `url`: 公開後に設定する遷移先URL、未設定でも動作します

30日ロードマップの中身は `src/data/roadmaps.ts` を変更します。

- `goal`: 30日後に作る成果物
- `phases`: 1週目から4週目までの進め方
- `actions`: 各週でやる小さな行動

Xシェア文と公開URLは `src/data/share.ts` を変更します。

- `messageTemplate`: シェア本文。結果タイプ名は `{resultTitle}` に入ります
- `hashtags`: Xシェアに付けるハッシュタグ
- `siteUrl`: 公開後に設定するサイトURL、未設定でも動作します

スコア集計と結果判定は `src/utils/calculateResult.ts` にあります。
同点時の優先順位は `resultTypePriority` で管理しています。
現在の優先順は `tool` → `research` → `writing` → `creative` です。
同じ点数になった場合は、より準備や検証に時間が必要なタイプを先に出す方針です。

## テスト方針

現状のテストは以下を確認します。

- 選択肢からスコアが集計できること
- 同点時の優先順位が固定されていること
- 未回答や不正な回答が無視されること
- 質問データの配点が有効な診断タイプだけを使っていること
- 4タイプすべてに結果コンテンツが揃っていること
- 4タイプすべてにCTAコンテンツが揃っていること
- 4タイプすべてに30日ロードマップが揃っていること
- XシェアURLが生成できること

質問や結果データを編集したら、必ず `npm test` と `npm run build` を実行してください。

## 現在の注意点

- 結果ページのCTAボタンは仮URL状態です。URL未設定時は `src/data/cta.ts` の準備中メッセージを表示します。
- Xシェア文の公開URLは `src/data/share.ts` の `siteUrl` に追加してください。
- `package.json` の依存バージョンは固定済みです。更新する場合は、build/testまで確認してください。
- APIやデータベースは使っていません。診断内容はすべてフロントエンド内のTypeScriptデータで管理しています。
