import type { Question, ResultType, ScoreDefinition, ScoreSummary, Scores } from '../types';

export const resultTypePriority: ResultType[] = ['tool', 'research', 'writing', 'creative'];

export const scoreTypes: ResultType[] = ['writing', 'creative', 'tool', 'research'];

export const scoreDefinitions: Record<ResultType, ScoreDefinition> = {
  writing: { label: '文章', maxScore: 23 },
  creative: { label: '画像・制作', maxScore: 21 },
  tool: { label: 'ツール開発', maxScore: 30 },
  research: { label: 'リサーチ', maxScore: 24 },
};

export const initialScores = (): Scores => ({
  writing: 0,
  creative: 0,
  tool: 0,
  research: 0,
});

export function calculateScores(questions: Question[], selectedOptionIndexes: number[]): Scores {
  return questions.reduce<Scores>((acc, question, questionIndex) => {
    const selectedIndex = selectedOptionIndexes[questionIndex];
    const option = question.options[selectedIndex];
    if (!option) return acc;

    Object.entries(option.scores).forEach(([key, value]) => {
      acc[key as ResultType] += value ?? 0;
    });

    return acc;
  }, initialScores());
}

export function pickResultType(scores: Scores): ResultType {
  return (Object.keys(scores) as ResultType[]).sort((a, b) => {
    const diff = scores[b] - scores[a];
    if (diff !== 0) return diff;
    return resultTypePriority.indexOf(a) - resultTypePriority.indexOf(b);
  })[0];
}

export function getScoreSummaries(scores: Scores): ScoreSummary[] {
  const highestTypes = scoreTypes.filter((type) =>
    scoreTypes.every((otherType) =>
      scores[type] * scoreDefinitions[otherType].maxScore >=
      scores[otherType] * scoreDefinitions[type].maxScore
    )
  );

  return scoreTypes.map((type) => ({
    type,
    score: scores[type],
    ...scoreDefinitions[type],
    isHighest: highestTypes.includes(type),
  }));
}
