import { FiClock } from 'react-icons/fi';

const formatTimestamp = (value) => {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value));
  } catch {
    return '';
  }
};

/**
 * Lists the latest successful searches. Clicking a row re-runs that search.
 */
const RecentSearches = ({ history = [], loading = false, onSelect }) => {
  return (
    <section className="surface-card p-4 sm:p-5" aria-labelledby="recent-searches-heading">
      <div className="mb-4 flex items-center gap-2">
        <FiClock className="text-brand-600 dark:text-brand-300" aria-hidden="true" />
        <h2 id="recent-searches-heading" className="font-display text-base font-semibold">
          Recent searches
        </h2>
      </div>

      {loading && (
        <ul className="space-y-2" aria-hidden="true">
          {Array.from({ length: 4 }).map((_, index) => (
            <li
              key={index}
              className="h-12 animate-pulse rounded-xl bg-[var(--bg-muted)]"
            />
          ))}
        </ul>
      )}

      {!loading && history.length === 0 && (
        <p className="text-sm text-[var(--text-muted)]">
          Successful searches will appear here.
        </p>
      )}

      {!loading && history.length > 0 && (
        <ul className="divide-y divide-[var(--border)]">
          {history.map((item) => (
            <li key={`${item.pincode}-${item.timestamp}`}>
              <button
                type="button"
                onClick={() => onSelect?.(item.pincode)}
                className="flex w-full items-center justify-between gap-3 py-3 text-left transition hover:bg-[var(--bg-muted)] sm:rounded-xl sm:px-2"
              >
                <div>
                  <p className="font-semibold tracking-wide text-[var(--text)]">{item.pincode}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {formatTimestamp(item.timestamp)}
                  </p>
                </div>
                <span className="rounded-lg bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-medium text-brand-700 dark:text-brand-300">
                  {item.totalResults} result{item.totalResults === 1 ? '' : 's'}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default RecentSearches;
