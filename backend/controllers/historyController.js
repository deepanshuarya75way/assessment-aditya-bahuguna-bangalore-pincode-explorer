const pincodeService = require('../services/pincodeService');

/**
 * GET /api/history
 * Returns the latest 10 successful searches.
 */
const getSearchHistory = async (req, res) => {
  const history = await pincodeService.getRecentHistory(10);

  res.status(200).json({
    success: true,
    data: history,
  });
};

module.exports = {
  getSearchHistory,
};
