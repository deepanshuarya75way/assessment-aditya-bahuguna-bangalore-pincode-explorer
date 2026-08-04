import { FiMapPin } from 'react-icons/fi';

/**
 * Friendly empty state when there are no results yet / nothing to show.
 */
const EmptyState = ({
  title = 'Search a Bangalore pincode',
  description = 'Enter a 6-digit pincode starting with 560 to see post offices in that area.',
  icon: Icon = FiMapPin,
}) => {
  return (
    <div className="surface-card flex flex-col items-center px-6 py-14 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-2xl text-brand-600 dark:text-brand-300">
        <Icon aria-hidden="true" />
      </div>
      <h3 className="font-display text-lg font-semibold text-[var(--text)]">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
