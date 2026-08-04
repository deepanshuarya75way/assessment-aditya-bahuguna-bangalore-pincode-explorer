import { AnimatePresence, motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

/**
 * Toast notification UI. Controlled by useToast().
 */
const Toast = ({ toast, onClose }) => {
  const isError = toast?.type === 'error';

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="alert"
            className={`pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border px-4 py-3 shadow-card ${
              isError
                ? 'border-[var(--danger)]/30 bg-[var(--danger-soft)] text-[var(--danger)]'
                : 'border-brand-500/30 bg-[var(--accent-soft)] text-brand-700 dark:text-brand-300'
            }`}
          >
            <span className="mt-0.5 shrink-0 text-lg">
              {isError ? <FiAlertCircle /> : <FiCheckCircle />}
            </span>
            <p className="flex-1 text-sm font-medium text-[var(--text)]">{toast.message}</p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-[var(--text-muted)] transition hover:bg-black/5 hover:text-[var(--text)] dark:hover:bg-white/10"
              aria-label="Dismiss notification"
            >
              <FiX />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
