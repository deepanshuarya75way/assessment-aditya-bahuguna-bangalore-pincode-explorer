import CopyButton from '../ui/CopyButton';
import ResultCard from './ResultCard';

/**
 * Renders the successful search summary and post-office cards.
 */
const ResultList = ({ result, onCopied }) => {
  if (!result) return null;

  const { pincode, totalResults, postOffices = [] } = result;

  return (
    <section aria-labelledby="results-heading" className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="results-heading" className="font-display text-lg font-semibold text-[var(--text)]">
            Results for {pincode}
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            {totalResults} post office{totalResults === 1 ? '' : 's'} found
          </p>
        </div>
        <CopyButton value={pincode} onCopied={onCopied} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {postOffices.map((office, index) => (
          <ResultCard
            key={`${office.name}-${office.division}-${index}`}
            office={office}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ResultList;
