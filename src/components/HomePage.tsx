type Props = {
  onStart: () => void;
};

export function HomePage({ onStart }: Props) {
  return (
    <main className="hero">
      <div className="eyebrow">登録不要・無料・その場で結果表示</div>
      <h1>AI副業の“最初の一歩”を診断します。</h1>
      <p className="lead">
        副収入は欲しい。でも何から始めればいいか分からない人へ。
        性格・使える時間・得意不得意に合わせて、現実的に続けやすいAI副業ルートを提案します。
      </p>
      <p className="heroNote">大きな成果を急がず、まずは今日できる小さな一歩から。</p>
      <p className="experimentNote">
        この診断は、完成された成功ノウハウではありません。運営者自身もAI副業を実験し、失敗や改善も含めて記録していきます。
      </p>
      <button className="primaryButton" onClick={onStart}>診断をはじめる</button>
      <section className="cards">
        <div><strong>10問</strong><span>今の生活に近い選択肢を選ぶだけ</span></div>
        <div><strong>4タイプ</strong><span>自分に合う稼ぎ方と注意点が分かる</span></div>
        <div><strong>7日計画</strong><span>今日やることまで具体化する</span></div>
      </section>
      <p className="disclaimer">※この診断は適性の目安です。収益を保証するものではありません。</p>
    </main>
  );
}
