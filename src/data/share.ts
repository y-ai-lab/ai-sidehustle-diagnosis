import type { ResultContent, ShareContent } from '../types';

export const shareContent: ShareContent = {
  siteName: '現実派AI副業診断',
  messageTemplate: '私は「{resultTitle}」でした。まず月1万円を現実的に目指すAI副業タイプを診断できます。',
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
