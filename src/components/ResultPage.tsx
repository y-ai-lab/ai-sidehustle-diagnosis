import type { ResultContent, Scores } from '../types';
import { ctas } from '../data/cta';
import { roadmaps } from '../data/roadmaps';
import { buildShareUrl } from '../data/share';

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
  const shareUrl = buildShareUrl(result);
  const cta = ctas[result.type];
  const roadmap = roadmaps[result.type];
  const handleCtaClick = () => {
    if (cta.url) {
      window.location.href = cta.url;
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

      <InfoSection title="あなたの強み" items={result.strengths} />
      <InfoSection title="注意すべき弱み" items={result.weaknesses} />
      <InfoSection title="向いているAI副業" items={result.suited} />
      <InfoSection title="向いていないAI副業" items={result.unsuited} />
      <InfoSection title="最初の3ステップ" items={result.firstSteps} ordered />
      <InfoSection title="7日間ロードマップ" items={result.roadmap7Days} />
      <InfoSection title="まず使うAIツール" items={result.aiTools} />

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
        {!cta.url && <p className="ctaStatus">{cta.pendingMessage}</p>}
        <button className="primaryButton" disabled={!cta.url} onClick={handleCtaClick}>
          {cta.url ? cta.buttonLabel : cta.pendingLabel}
        </button>
      </section>

      <div className="resultActions">
        <a className="shareButton" href={shareUrl} target="_blank" rel="noreferrer">Xでシェア</a>
        <button className="ghostButton" onClick={onRestart}>もう一度診断する</button>
      </div>
    </main>
  );
}

type InfoProps = { title: string; items: string[]; ordered?: boolean };

function InfoSection({ title, items, ordered }: InfoProps) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <section className="infoSection">
      <h2>{title}</h2>
      <Tag>
        {items.map((item) => <li key={item}>{item}</li>)}
      </Tag>
    </section>
  );
}
