export type CopyStatus = 'success' | 'error';

type ClipboardWriter = {
  writeText: (text: string) => Promise<void>;
};

export async function copyTextToClipboard(
  text: string,
  clipboard: ClipboardWriter | undefined = typeof navigator === 'undefined' ? undefined : navigator.clipboard
): Promise<CopyStatus> {
  if (!clipboard) return 'error';

  try {
    await Promise.race([
      clipboard.writeText(text),
      new Promise<never>((_, reject) => window.setTimeout(() => reject(new Error('copy timeout')), 1500)),
    ]);
    return 'success';
  } catch {
    return 'error';
  }
}
