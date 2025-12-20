import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "strong";
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl",
      subtle: "backdrop-blur-md bg-white/5 border border-white/10 shadow-lg",
      strong: "backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl transition-all duration-300 relative",
          variants[variant],
          className
        )}
        style={{ isolation: 'isolate' }}
        {...props}
      />
    );
  }
);

GlassCard.displayName = "GlassCard";