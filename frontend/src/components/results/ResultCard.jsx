import { motion } from 'framer-motion';

const Field = ({ label, value }) => (
  <div>
    <dt className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
      {label}
    </dt>
    <dd className="mt-0.5 text-sm font-medium text-[var(--text)]">{value || '—'}</dd>
  </div>
);

/**
 * Single post-office card with all required display fields.
 */
const ResultCard = ({ office, index = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.05, 0.3), ease: 'easeOut' }}
      className="surface-card p-5"
    >
      <header className="mb-4 border-b border-[var(--border)] pb-3">
        <h3 className="font-display text-lg font-semibold text-[var(--text)]">
          {office.name || 'Unnamed post office'}
        </h3>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          {office.area || 'Area unavailable'}
          {office.branchType ? ` · ${office.branchType}` : ''}
        </p>
      </header>

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Area" value={office.area} />
        <Field label="District" value={office.district} />
        <Field label="State" value={office.state} />
        <Field label="Branch Type" value={office.branchType} />
        <Field label="Delivery Status" value={office.deliveryStatus} />
        <Field label="Circle" value={office.circle} />
        <Field label="Region" value={office.region} />
        <Field label="Division" value={office.division} />
      </dl>
    </motion.article>
  );
};

export default ResultCard;
