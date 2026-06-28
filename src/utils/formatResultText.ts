import type { ResultContent, Scores } from '../types';
import { shareContent } from '../data/share';

const scoreLabels: Record<keyof Scores, string> = {
  writing: '文章',
  creative: '画像/制作',
  tool: 'ツール開発',
  research: 'リサーチ',
};

function formatList(items: string[]): string {
  return items.map((item) => `- ${item}`).join('\n');
}

function formatNumberedList(items: string[]): string {
  return items.map((item, index) => `${index + 1}. ${item}`).join('\n');
}

export function formatResultText(result: ResultContent, scores: Scores): string {
  const scoreText = Object.entries(scores)
    .map(([key, value]) => `- ${scoreLabels[key as keyof Scores]}: ${value}`)
    .join('\n');

  const lines = [
    `【${shareContent.siteName}】`,
    '',
    `診断結果: ${result.title}`,
    '',
    '一言でいうと',
    result.tagline,
    '',
    'スコア',
    scoreText,
    '',
    'あなたの強み',
    formatList(result.strengths),
    '',
    '注意すべき弱み',
    formatList(result.weaknesses),
    '',
    '向いている稼ぎ方',
    formatList(result.suited),
    '',
    '向いていない稼ぎ方',
    formatList(result.unsuited),
    '',
    '最初の3ステップ',
    formatNumberedList(result.firstSteps),
    '',
    '収益化ルート',
    formatNumberedList(result.monetizationRoute),
    '',
    '最初の商品案',
    formatList(result.firstProductIdeas),
    '',
    '7日間ロードマップ',
    formatList(result.roadmap7Days),
    '',
    '30日後の目標',
    result.goalAfter30Days,
    result.goalAfter30DaysNote,
    '',
    '注意点',
    formatList(result.cautions),
    '',
    'まず使うAIツール',
    formatList(result.aiTools),
    '',
    'ツールの課金判断',
    formatList(result.toolGuidance),
  ];

  if (shareContent.siteUrl) {
    lines.push('', '診断サイト', shareContent.siteUrl);
  }

  return lines.join('\n');
}
