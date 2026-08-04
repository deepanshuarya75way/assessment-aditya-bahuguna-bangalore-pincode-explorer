import { useCallback } from 'react';
import Header from '../components/layout/Header';
import SearchBox from '../components/search/SearchBox';
import RecentSearches from '../components/search/RecentSearches';
import ResultList from '../components/results/ResultList';
import ResultSkeleton from '../components/results/ResultSkeleton';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import Toast from '../components/ui/Toast';
import useHistory from '../hooks/useHistory';
import usePincodeSearch from '../hooks/usePincodeSearch';
import useToast from '../hooks/useToast';

/**
 * Main dashboard page — wires search, history, results, and toasts.
 */
const HomePage = () => {
  const { toast, showToast, clearToast } = useToast();
  const { history, loading: historyLoading, refreshHistory } = useHistory();

  const handleSuccess = useCallback(
    (data) => {
      showToast(`Found ${data.totalResults} post office${data.totalResults === 1 ? '' : 's'}.`, 'success');
      refreshHistory();
    },
    [showToast, refreshHistory]
  );

  const handleError = useCallback(
    (message) => {
      showToast(message, 'error');
    },
    [showToast]
  );

  const {
    query,
    setQuery,
    validationError,
    loading,
    error,
    result,
    search,
  } = usePincodeSearch({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleRecentSelect = (pincode) => {
    setQuery(pincode);
    search(pincode);
  };

  const showEmpty = !loading && !error && !result && !validationError;

  return (
    <div className="app-shell">
      <Toast toast={toast} onClose={clearToast} />
      <Header />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)] lg:items-start">
        <div className="space-y-6">
          <SearchBox
            value={query}
            onChange={setQuery}
            onSubmit={search}
            loading={loading}
            validationError={validationError}
          />

          {loading && <ResultSkeleton />}

          {!loading && error && (
            <ErrorState
              title="Search failed"
              message={error}
              onRetry={() => search(query)}
            />
          )}

          {!loading && !error && result && (
            <ResultList
              result={result}
              onCopied={() => showToast('Pincode copied to clipboard.', 'success')}
            />
          )}

          {showEmpty && <EmptyState />}
        </div>

        <RecentSearches
          history={history}
          loading={historyLoading}
          onSelect={handleRecentSelect}
        />
      </div>
    </div>
  );
};

export default HomePage;
