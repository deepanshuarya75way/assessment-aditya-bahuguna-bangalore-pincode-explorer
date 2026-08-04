import { BANGALORE_PIN_PREFIX, PINCODE_LENGTH } from './constants';

/**
 * Client-side Bangalore pincode validation.
 * Mirrors backend middleware rules for instant UX feedback.
 * Server remains the source of truth.
 *
 * @param {string} value
 * @returns {{ valid: boolean, message: string }}
 */
export const validatePincode = (value) => {
  const pin = String(value ?? '').trim();

  if (!pin) {
    return { valid: false, message: 'Please enter a pincode.' };
  }

  if (!/^\d+$/.test(pin)) {
    return { valid: false, message: 'Pincode must contain numbers only.' };
  }

  if (pin.length !== PINCODE_LENGTH) {
    return {
      valid: false,
      message: `Pincode must be exactly ${PINCODE_LENGTH} digits.`,
    };
  }

  if (!pin.startsWith(BANGALORE_PIN_PREFIX)) {
    return {
      valid: false,
      message: `Only Bangalore pincodes are supported. Bangalore pincodes start with ${BANGALORE_PIN_PREFIX}.`,
    };
  }

  return { valid: true, message: '' };
};
