import { cn } from '@/lib/utils';

interface GlassBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function GlassBadge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: GlassBadgeProps) {
  const variants = {
    default: 'bg-slate-500/10 text-slate-700 border-slate-500/20',
    primary: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
    success: 'bg-green-500/10 text-green-700 border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
    error: 'bg-red-500/10 text-red-700 border-red-500/20',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        'backdrop-blur-xl backdrop-saturate-[180%]',
        'border',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
