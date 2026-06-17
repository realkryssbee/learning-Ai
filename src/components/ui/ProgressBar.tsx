interface Props {
  value: number; // 0-100
  className?: string;
  color?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

export function ProgressBar({ value, className = '', color = '#FF6B47', showLabel = false, size = 'sm' }: Props) {
  const height = size === 'sm' ? 'h-1' : 'h-2';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`flex-1 bg-bg-border rounded-full overflow-hidden ${height}`}>
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: color }}
        />
      </div>
      {showLabel && (
        <span className="font-mono text-xs text-text-secondary w-8 text-right">{value}%</span>
      )}
    </div>
  );
}
