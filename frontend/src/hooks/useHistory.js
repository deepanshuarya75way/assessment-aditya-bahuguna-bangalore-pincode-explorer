import { useCallback, useEffect, useState } from 'react';
import { fetchSearchHistory, getErrorMessage } from '../services/api';

/**
 * Loads and refreshes recent successful searches from GET /api/history.
 */
const useHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadHistory = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetchSearchHistory();
      setHistory(response.data || []);
    } catch (err) {
      setError(getErrorMessage(err));
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return {
    history,
    loading,
    error,
    refreshHistory: loadHistory,
  };
};

export default useHistory;
