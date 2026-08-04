const axios = require('axios');
const SearchHistory = require('../models/SearchHistory');
const AppError = require('../utils/AppError');

const DEFAULT_POSTAL_API_BASE = 'https://api.postalpincode.in/pincode';
const POSTAL_TIMEOUT_MS = 15000;
const POSTAL_MAX_RETRIES = 3;
const POSTAL_RETRY_DELAY_MS = 800;

/**
 * Maps a raw India Post office object into the fields our UI displays.
 */
const mapPostOffice = (office) => ({
  name: office.Name || '',
  area: office.Block || office.Name || '',
  district: office.District || '',
  state: office.State || '',
  branchType: office.BranchType || '',
  deliveryStatus: office.DeliveryStatus || '',
  circle: office.Circle || '',
  region: office.Region || '',
  division: office.Division || '',
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Calls India Post with retries — the free public API often times out intermittently.
 */
const fetchPostalPincode = async (url) => {
  let lastError;

  for (let attempt = 1; attempt <= POSTAL_MAX_RETRIES; attempt += 1) {
    try {
      return await axios.get(url, {
        timeout: POSTAL_TIMEOUT_MS,
        headers: {
          Accept: 'application/json',
          'User-Agent': 'BangalorePincodeExplorer/1.0',
        },
      });
    } catch (error) {
      lastError = error;
      console.warn(
        `India Post request failed (attempt ${attempt}/${POSTAL_MAX_RETRIES}): ${error.code || error.message}`
      );

      if (attempt < POSTAL_MAX_RETRIES) {
        await sleep(POSTAL_RETRY_DELAY_MS * attempt);
      }
    }
  }

  throw lastError;
};

/**
 * Fetches post offices for a validated Bangalore pincode and
 * persists a search-history record on success.
 *
 * @param {string} pincode - Already validated (6 digits, starts with 560)
 * @returns {Promise<{ pincode: string, totalResults: number, postOffices: object[] }>}
 */
const lookupPincode = async (pincode) => {
  const baseUrl = process.env.POSTAL_API_BASE_URL || DEFAULT_POSTAL_API_BASE;
  const url = `${baseUrl.replace(/\/$/, '')}/${pincode}`;

  let response;

  try {
    response = await fetchPostalPincode(url);
  } catch (error) {
    throw new AppError(
      'Unable to reach the India Post service. Please try again shortly.',
      502
    );
  }

  const payload = Array.isArray(response.data) ? response.data[0] : null;

  if (!payload) {
    throw new AppError('Unexpected response from India Post API.', 502);
  }

  if (payload.Status !== 'Success' || !Array.isArray(payload.PostOffice)) {
    throw new AppError(
      payload.Message || 'No post offices found for this pincode.',
      404
    );
  }

  const postOffices = payload.PostOffice.map(mapPostOffice);
  const totalResults = postOffices.length;

  if (totalResults === 0) {
    throw new AppError('No post offices found for this pincode.', 404);
  }

  await SearchHistory.create({
    pincode,
    totalResults,
    timestamp: new Date(),
  });

  return {
    pincode,
    totalResults,
    postOffices,
  };
};

/**
 * Returns the latest successful searches (default 10).
 */
const getRecentHistory = async (limit = 10) => {
  const history = await SearchHistory.find()
    .sort({ timestamp: -1 })
    .limit(limit)
    .select('pincode timestamp totalResults -_id')
    .lean();

  return history;
};

module.exports = {
  lookupPincode,
  getRecentHistory,
};
