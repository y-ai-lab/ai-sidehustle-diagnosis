type Props = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: Props) {
  const percent = Math.round((current / total) * 100);
  return (
    <div className="progressWrap" aria-label={`進捗 ${percent}%`}>
      <div className="progressMeta"><span>{current}/{total}</span><span>{percent}%</span></div>
      <div className="progressTrack"><div className="progressFill" style={{ width: `${percent}%` }} /></div>
    </div>
  );
}
