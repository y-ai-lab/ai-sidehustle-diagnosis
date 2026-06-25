type Props = {
  onStart: () => void;
};

export function HomePage({ onStart }: Props) {
  return (
    <main className="hero">
      <div className="eyebrow">無料・3分・スマホ対応</div>
      <h1>現実派AI副業診断</h1>
      <p className="lead">
        平日30分、顔出しなし、初期費用少なめで始めるなら、どのAI副業タイプが合うかを診断します。
      </p>
      <p className="heroNote">結果では、最初の3ステップと7日間ロードマップまで確認できます。</p>
      <button className="primaryButton" onClick={onStart}>診断をはじめる</button>
      <section className="cards">
        <div><strong>10問</strong><span>今の生活に近い選択肢を選ぶだけ</span></div>
        <div><strong>4タイプ</strong><span>向き不向きと注意点が分かる</span></div>
        <div><strong>7日計画</strong><span>最初の行動まで具体化する</span></div>
      </section>
      <p className="disclaimer">※この診断は適性の目安です。収益を保証するものではありません。</p>
    </main>
  );
}
