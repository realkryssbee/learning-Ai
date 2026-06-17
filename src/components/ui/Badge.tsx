import { Award, Flame, Star, Zap, Trophy, CheckCircle } from 'lucide-react';

const BADGE_CONFIG: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  'first-module': {
    label: 'Premier module',
    icon: <CheckCircle size={12} />,
    color: '#4ADE80',
  },
  'halfway': {
    label: 'Mi-parcours',
    icon: <Zap size={12} />,
    color: '#FACC15',
  },
  'graduate': {
    label: 'Diplômé',
    icon: <Trophy size={12} />,
    color: '#FF6B47',
  },
  'perfectionist': {
    label: 'Perfectionniste',
    icon: <Star size={12} />,
    color: '#A78BFA',
  },
  'week-streak': {
    label: '7 jours de suite',
    icon: <Flame size={12} />,
    color: '#F97316',
  },
  'halfway-global': {
    label: '50% global',
    icon: <Award size={12} />,
    color: '#06B6D4',
  },
  'no-peek': {
    label: 'Sans tricher',
    icon: <Star size={12} />,
    color: '#EC4899',
  },
};

interface Props {
  badgeId: string;
  size?: 'sm' | 'md';
}

export function Badge({ badgeId, size = 'sm' }: Props) {
  const config = BADGE_CONFIG[badgeId];
  if (!config) return null;

  const padding = size === 'sm' ? 'px-2 py-0.5' : 'px-3 py-1';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-mono font-medium ${padding} ${textSize}`}
      style={{
        color: config.color,
        backgroundColor: `${config.color}20`,
        border: `1px solid ${config.color}40`,
      }}
    >
      {config.icon}
      {config.label}
    </span>
  );
}

export function BadgeGrid({ badgeIds }: { badgeIds: string[] }) {
  if (badgeIds.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {badgeIds.map((id) => (
        <Badge key={id} badgeId={id} />
      ))}
    </div>
  );
}
