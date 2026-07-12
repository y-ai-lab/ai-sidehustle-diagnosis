import { useState } from 'react';
import type { ResultContent, Scores } from '../types';
import { ctas, nextReadingLink, responsePrivacyNote } from '../data/cta';
import { glossaryItems } from '../data/glossary';
import { roadmaps } from '../data/roadmaps';
import { buildShareUrl } from '../data/share';
import { copyTextToClipboard } from '../utils/copyText';
import { getScoreSummaries } from '../utils/calculateResult';
import { formatResultText } from '../utils/formatResultText';

type Props = {
  result: ResultContent;
  scores: Scores;
  onRestart: () => void;
};

export function ResultPage({ result, scores, onRestart }: Props) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const scoreSummaries = getScoreSummaries(scores);
  const shareUrl = buildShareUrl(result, scores);
  const cta = ctas[result.type];
  const roadmap = roadmaps[result.type];
  const handleCopyResult = async () => {
    const text = formatResultText(result, scores);

    const status = await copyTextToClipboard(text);

    if (status === 'success') {
      setCopyStatus('success');
      window.setTimeout(() => setCopyStatus('idle'), 2500);
    } else {
      setCopyStatus('error');
      window.setTimeout(() => setCopyStatus('idle'), 2500);
    }
  };

  return (
    <main className="resultPage">
      <div className="resultHeader">
        <span className="eyebrow">診断結果</span>
        <h1>{result.title}</h1>
        <p className="badge">一言でいうと</p>
        <p className="lead">{result.tagline}</p>
      </div>

      <section className="scoreGrid">
        {scoreSummaries.map((score) => (
          <div key={score.type} className="scoreItem">
            <span>{score.label}</span>
            <strong>{score.score}/{score.maxScore}</strong>
            {score.isHighest && <span className="scoreAxisLabel">あなたの軸</span>}
          </div>
        ))}
      </section>

      <section className="quickActionBox">
        <p className="badge">まず今日やること</p>
        <h2>{result.firstSteps[0]}</h2>
        <p>全部やろうとしなくてOKです。まずはこの1つだけできれば、最初の前進です。</p>
      </section>

      <InfoSection title="あなたの強み" items={result.strengths} />
      <InfoSection title="最初の3ステップ" items={result.firstSteps} ordered />
      <InfoSection title="向いている稼ぎ方" items={result.suited} collapsible defaultOpen />
      <InfoSection title="向いていない稼ぎ方" items={result.unsuited} collapsible />
      <InfoSection title="お金につなげる流れ" items={result.monetizationRoute} ordered />
      <InfoSection title="最初の商品案" items={result.firstProductIdeas} collapsible />
      <InfoSection title="7日間の行動計画" items={result.roadmap7Days} collapsible defaultOpen />
      <section className="infoSection goalSection">
        <h2>30日後の目標</h2>
        <p>{result.goalAfter30Days}</p>
        <p className="sectionNote">{result.goalAfter30DaysNote}</p>
      </section>
      <InfoSection title="注意すべき弱み" items={result.weaknesses} collapsible />
      <InfoSection title="注意点" items={result.cautions} collapsible />
      <InfoSection title="まず使うAIツール" items={result.aiTools} />
      <InfoSection title="ツールにお金をかけるかの目安" items={result.toolGuidance} collapsible />
      <GlossarySection />

      <section className="roadmapPreview">
        <h2>30日間の行動計画</h2>
        <p>{roadmap.goal}</p>
        <div className="roadmapPhaseList">
          {roadmap.phases.map((phase, index) => (
            <details className="roadmapPhase" key={phase.period} open={index === 0}>
              <summary>
                <span>{phase.period}</span>
                <strong>{phase.title}</strong>
              </summary>
              <ul>
                {phase.actions.map((action) => <li key={action}>{action}</li>)}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <section className="ctaBox" aria-label="診断後にできること">
        <h2>{cta.title}</h2>
        <p>{cta.description}</p>
        <div className="ctaPromptList">
          <p><strong>noteに書くなら</strong>{cta.notePrompt}</p>
          <p><strong>Xで共有するなら</strong>{cta.xPrompt}</p>
        </div>
        <p className="experimentCta">
          成功談ではなく、実験ログとして。診断して終わりではなく、運営者自身も進捗・失敗・改善を公開しながら小さく試していきます。
        </p>
      </section>

      <section className="nextReadingBox" aria-labelledby="next-reading-title">
        <h2 id="next-reading-title">{nextReadingLink.title}</h2>
        <p>{nextReadingLink.description}</p>
        <a
          className="primaryButton nextReadingLink"
          href={nextReadingLink.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {nextReadingLink.label}
        </a>
      </section>

      <p className="responsePrivacyNote">{responsePrivacyNote}</p>

      <div className="resultActions">
        <button className="secondaryButton" onClick={handleCopyResult}>結果をコピー</button>
        <a className="shareButton" href={shareUrl} target="_blank" rel="noopener noreferrer">Xでシェア</a>
        <button className="ghostButton" onClick={onRestart}>もう一度診断する</button>
      </div>
      {copyStatus === 'success' && <p className="copyStatus">コピーしました</p>}
      {copyStatus === 'error' && <p className="copyStatus error">コピーできませんでした。もう一度お試しください。</p>}
    </main>
  );
}

function GlossarySection() {
  return (
    <details className="infoSection collapsibleSection glossarySection">
      <summary>
        <h2>用語ミニ補足</h2>
      </summary>
      <dl className="glossaryList">
        {glossaryItems.map((item) => (
          <div key={item.term} className="glossaryItem">
            <dt>{item.term}</dt>
            <dd>{item.description}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

type InfoProps = { title: string; items: string[]; ordered?: boolean; collapsible?: boolean; defaultOpen?: boolean };

function InfoSection({ title, items, ordered, collapsible, defaultOpen }: InfoProps) {
  const Tag = ordered ? 'ol' : 'ul';
  const content = (
    <Tag>
      {items.map((item) => <li key={item}>{item}</li>)}
    </Tag>
  );

  if (collapsible) {
    return (
      <details className="infoSection collapsibleSection" open={defaultOpen}>
        <summary>
          <h2>{title}</h2>
        </summary>
        {content}
      </details>
    );
  }

  return (
    <section className="infoSection">
      <h2>{title}</h2>
      {content}
    </section>
  );
}
