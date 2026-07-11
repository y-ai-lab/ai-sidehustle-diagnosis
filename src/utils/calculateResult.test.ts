import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ResultPage } from '../components/ResultPage';
import { calculateScores, pickResultType, resultTypePriority } from './calculateResult';
import { questions } from '../data/questions';
import { results } from '../data/results';
import { ctas, nextReadingLink, responsePrivacyNote } from '../data/cta';
import { roadmaps } from '../data/roadmaps';
import { glossaryItems } from '../data/glossary';
import { buildShareUrl, shareContent } from '../data/share';
import { formatResultText } from './formatResultText';
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
      expect(result.monetizationRoute.length).toBeGreaterThan(0);
      expect(result.firstProductIdeas.length).toBeGreaterThan(0);
      expect(result.roadmap7Days).toHaveLength(7);
      expect(result.goalAfter30Days).toBeTruthy();
      expect(result.goalAfter30DaysNote).toBeTruthy();
      expect(result.cautions.length).toBeGreaterThan(0);
      expect(result.aiTools.length).toBeGreaterThan(0);
      expect(result.toolGuidance.length).toBeGreaterThan(0);
    });
  });

  it('keeps Day2 roadmap actions clear for beginners', () => {
    resultTypes.forEach((type) => {
      const day2 = results[type].roadmap7Days[1];
      expect(day2).toContain('Day2:');
      expect(day2).not.toContain('入力するもの、表示する結果、次にやることを1行ずつメモする');
    });

    expect(results.tool.firstSteps[1]).toContain('相手に答えてもらうこと');
    expect(results.tool.roadmap7Days[1]).toContain('結果を見た人が次にすること');
    expect(results.research.roadmap7Days[1]).toContain('次に何を試せばいいか');
  });

  it('has editable next-action content for every result type', () => {
    expect(Object.keys(ctas).sort()).toEqual([...resultTypes].sort());

    resultTypes.forEach((type) => {
      const cta = ctas[type];
      expect(cta.title).toBeTruthy();
      expect(cta.description).toBeTruthy();
      expect(cta.notePrompt).toBeTruthy();
      expect(cta.xPrompt).toBeTruthy();
      expect('pendingLabel' in cta).toBe(false);
      expect('pendingMessage' in cta).toBe(false);
    });
  });

  it('uses one public next-reading link and explains how answers are handled', () => {
    expect(nextReadingLink).toEqual({
      title: '次に読むなら',
      description:
        'AIツール選びで迷う人向けに、目的別の使い分けと課金の目安をまとめています。',
      label: 'AIツール80選を読む',
      url: 'https://note.com/y_ai_lab_jp/n/n5664125b1e20',
    });
    expect(responsePrivacyNote).toBe(
      '質問への回答は、このページ内だけで診断に使います。回答を保存したり、外部へ送信したりしません。'
    );
  });

  it('renders the common next-reading link for every result type without a disabled pending CTA', () => {
    resultTypes.forEach((type) => {
      const markup = renderToStaticMarkup(
        createElement(ResultPage, {
          result: results[type],
          scores: { writing: 1, creative: 1, tool: 1, research: 1 },
          onRestart: () => undefined,
        })
      );

      expect(markup).toContain(nextReadingLink.url);
      expect(markup).toContain('target="_blank"');
      expect(markup).toContain('rel="noopener noreferrer"');
      expect(markup).toContain(responsePrivacyNote);
      expect(markup).not.toContain('disabled');
      expect(markup).not.toContain('詳細版は準備中');
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

  it('keeps beginner glossary content available', () => {
    const terms = glossaryItems.map((item) => item.term);
    expect(terms).toEqual([
      'X投稿',
      'note',
      'チェックリスト',
      'ひな形',
      '収益化',
      '無料配布',
      '低価格商品',
      'PR表記',
      'アフィリエイト',
      '試作品',
    ]);

    glossaryItems.forEach((item) => {
      expect(item.description).toBeTruthy();
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

  it('formats result text for copy and note drafts', () => {
    const text = formatResultText(results.writing, {
      writing: 12,
      creative: 3,
      tool: 5,
      research: 7,
    });

    expect(text).toContain('【現実派AI副業診断】');
    expect(text).toContain(`診断結果: ${results.writing.title}`);
    expect(text).toContain('最初の3ステップ');
    expect(text).toContain('お金につなげる流れ');
    expect(text).toContain('最初の商品案');
    expect(text).toContain('7日間の行動計画');
    expect(text).toContain('30日後の目標');
    expect(text).toContain('注意点');
    expect(text).toContain('ツールにお金をかけるかの目安');
    expect(text).toContain(shareContent.siteUrl);
  });
});
