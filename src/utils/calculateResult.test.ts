import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { ResultPage } from '../components/ResultPage';
import { calculateScores, getScoreSummaries, pickResultType, resultTypePriority, scoreDefinitions, scoreTypes } from './calculateResult';
import { questions } from '../data/questions';
import { results } from '../data/results';
import { ctas, nextReadingLink, ownerExperimentLinks, responsePrivacyNote } from '../data/cta';
import { roadmaps } from '../data/roadmaps';
import { glossaryItems } from '../data/glossary';
import { buildShareUrl, formatHighestScoreText, shareContent } from '../data/share';
import { formatResultText } from './formatResultText';
import { copyTextToClipboard } from './copyText';
import type { ResultType, Scores } from '../types';

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
      expect(result.shortTitle).toBeTruthy();
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

  it('renders one common owner experiment block after the 7-day plan for every result type', () => {
    expect(ownerExperimentLinks).toEqual({
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
    });

    resultTypes.forEach((type) => {
      const markup = renderToStaticMarkup(
        createElement(ResultPage, {
          result: results[type],
          scores: { writing: 1, creative: 1, tool: 1, research: 1 },
          onRestart: () => undefined,
        })
      );

      expect(markup).toContain(ownerExperimentLinks.title);
      expect(markup).toContain(ownerExperimentLinks.improvementNote.url);
      expect(markup).toContain(ownerExperimentLinks.x.url);
      expect(markup).toContain(ownerExperimentLinks.profileNote.url);
      expect(markup.match(/target="_blank"/g)).toHaveLength(5);
      expect(markup.match(/rel="noopener noreferrer"/g)).toHaveLength(5);
      expect(markup.indexOf('7日間の行動計画')).toBeLessThan(markup.indexOf(ownerExperimentLinks.title));
      expect(markup.indexOf(ownerExperimentLinks.title)).toBeLessThan(markup.indexOf('30日後の目標'));
      expect(markup.match(new RegExp(nextReadingLink.url, 'g'))).toHaveLength(1);
      expect(markup).not.toContain('Day1 note');
      expect(markup).not.toContain('Day2 note');
      expect(markup).not.toContain('Day3 note');
      expect(markup).not.toContain('Day4 note');
      expect(markup).not.toContain('AI診断サイトをアップデートしました');
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

    resultTypes.forEach((type) => {
      const url = buildShareUrl(results[type], { writing: 12, creative: 3, tool: 5, research: 7 });
      const shareText = new URL(url).searchParams.get('text') ?? '';
      expect(url).toContain('https://twitter.com/intent/tweet?');
      expect(shareText).toContain(results[type].shortTitle);
      expect(shareText).not.toContain(results[type].title);
      expect(shareText).toContain('文章 12/23が一番高かった。');
      expect(shareText).toContain(shareContent.siteUrl);
      expect(shareText).toContain('#AI副業');
      expect(shareText).not.toContain('現実派AI副業診断');
    });
  });

  it('formats a complete, saveable result copy for every result type', () => {
    const scores = {
      writing: 12,
      creative: 3,
      tool: 5,
      research: 7,
    };

    resultTypes.forEach((type) => {
      const text = formatResultText(results[type], scores);
      expect(text).toContain('【現実派AI副業診断】');
      expect(text).toContain('■ 主タイプ名');
      expect(text).toContain(results[type].shortTitle);
      expect(text).toContain('■ 副タイプ名');
      expect(text).toContain(results[type].title);
      expect(text).toContain('■ タイプの説明');
      expect(text).toContain(results[type].tagline);
      expect(text).toContain('■ 全スコア');
      expect(text).toContain('・文章 12/23');
      expect(text).toContain('・画像・制作 3/21');
      expect(text).toContain('・ツール開発 5/30');
      expect(text).toContain('・リサーチ 7/24');
      expect(text).toContain('■ 最高スコア');
      expect(text).toContain('■ 強み');
      expect(text).toContain('■ つまずきやすいポイント');
      expect(text).toContain('■ 向いている稼ぎ方');
      expect(text).toContain('■ 向いていない稼ぎ方');
      expect(text).toContain('■ まず今日やること');
      expect(text).toContain(results[type].firstSteps[0]);
      expect(text).toContain('■ 7日間の行動計画');
      expect(text).toContain('・Day1:');
      expect(text).toContain('・Day7:');
      expect(text).toContain('■ 30日後の目標');
      expect(text).toContain(results[type].goalAfter30Days);
      expect(text).toContain('■ 最初の商品案');
      expect(text).toContain('■ お金につなげる流れ');
      expect(text).toContain('■ おすすめのAIツール');
      expect(text).toContain('■ 課金判断');
      expect(text).toContain('■ 実践時の注意点');
      expect(text).toContain('■ 保存の目安');
      expect(text).toContain('この結果をメモなどに貼り付けて、7日間の実践中に見返してください。');
      expect(text).toContain('■ 診断サイトURL');
      expect(text).toContain(shareContent.siteUrl);
      expect(text).not.toContain('undefined');
      expect(text).not.toContain('null');
      expect(text).not.toContain('AIツール80選を読む');
      expect(text).not.toContain('この診断を作って改善した記録を読む');
      expect(text).not.toContain('Xで実験の続きを見る');
    });
  });

  it('shows the full-copy guidance and keeps the short X share action for every result type', () => {
    resultTypes.forEach((type) => {
      const markup = renderToStaticMarkup(
        createElement(ResultPage, {
          result: results[type],
          scores: { writing: 1, creative: 1, tool: 1, research: 1 },
          onRestart: () => undefined,
        })
      );

      expect(markup).toContain('診断結果を全文コピー');
      expect(markup).toContain('結果を全文コピーして、メモ帳・Notion・Obsidianなどに貼り付けておくと、7日間の実践中に見返せます。');
      expect(markup).toContain('Xでシェア');
      expect(markup).toContain('もう一度診断する');
    });
  });

  it('uses the actual per-score maximums and compares axes by ratio', () => {
    const calculatedMaximums = scoreTypes.reduce((totals, type) => {
      totals[type] = questions.reduce(
        (total, question) => total + Math.max(...question.options.map((option) => option.scores[type] ?? 0)),
        0
      );
      return totals;
    }, {} as Scores);

    expect(scoreDefinitions).toEqual({
      writing: { label: '文章', maxScore: 23 },
      creative: { label: '画像・制作', maxScore: 21 },
      tool: { label: 'ツール開発', maxScore: 30 },
      research: { label: 'リサーチ', maxScore: 24 },
    });
    expect(Object.fromEntries(scoreTypes.map((type) => [type, scoreDefinitions[type].maxScore]))).toEqual(calculatedMaximums);

    const summaries = getScoreSummaries({ writing: 0, creative: 9, tool: 10, research: 0 });
    expect(summaries.filter((score) => score.isHighest).map((score) => score.type)).toEqual(['creative']);
  });

  it('keeps every exact ratio tie as an axis and in X share text', () => {
    const tiedScores = { writing: 23, creative: 21, tool: 30, research: 24 };
    expect(getScoreSummaries(tiedScores).filter((score) => score.isHighest)).toHaveLength(4);
    expect(formatHighestScoreText(tiedScores)).toBe(
      '文章 23/23・画像・制作 21/21・ツール開発 30/30・リサーチ 24/24が同率で高かった。'
    );
  });

  it('reports both successful and failed copy attempts', async () => {
    const successfulWriter = { writeText: vi.fn().mockResolvedValue(undefined) };
    const failedWriter = { writeText: vi.fn().mockRejectedValue(new Error('denied')) };

    await expect(copyTextToClipboard('copy me', successfulWriter)).resolves.toBe('success');
    await expect(copyTextToClipboard('copy me', failedWriter)).resolves.toBe('error');
    await expect(copyTextToClipboard('copy me', undefined)).resolves.toBe('error');
  });
});
