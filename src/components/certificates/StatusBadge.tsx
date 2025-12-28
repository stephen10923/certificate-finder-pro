import { cn } from '@/lib/utils';
import { CertificateStatus } from '@/data/certificates';

interface StatusBadgeProps {
  status: CertificateStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-status-issued-bg text-status-issued': status === 'Issued',
          'bg-status-pending-bg text-status-pending': status === 'Pending',
          'bg-status-rejected-bg text-status-rejected': status === 'Rejected',
        }
      )}
    >
      <span
        className={cn('w-1.5 h-1.5 rounded-full mr-1.5', {
          'bg-status-issued': status === 'Issued',
          'bg-status-pending': status === 'Pending',
          'bg-status-rejected': status === 'Rejected',
        })}
      />
      {status}
    </span>
  );
}