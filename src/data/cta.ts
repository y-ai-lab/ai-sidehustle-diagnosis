import type { CtaContent, ResultType } from '../types';

export const ctas: Record<ResultType, CtaContent> = {
  writing: {
    title: 'まずは投稿10本と小さなテンプレを作る',
    description: '30日ロードマップでは、投稿ネタ出し、note構成、テンプレ販売ページの作り方を順番にまとめる予定です。',
    buttonLabel: '30日ロードマップを見る',
    pendingLabel: '準備中',
    pendingMessage: '詳細版は準備中です。今は上の30日プレビューを見ながら、1週目の投稿づくりから始めてください。',
  },
  creative: {
    title: 'まずは3案だけ商品ページ風に整える',
    description: '30日ロードマップでは、ニッチ選び、AI画像の作り方、SNSで反応を見る手順をまとめる予定です。',
    buttonLabel: '30日ロードマップを見る',
    pendingLabel: '準備中',
    pendingMessage: '詳細版は準備中です。今は上の30日プレビューを見ながら、1週目のニッチ選びから始めてください。',
  },
  tool: {
    title: 'まずは1機能だけのMVPを公開する',
    description: '30日ロードマップでは、仕様書、Codexへの指示、スマホ確認、収益導線の置き方をまとめる予定です。',
    buttonLabel: '30日ロードマップを見る',
    pendingLabel: '準備中',
    pendingMessage: '詳細版は準備中です。今は上の30日プレビューを見ながら、1週目の仕様メモから始めてください。',
  },
  research: {
    title: 'まずは比較表1本と投稿5本を作る',
    description: '30日ロードマップでは、調査テンプレ、比較表、ニュースレター導線の作り方をまとめる予定です。',
    buttonLabel: '30日ロードマップを見る',
    pendingLabel: '準備中',
    pendingMessage: '詳細版は準備中です。今は上の30日プレビューを見ながら、1週目の比較テーマ決めから始めてください。',
  },
};
