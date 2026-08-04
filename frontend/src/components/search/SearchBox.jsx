import { FiSearch } from 'react-icons/fi';
import { PINCODE_LENGTH } from '../../utils/constants';
import Spinner from '../ui/Spinner';

/**
 * Pincode search form — supports button click and Enter key.
 */
const SearchBox = ({
  value,
  onChange,
  onSubmit,
  loading = false,
  validationError = '',
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(value);
  };

  const handleChange = (event) => {
    const next = event.target.value.replace(/\D/g, '').slice(0, PINCODE_LENGTH);
    onChange?.(next);
  };

  return (
    <form onSubmit={handleSubmit} className="surface-card p-4 sm:p-5" noValidate>
      <label htmlFor="pincode" className="mb-2 block text-sm font-medium text-[var(--text)]">
        Bangalore pincode
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="pincode"
          name="pincode"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="e.g. 560001"
          value={value}
          onChange={handleChange}
          maxLength={PINCODE_LENGTH}
          aria-invalid={Boolean(validationError)}
          aria-describedby={validationError ? 'pincode-error' : 'pincode-hint'}
          className="input-field font-medium tracking-wide"
          disabled={loading}
        />
        <button type="submit" className="btn-primary min-w-[140px]" disabled={loading}>
          {loading ? (
            <>
              <Spinner className="h-4 w-4" label="Searching" />
              Searching
            </>
          ) : (
            <>
              <FiSearch />
              Search
            </>
          )}
        </button>
      </div>
      {validationError ? (
        <p id="pincode-error" className="mt-3 text-sm text-[var(--danger)]" role="alert">
          {validationError}
        </p>
      ) : (
        <p id="pincode-hint" className="mt-3 text-sm text-[var(--text-muted)]">
          Exactly 6 digits, starting with 560.
        </p>
      )}
    </form>
  );
};

export default SearchBox;
