/**
 * Skeleton placeholders shown while post-office results are loading.
 */
const ResultSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-4" aria-hidden="true">
      <div className="h-6 w-48 animate-pulse rounded-lg bg-[var(--bg-muted)]" />
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="surface-card space-y-3 p-5">
            <div className="h-5 w-2/3 animate-pulse rounded-md bg-[var(--bg-muted)]" />
            <div className="h-4 w-1/2 animate-pulse rounded-md bg-[var(--bg-muted)]" />
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full animate-pulse rounded-md bg-[var(--bg-muted)]" />
              <div className="h-3 w-5/6 animate-pulse rounded-md bg-[var(--bg-muted)]" />
              <div className="h-3 w-4/6 animate-pulse rounded-md bg-[var(--bg-muted)]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultSkeleton;
