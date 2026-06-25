import type { ResultType, RoadmapContent } from '../types';

export const roadmaps: Record<ResultType, RoadmapContent> = {
  writing: {
    type: 'writing',
    goal: '投稿10本、note下書き1本、500〜980円のテンプレ案1つを作る',
    phases: [
      {
        period: '1週目',
        title: '読者とテーマを絞る',
        actions: ['誰向けに書くか1文で決める', '悩みを20個出す', '投稿案を10本作る'],
      },
      {
        period: '2週目',
        title: '発信して反応を見る',
        actions: ['Xに3〜5本投稿する', '反応があった言葉をメモする', 'noteの構成を作る'],
      },
      {
        period: '3週目',
        title: '小さな商品にする',
        actions: ['チェックリストを作る', 'テンプレを1つ整える', '販売説明文を書く'],
      },
      {
        period: '4週目',
        title: '改善して再投稿する',
        actions: ['無料部分を見直す', '制作ログを投稿する', '次のテンプレ案を決める'],
      },
    ],
  },
  creative: {
    type: 'creative',
    goal: '販売候補のデザイン3案と、SNSで見せる投稿3本を作る',
    phases: [
      {
        period: '1週目',
        title: '使う人と場面を決める',
        actions: ['ニッチを1つ選ぶ', '使う場面を3つ書く', 'AIで30案出す'],
      },
      {
        period: '2週目',
        title: '見せられる形に整える',
        actions: ['10案に絞る', 'Canvaで文字と余白を整える', '商品名を3案作る'],
      },
      {
        period: '3週目',
        title: '反応を見る',
        actions: ['SNS投稿を3本作る', '反応が良い案を残す', '似た案を追加で作る'],
      },
      {
        period: '4週目',
        title: '販売候補にまとめる',
        actions: ['3案だけ商品ページ風にする', '説明文を書く', '注意点や利用条件を整える'],
      },
    ],
  },
  tool: {
    type: 'tool',
    goal: '1機能だけのMVPを作り、スマホで触れる状態にする',
    phases: [
      {
        period: '1週目',
        title: '仕様を小さく決める',
        actions: ['解決する悩みを1つ選ぶ', '入力と結果を書き出す', '画面構成を手書きする'],
      },
      {
        period: '2週目',
        title: 'MVPを作る',
        actions: ['Codexに仕様を渡す', '動く画面を作る', 'スマホで表示確認する'],
      },
      {
        period: '3週目',
        title: '結果と導線を整える',
        actions: ['結果文を短くする', '仮CTAを置く', 'テストを追加する'],
      },
      {
        period: '4週目',
        title: '公開前の改善をする',
        actions: ['誤字を直す', '制作ログを書く', '改善点を3つ集める'],
      },
    ],
  },
  research: {
    type: 'research',
    goal: '比較表1本、短い記事1本、X投稿5本を作る',
    phases: [
      {
        period: '1週目',
        title: 'テーマと比較軸を決める',
        actions: ['読者を1人に絞る', '競合を10個見る', '比較軸を5つ決める'],
      },
      {
        period: '2週目',
        title: '情報を集めて確認する',
        actions: ['AI検索で調べる', '公式情報を確認する', '比較表の下書きを作る'],
      },
      {
        period: '3週目',
        title: '記事と投稿にする',
        actions: ['短い記事を書く', 'X投稿を5本作る', '根拠リンクを整理する'],
      },
      {
        period: '4週目',
        title: '継続テーマを決める',
        actions: ['反応を見直す', '次の比較テーマを選ぶ', 'ニュースレター導線を仮置きする'],
      },
    ],
  },
};
