import type { ResultContent, Scores } from '../types';
import { shareContent } from '../data/share';
import { getScoreSummaries } from './calculateResult';

export function formatResultText(result: ResultContent, scores: Scores): string {
  const scoreSummaries = getScoreSummaries(scores);
  const highestScores = scoreSummaries.filter((score) => score.isHighest);

  const section = (title: string, lines: string[]) => [
    `■ ${title}`,
    ...lines.filter(Boolean).map((line) => `・${line}`),
  ].join('\n');

  return [
    `【${shareContent.siteName}】`,
    section('主タイプ名', [result.shortTitle]),
    section('副タイプ名', [result.title]),
    section('タイプの説明', [result.tagline]),
    section('全スコア', scoreSummaries.map((score) => `${score.label} ${score.score}/${score.maxScore}`)),
    section('最高スコア', highestScores.map((score) => `${score.label} ${score.score}/${score.maxScore}`)),
    section('強み', result.strengths),
    section('つまずきやすいポイント', result.weaknesses),
    section('向いている稼ぎ方', result.suited),
    section('向いていない稼ぎ方', result.unsuited),
    section('まず今日やること', result.firstSteps.slice(0, 1)),
    section('7日間の行動計画', result.roadmap7Days),
    section('30日後の目標', [result.goalAfter30Days, result.goalAfter30DaysNote]),
    section('最初の商品案', result.firstProductIdeas),
    section('お金につなげる流れ', result.monetizationRoute),
    section('おすすめのAIツール', result.aiTools),
    section('課金判断', result.toolGuidance),
    section('実践時の注意点', result.cautions),
    section('保存の目安', ['この結果をメモなどに貼り付けて、7日間の実践中に見返してください。']),
    section('診断サイトURL', [shareContent.siteUrl]),
  ].join('\n\n');
}
