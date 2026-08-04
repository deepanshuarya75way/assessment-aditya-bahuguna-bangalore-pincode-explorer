import { FiAlertTriangle } from 'react-icons/fi';

/**
 * Error state for failed API lookups or empty server responses surfaced as errors.
 */
const ErrorState = ({
  title = 'Something went wrong',
  message = 'We could not complete that search. Please try again.',
  onRetry,
}) => {
  return (
    <div className="surface-card flex flex-col items-center px-6 py-12 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--danger-soft)] text-2xl text-[var(--danger)]">
        <FiAlertTriangle aria-hidden="true" />
      </div>
      <h3 className="font-display text-lg font-semibold text-[var(--text)]">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--text-muted)]">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-primary mt-6">
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
