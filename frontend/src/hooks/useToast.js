import { useCallback, useEffect, useRef, useState } from 'react';
import { TOAST_DURATION_MS } from '../utils/constants';

/**
 * Lightweight toast state for success/error notifications.
 * Keeps toast logic out of presentational components.
 */
const useToast = (duration = TOAST_DURATION_MS) => {
  const [toast, setToast] = useState(null);
  const timeoutRef = useRef(null);

  const clearToast = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setToast(null);
  }, []);

  const showToast = useCallback(
    (message, type = 'success') => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setToast({ message, type, id: Date.now() });

      timeoutRef.current = setTimeout(() => {
        setToast(null);
        timeoutRef.current = null;
      }, duration);
    },
    [duration]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { toast, showToast, clearToast };
};

export default useToast;
