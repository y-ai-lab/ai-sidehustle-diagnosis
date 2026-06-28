import type { ResultContent, ShareContent } from '../types';

export const shareContent: ShareContent = {
  siteName: '現実派AI副業診断',
  messageTemplate: 'AI副業診断をやってみた。結果は「{resultTitle}」。完璧を目指さず、まず今日1つだけ小さく試してみます。運営者も実験ログとして進捗・失敗・改善を公開中。',
  hashtags: ['現実派AI副業診断', 'AI副業'],
  siteUrl: 'https://y-ai-lab.github.io/ai-sidehustle-diagnosis/',
};

export function buildShareUrl(result: ResultContent): string {
  const text = shareContent.messageTemplate.replace('{resultTitle}', result.title);
  const params = new URLSearchParams({
    text,
    hashtags: shareContent.hashtags.join(','),
  });

  if (shareContent.siteUrl) {
    params.set('url', shareContent.siteUrl);
  }

  return `https://twitter.com/intent/tweet?${params.toString()}`;
}
