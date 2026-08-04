import { useCallback, useState } from 'react';
import { fetchPincodeDetails, getErrorMessage } from '../services/api';
import { validatePincode } from '../utils/validatePincode';

/**
 * Encapsulates pincode search: client validation, API call, and result state.
 */
const usePincodeSearch = ({ onSuccess, onError } = {}) => {
  const [query, setQuery] = useState('');
  const [validationError, setValidationError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const search = useCallback(
    async (rawPin) => {
      const pin = String(rawPin ?? query).trim();
      const validation = validatePincode(pin);

      if (!validation.valid) {
        setValidationError(validation.message);
        setError('');
        setResult(null);
        return null;
      }

      setValidationError('');
      setError('');
      setLoading(true);
      setQuery(pin);

      try {
        const response = await fetchPincodeDetails(pin);
        const data = response.data;
        setResult(data);
        onSuccess?.(data);
        return data;
      } catch (err) {
        const message = getErrorMessage(err);
        setResult(null);
        setError(message);
        onError?.(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [query, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setQuery('');
    setValidationError('');
    setError('');
    setResult(null);
    setLoading(false);
  }, []);

  return {
    query,
    setQuery,
    validationError,
    loading,
    error,
    result,
    search,
    reset,
  };
};

export default usePincodeSearch;
