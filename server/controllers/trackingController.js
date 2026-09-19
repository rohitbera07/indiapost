const {
  getTrackingData,
  normalizeTrackingResponse,
} = require("../services/indiaPostService");

const trackArticle = async (req, res) => {
  const { trackingNumber } = req.params;

  if (!trackingNumber) {
    return res.status(400).json({
      success: false,
      message: "Tracking number is required",
    });
  }

  try {
    const normalizedTrackingData = normalizeTrackingResponse(
      await getTrackingData(trackingNumber.trim()),
      trackingNumber.trim()
    );

    return res.json({
      success: true,
      data: normalizedTrackingData,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { trackArticle };
