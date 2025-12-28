import { cn } from '@/lib/utils';
import { CertificateType } from '@/data/certificates';

interface TypeBadgeProps {
  type: CertificateType;
}

export function TypeBadge({ type }: TypeBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
        {
          'bg-purple-100 text-type-bonafide dark:bg-purple-900/30': type === 'Bonafide',
          'bg-cyan-100 text-type-transfer dark:bg-cyan-900/30': type === 'Transfer',
          'bg-green-100 text-type-completion dark:bg-green-900/30': type === 'Course Completion',
          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400': type === 'Merit',
          'bg-secondary text-type-other': type === 'Participation',
        }
      )}
    >
      {type}
    </span>
  );
}