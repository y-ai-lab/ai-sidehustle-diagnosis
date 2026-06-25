import type { Question, ResultType, Scores } from '../types';

export const resultTypePriority: ResultType[] = ['tool', 'research', 'writing', 'creative'];

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
