import type { ResultContent, Scores } from '../types';
import { shareContent } from '../data/share';
import { getScoreSummaries } from './calculateResult';

export function formatResultText(result: ResultContent, scores: Scores): string {
  const scoreText = getScoreSummaries(scores)
    .map((score) => `・${score.label} ${score.score}/${score.maxScore}`)
    .join('\n');

  return [
    `【${shareContent.siteName}】`,
    '',
    '診断結果：',
    result.shortTitle,
    `（${result.title}）`,
    '',
    'スコア：',
    scoreText,
    '',
    'まず今日やること：',
    result.firstSteps[0] ?? 'まずは気になることを1つメモする。',
    '',
    '▼診断はこちら',
    shareContent.siteUrl,
  ].join('\n');
}
