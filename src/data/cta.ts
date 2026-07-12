import type { CtaContent, ResultType } from '../types';

export const nextReadingLink = {
  title: '次に読むなら',
  description:
    'AIツール選びで迷う人向けに、目的別の使い分けと課金の目安をまとめています。',
  label: 'AIツール80選を読む',
  url: 'https://note.com/y_ai_lab_jp/n/n5664125b1e20',
} as const;

export const responsePrivacyNote =
  '質問への回答は、このページ内だけで診断に使います。回答を保存したり、外部へ送信したりしません。';

export const ownerExperimentLinks = {
  title: 'この診断を作った人も、同じように試しています',
  paragraphs: [
    'この診断は、完成された成功ノウハウではありません。',
    '運営者自身も診断結果を使いながら、AI副業を小さく試しています。',
    'うまくいったことだけではなく、迷ったことや失敗したこと、サイトを直した過程もnoteとXに残しています。',
  ],
  improvementNote: {
    label: 'この診断を作って改善した記録を読む',
    url: 'https://note.com/y_ai_lab_jp/n/n62f7bd33385b',
  },
  x: {
    label: 'Xで実験の続きを見る',
    description: 'サイトの改善、AI副業で試したこと、うまくいかなかったこともそのまま記録しています。',
    url: 'https://x.com/y_ai_lab_jp',
  },
  profileNote: {
    label: '運営者について知る → 自己紹介note',
    url: 'https://note.com/y_ai_lab_jp/n/n3e741a74b009',
  },
} as const;

export const ctas: Record<ResultType, CtaContent> = {
  writing: {
    title: '今日の小さな一歩を記録する',
    description: 'まずはX投稿の下書き3本と、note見出し1本から。できたこと、迷ったこと、直したことを実験ログとして残していきます。',
    notePrompt: 'noteには「誰のどんな悩みを選んだか」「なぜそれを選んだか」「今日つまずいたこと」を書くと、実験ログになります。',
    xPrompt: 'Xでは、完成品ではなく「今日はこの悩みを選んだ」「投稿下書きを1本作った」だけでも十分です。',
  },
  creative: {
    title: '作例を1つだけ見せてみる',
    description: 'まずは作例3枚を目標にしつつ、今日できるのは1枚でOK。作ったものと迷った点を実験ログとして残します。',
    notePrompt: 'noteには、選んだジャンル、作った作例、うまくいかなかった見た目、次に直す点を書いてみてください。',
    xPrompt: 'Xでは、作例1枚と「誰向けに作ったか」「どこを迷ったか」を短く投稿するのがおすすめです。',
  },
  tool: {
    title: '3画面メモから始める',
    description: 'まずはトップ、入力、結果の3画面だけでOK。作りながら迷ったことも制作ログとして残します。',
    notePrompt: 'noteには、作るツールの目的、3画面メモ、詰まったところ、次に直したい点を書くと制作ログになります。',
    xPrompt: 'Xでは、仕様メモや画面の途中経過を1つ共有し、改善点を聞いてみてください。',
  },
  research: {
    title: '3つだけ比べてみる',
    description: 'まずは候補3つの比較メモから。完璧な調査ではなく、初心者目線で分かったことを記録します。',
    notePrompt: 'noteには、比較した3つの候補、迷った点、公式情報を見て分かったことを書くと記事にしやすいです。',
    xPrompt: 'Xでは、比較して気づいたことを1投稿にして、同じ悩みの人がいるか見てみてください。',
  },
};
