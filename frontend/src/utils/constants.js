/**
 * Shared app constants — single source of truth for magic strings/numbers.
 */

export const APP_NAME = 'Bangalore Pincode Explorer';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/** Bangalore pincodes are 6 digits and start with this prefix */
export const BANGALORE_PIN_PREFIX = '560';

export const PINCODE_LENGTH = 6;

/** Matches backend GET /api/history limit */
export const HISTORY_LIMIT = 10;

export const TOAST_DURATION_MS = 3000;
