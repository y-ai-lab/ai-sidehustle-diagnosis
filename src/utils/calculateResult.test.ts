import { describe, expect, it } from 'vitest';
import { calculateScores, pickResultType, resultTypePriority } from './calculateResult';
import { questions } from '../data/questions';
import { results } from '../data/results';
import { ctas } from '../data/cta';
import { roadmaps } from '../data/roadmaps';
import { buildShareUrl, shareContent } from '../data/share';
import type { ResultType } from '../types';

const resultTypes: ResultType[] = ['writing', 'creative', 'tool', 'research'];

describe('calculate result', () => {
  it('picks a result type from selected answers', () => {
    const answers = questions.map(() => 0);
    const scores = calculateScores(questions, answers);
    expect(Object.values(scores).some((score) => score > 0)).toBe(true);
    expect(['writing', 'creative', 'tool', 'research']).toContain(pickResultType(scores));
  });

  it('uses tie-break priority', () => {
    expect(pickResultType({ writing: 1, creative: 1, tool: 1, research: 1 })).toBe('tool');
    expect(resultTypePriority).toEqual(['tool', 'research', 'writing', 'creative']);
  });

  it('ignores missing or invalid selected answers', () => {
    expect(calculateScores(questions, [])).toEqual({
      writing: 0,
      creative: 0,
      tool: 0,
      research: 0,
    });
    expect(calculateScores(questions, questions.map(() => 999))).toEqual({
      writing: 0,
      creative: 0,
      tool: 0,
      research: 0,
    });
  });

  it('keeps question scoring data editable and valid', () => {
    expect(questions).toHaveLength(10);

    questions.forEach((question) => {
      expect(question.id).toBeTruthy();
      expect(question.title).toBeTruthy();
      expect(question.options.length).toBeGreaterThanOrEqual(2);

      question.options.forEach((option) => {
        expect(option.label).toBeTruthy();
        expect(Object.keys(option.scores).length).toBeGreaterThan(0);
        Object.entries(option.scores).forEach(([type, score]) => {
          expect(resultTypes).toContain(type);
          expect(score).toBeGreaterThan(0);
        });
      });
    });
  });

  it('has complete result content for every result type', () => {
    expect(Object.keys(results).sort()).toEqual([...resultTypes].sort());

    resultTypes.forEach((type) => {
      const result = results[type];
      expect(result.type).toBe(type);
      expect(result.title).toBeTruthy();
      expect(result.tagline).toBeTruthy();
      expect(result.strengths.length).toBeGreaterThan(0);
      expect(result.weaknesses.length).toBeGreaterThan(0);
      expect(result.suited.length).toBeGreaterThan(0);
      expect(result.unsuited.length).toBeGreaterThan(0);
      expect(result.firstSteps.length).toBe(3);
      expect(result.roadmap7Days).toHaveLength(7);
      expect(result.aiTools.length).toBeGreaterThan(0);
    });
  });

  it('has editable CTA content for every result type', () => {
    expect(Object.keys(ctas).sort()).toEqual([...resultTypes].sort());

    resultTypes.forEach((type) => {
      const cta = ctas[type];
      expect(cta.title).toBeTruthy();
      expect(cta.description).toBeTruthy();
      expect(cta.buttonLabel).toBeTruthy();
      expect(cta.pendingLabel).toBeTruthy();
      expect(cta.pendingMessage).toBeTruthy();
    });
  });

  it('has 30-day roadmap content for every result type', () => {
    expect(Object.keys(roadmaps).sort()).toEqual([...resultTypes].sort());

    resultTypes.forEach((type) => {
      const roadmap = roadmaps[type];
      expect(roadmap.type).toBe(type);
      expect(roadmap.goal).toBeTruthy();
      expect(roadmap.phases).toHaveLength(4);
      roadmap.phases.forEach((phase) => {
        expect(phase.period).toBeTruthy();
        expect(phase.title).toBeTruthy();
        expect(phase.actions.length).toBeGreaterThanOrEqual(3);
      });
    });
  });

  it('builds editable X share URLs', () => {
    expect(shareContent.siteName).toBeTruthy();
    expect(shareContent.messageTemplate).toContain('{resultTitle}');
    expect(shareContent.hashtags.length).toBeGreaterThan(0);

    const url = buildShareUrl(results.writing);
    expect(url).toContain('https://twitter.com/intent/tweet?');
    expect(decodeURIComponent(url)).toContain(results.writing.title);
    expect(decodeURIComponent(url)).toContain(shareContent.hashtags[0]);
  });
});
