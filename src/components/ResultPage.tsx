import { useState } from 'react';
import type { ResultContent, Scores } from '../types';
import { ctas } from '../data/cta';
import { roadmaps } from '../data/roadmaps';
import { buildShareUrl } from '../data/share';
import { formatResultText } from '../utils/formatResultText';

type Props = {
  result: ResultContent;
  scores: Scores;
  onRestart: () => void;
};

const labelMap: Record<keyof Scores, string> = {
  writing: '文章',
  creative: '画像/制作',
  tool: 'ツール開発',
  research: 'リサーチ',
};

export function ResultPage({ result, scores, onRestart }: Props) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const shareUrl = buildShareUrl(result);
  const cta = ctas[result.type];
  const roadmap = roadmaps[result.type];
  const handleCtaClick = () => {
    if (cta.url) {
      window.location.href = cta.url;
    }
  };
  const handleCopyResult = async () => {
    const text = formatResultText(result, scores);

    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus('success');
    } catch {
      setCopyStatus('error');
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
        {Object.entries(scores).map(([key, value]) => (
          <div key={key} className="scoreItem">
            <span>{labelMap[key as keyof Scores]}</span>
            <strong>{value}</strong>
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
      <InfoSection title="収益化ルート" items={result.monetizationRoute} ordered />
      <InfoSection title="最初の商品案" items={result.firstProductIdeas} collapsible />
      <InfoSection title="7日間ロードマップ" items={result.roadmap7Days} collapsible defaultOpen />
      <section className="infoSection goalSection">
        <h2>30日後の目標</h2>
        <p>{result.goalAfter30Days}</p>
        <p className="sectionNote">{result.goalAfter30DaysNote}</p>
      </section>
      <InfoSection title="注意すべき弱み" items={result.weaknesses} collapsible />
      <InfoSection title="注意点" items={result.cautions} collapsible />
      <InfoSection title="まず使うAIツール" items={result.aiTools} />
      <InfoSection title="ツールの課金判断" items={result.toolGuidance} collapsible />

      <section className="roadmapPreview">
        <h2>30日ロードマップの中身</h2>
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

      <section className="ctaBox" aria-label="CTAセクション">
        <h2>{cta.title}</h2>
        <p>{cta.description}</p>
        <div className="ctaPromptList">
          <p><strong>noteに書くなら</strong>{cta.notePrompt}</p>
          <p><strong>Xで共有するなら</strong>{cta.xPrompt}</p>
        </div>
        <p className="experimentCta">
          成功談ではなく、実験ログとして。診断して終わりではなく、運営者自身も進捗・失敗・改善を公開しながら小さく試していきます。
        </p>
        {!cta.url && <p className="ctaStatus">{cta.pendingMessage}</p>}
        <button className="primaryButton" disabled={!cta.url} onClick={handleCtaClick}>
          {cta.url ? cta.buttonLabel : cta.pendingLabel}
        </button>
      </section>

      <div className="resultActions">
        <button className="secondaryButton" onClick={handleCopyResult}>結果をコピー</button>
        <a className="shareButton" href={shareUrl} target="_blank" rel="noreferrer">Xでシェア</a>
        <button className="ghostButton" onClick={onRestart}>もう一度診断する</button>
      </div>
      {copyStatus === 'success' && <p className="copyStatus">結果をコピーしました。noteやメモに貼り付けできます。</p>}
      {copyStatus === 'error' && <p className="copyStatus error">コピーできませんでした。ブラウザの権限を確認してください。</p>}
    </main>
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
