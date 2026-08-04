import { useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';

/**
 * Copies a value (usually a pincode) to the clipboard with brief visual feedback.
 */
const CopyButton = ({ value, label = 'Copy pincode', onCopied }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(value));
      setCopied(true);
      onCopied?.();
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback for older browsers / insecure contexts
      const textarea = document.createElement('textarea');
      textarea.value = String(value);
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      onCopied?.();
      window.setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="btn-ghost"
      aria-label={copied ? 'Copied' : label}
      title={copied ? 'Copied' : label}
    >
      {copied ? <FiCheck className="text-brand-600 dark:text-brand-300" /> : <FiCopy />}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
};

export default CopyButton;
