import { GlassCard } from '@/components/shared/glass-card';
import { Skeleton } from '@/components/ui/skeleton';

export function ResultSkeleton() {
  return (
    <div className="space-y-4">
      {/* Main Result Skeleton */}
      <GlassCard variant="strong" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-32 bg-white/20" />
          <Skeleton className="h-6 w-16 bg-white/20" />
        </div>

        <div className="text-center py-6">
          <Skeleton className="h-12 w-48 mx-auto bg-white/20" />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-4 w-4 mx-auto mb-1 bg-white/20" />
              <Skeleton className="h-3 w-16 mx-auto mb-1 bg-white/20" />
              <Skeleton className="h-4 w-20 mx-auto bg-white/20" />
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Detail Skeleton */}
      <GlassCard variant="default" className="p-6">
        <Skeleton className="h-5 w-32 mb-4 bg-white/20" />

        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-32 bg-white/20" />
              <Skeleton className="h-4 w-24 bg-white/20" />
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
