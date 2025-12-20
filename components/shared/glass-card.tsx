import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const glassCardVariants = cva(
  'relative overflow-hidden rounded-xl transition-all duration-300',
  {
    variants: {
      variant: {
        default: [
          'backdrop-blur-lg bg-white/50',
          'border border-white/20',
          'shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]',
        ],
        subtle: [
          'backdrop-blur-md bg-white/5',
          'border border-white/10',
          'shadow-lg',
        ],
        strong: [
          'backdrop-blur-xl bg-white/20',
          'border border-white/30',
          'shadow-2xl',
        ],
      },
      hover: {
        true: 'hover:bg-white/20 hover:border-white/30',
        false: '',
      },
      glow: {
        true: 'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      hover: false,
      glow: false,
    },
  }
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant, hover, glow, children, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(glassCardVariants({ variant, hover, glow }), className)}
        style={{ isolation: 'isolate', ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard, glassCardVariants };
