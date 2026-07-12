import type { ResultContent, Scores, ShareContent } from '../types';
import { getScoreSummaries } from '../utils/calculateResult';

export const shareContent: ShareContent = {
  siteName: '現実派AI副業診断',
  siteUrl: 'https://y-ai-lab.github.io/ai-sidehustle-diagnosis/',
};

function formatHighestScoreText(scores: Scores): string {
  const highestScores = getScoreSummaries(scores).filter((score) => score.isHighest);
  const scoreText = highestScores
    .map((score) => `${score.label} ${score.score}/${score.maxScore}`)
    .join('・');

  return highestScores.length === 1
    ? `${scoreText}が一番高かった。`
    : `${scoreText}が同率で高かった。`;
}

export function buildShareUrl(result: ResultContent, scores: Scores): string {
  const text = [
    'AI副業タイプ診断やってみた。',
    '',
    '結果は',
    `「${result.shortTitle}」でした。`,
    '',
    formatHighestScoreText(scores),
    '',
    '10問・約3分・無料です。',
    shareContent.siteUrl,
    '',
    '#AI副業',
  ].join('\n');

  const params = new URLSearchParams({ text });

  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export { formatHighestScoreText };
