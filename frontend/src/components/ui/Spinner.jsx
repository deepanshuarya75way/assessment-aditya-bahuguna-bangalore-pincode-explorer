/**
 * Small loading spinner for buttons and inline states.
 */
const Spinner = ({ className = 'h-5 w-5', label = 'Loading' }) => {
  return (
    <span role="status" aria-live="polite" className={`inline-flex items-center ${className}`}>
      <svg
        className="h-full w-full animate-spin text-current"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="opacity-90"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
};

export default Spinner;
