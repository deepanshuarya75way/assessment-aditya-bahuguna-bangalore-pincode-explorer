import { FiMapPin } from 'react-icons/fi';
import { APP_NAME } from '../../utils/constants';
import ThemeToggle from './ThemeToggle';

/**
 * Top app bar — brand, short value prop, and theme toggle.
 */
const Header = () => {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-soft">
          <FiMapPin className="text-xl" aria-hidden="true" />
        </div>
        <div>
          <p className="font-display text-xl font-semibold tracking-tight text-[var(--text)] sm:text-2xl">
            {APP_NAME}
          </p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Find Bangalore post offices instantly by pincode.
          </p>
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
