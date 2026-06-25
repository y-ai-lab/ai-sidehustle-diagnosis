import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'time',
    title: '副業に使える時間は、今の生活だとどれくらいですか？',
    subtitle: '無理に時間を作る前提ではなく、続けやすい量で選んでください。',
    options: [
      { label: '平日に15〜30分なら取れる', description: '短い作業を積み上げたい', scores: { writing: 2, research: 2 } },
      { label: '平日に1時間くらい取れる', description: '投稿や調査を少しずつ進めたい', scores: { writing: 2, creative: 1, research: 2 } },
      { label: '週末にまとめて作業したい', description: '制作や商品づくりに時間を使いたい', scores: { creative: 2, tool: 2 } },
      { label: '数時間まとめて試せる日がある', description: 'ツール作成や検証にも取り組める', scores: { tool: 3, research: 1 } },
    ],
  },
  {
    id: 'device',
    title: '主にどの環境で作業しますか？',
    options: [
      { label: 'スマホ中心', description: '移動中やスキマ時間に進めたい', scores: { writing: 2, creative: 1, research: 1 } },
      { label: 'スマホとPCを半々で使う', description: '文章作成や調査は問題なくできる', scores: { writing: 2, research: 2, creative: 1 } },
      { label: 'PCで作業できる時間がある', description: '表作成やサイト編集もできそう', scores: { tool: 3, research: 2 } },
      { label: 'PCで新しいツールも触ってみたい', description: 'Codexやノーコードにも抵抗が少ない', scores: { tool: 4 } },
    ],
  },
  {
    id: 'writing',
    title: '文章を書くことは、どれくらい苦になりませんか？',
    options: [
      { label: '書くのはわりと好き', description: '考えを文章にするのが苦ではない', scores: { writing: 4, research: 2 } },
      { label: 'AIに手伝ってもらえれば書ける', description: '下書きがあれば整えられる', scores: { writing: 3, research: 1 } },
      { label: '短い投稿ならできそう', description: '長文より短文から始めたい', scores: { creative: 2, writing: 1 } },
      { label: '文章はできれば少なめがいい', description: '見た目や仕組みで勝負したい', scores: { creative: 2, tool: 2 } },
    ],
  },
  {
    id: 'visual',
    title: '画像やデザインを作ることに興味はありますか？',
    options: [
      { label: 'かなり興味がある', description: '画像生成やデザインを試したい', scores: { creative: 4 } },
      { label: 'AI画像なら触ってみたい', description: '絵が描けなくても試せるなら興味がある', scores: { creative: 3, writing: 1 } },
      { label: '必要な分だけ作れればいい', description: '見た目作りは最低限で進めたい', scores: { writing: 1, research: 2, tool: 1 } },
      { label: '画像より情報や仕組みに興味がある', description: '調査やツールのほうが向いていそう', scores: { research: 2, tool: 2 } },
    ],
  },
  {
    id: 'logic',
    title: '仕組み化やミニツール作りに興味はありますか？',
    options: [
      { label: '自分でも作ってみたい', description: '小さな診断や計算ツールに興味がある', scores: { tool: 4 } },
      { label: 'AIに作らせるなら挑戦したい', description: 'コードは不安だが指示出しは試したい', scores: { tool: 3, research: 1 } },
      { label: '便利なら使いたいが作るのは不安', description: 'まずは調査や文章から始めたい', scores: { writing: 1, research: 2 } },
      { label: '今は投稿や記事づくりを優先したい', description: '制作より発信に集中したい', scores: { writing: 3 } },
    ],
  },
  {
    id: 'research',
    title: '調べて、わかりやすくまとめる作業はどうですか？',
    options: [
      { label: '好き・得意だと思う', description: '情報を整理するのが苦ではない', scores: { research: 4 } },
      { label: 'AI検索を使えばできそう', description: 'Perplexityなどで調べるのは試したい', scores: { research: 3, writing: 1 } },
      { label: '短時間ならできる', description: '深掘りより要点整理から始めたい', scores: { writing: 2, creative: 1 } },
      { label: '調査より作るほうが楽しい', description: '画像やツールの形にしたい', scores: { creative: 2, tool: 2 } },
    ],
  },
  {
    id: 'sales',
    title: '営業やDMなど、人に売り込む作業への抵抗感は？',
    options: [
      { label: 'できれば避けたい', description: 'まずは発信や設置型の導線がいい', scores: { tool: 2, research: 2, creative: 1 } },
      { label: '軽い発信ならできる', description: 'X投稿や制作ログなら続けられそう', scores: { writing: 2, research: 2 } },
      { label: '必要なら少しできる', description: '問い合わせ対応や簡単な提案はできる', scores: { writing: 2, creative: 1, research: 1 } },
      { label: '相手に合わせて提案するのも苦ではない', description: '悩みを聞いて提案するのに抵抗が少ない', scores: { writing: 2, research: 2, tool: 1 } },
    ],
  },
  {
    id: 'cost',
    title: '最初にかけられる費用はどれくらいですか？',
    options: [
      { label: 'できるだけ0円で始めたい', description: '無料ツール中心で試したい', scores: { writing: 2, research: 2 } },
      { label: '月1,000〜3,000円なら使える', description: 'AIツール1つくらいなら検討できる', scores: { writing: 2, creative: 2, research: 1 } },
      { label: '月5,000円前後までなら使える', description: '画像生成や制作ツールも試したい', scores: { creative: 2, tool: 2 } },
      { label: '必要性が見えれば少し投資できる', description: '検証のためのツール代は考えられる', scores: { tool: 3, creative: 1 } },
    ],
  },
  {
    id: 'pace',
    title: '進め方として、どれが一番しっくりきますか？',
    options: [
      { label: '毎日少しずつ積み上げたい', description: '投稿やまとめを継続するほうが合う', scores: { writing: 2, research: 3 } },
      { label: 'アイデアを作品にして試したい', description: '見た目のある成果物を作りたい', scores: { creative: 3, tool: 1 } },
      { label: '仕組みを作ってあとで楽にしたい', description: '一度作って使い回せる形が好き', scores: { tool: 4 } },
      { label: '小さく出して反応を見ながら直したい', description: '完璧より検証を優先したい', scores: { writing: 1, research: 2, creative: 1 } },
    ],
  },
  {
    id: 'goal',
    title: '最初の目標に一番近いものはどれですか？',
    subtitle: '大きく稼ぐより、まず月1万円に近づく前提で選んでください。',
    options: [
      { label: '文章やテンプレで小さく売りたい', description: 'noteやXから始めたい', scores: { writing: 3, research: 2 } },
      { label: '販売できる画像素材や商品を作りたい', description: 'PODやデザイン素材を試したい', scores: { creative: 4 } },
      { label: '無料ツールや診断サイトを作りたい', description: 'あとで収益導線を置ける資産を作りたい', scores: { tool: 4 } },
      { label: '調査や比較を発信して信頼を作りたい', description: 'まとめ記事やニュースレターを育てたい', scores: { research: 3, writing: 2 } },
    ],
  },
];
