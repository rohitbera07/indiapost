const axios = require("axios");

const BASE_URL = process.env.INDIA_POST_BASE_URL;

const formatStatus = (status) => {
  if (!status) return "In transit";

  return status
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const formatEventDate = (date, time) => {
  if (!date) return "";

  const [year, month, day] = date.slice(0, 10).split("-");
  const monthName = new Intl.DateTimeFormat("en-GB", { month: "short" }).format(
    new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
  );
  const formattedDate = `${Number(day)} ${monthName} ${year}`;

  if (!time) return formattedDate;

  const [hours = "0", minutes = "0"] = time.split(":");
  const hour = Number(hours);
  const period = hour >= 12 ? "PM" : "AM";
  const twelveHour = hour % 12 || 12;

  return `${formattedDate} \u2022 ${String(twelveHour).padStart(2, "0")}:${minutes} ${period}`;
};

const normalizeTrackingResponse = (apiResponse, requestedTrackingNumber) => {
  if (!apiResponse?.success) {
    throw new Error(apiResponse?.message || "India Post tracking request failed");
  }

  const articles = Array.isArray(apiResponse.data) ? apiResponse.data : [];
  const article =
    articles.find(
      (item) =>
        item.booking_details?.article_number?.toUpperCase() ===
        requestedTrackingNumber.toUpperCase()
    ) || articles[0];

  if (!article) {
    throw new Error("Tracking number not found");
  }

  const booking = article.booking_details || {};
  const trackingDetails = Array.isArray(article.tracking_details)
    ? article.tracking_details
    : [];
  const latestEvent = trackingDetails[trackingDetails.length - 1];

  return {
    trackingNumber: booking.article_number || requestedTrackingNumber,
    status: formatStatus(article.del_status?.del_status),
    description: latestEvent?.event || "Tracking information received",
    updatedAt: formatEventDate(latestEvent?.date, latestEvent?.time),
    service: booking.article_type,
    location: latestEvent?.office || booking.delivery_location,
    destination: booking.delivery_location || booking.destination_pincode,
    // India Post's sample response is chronological; the UI displays newest first.
    events: [...trackingDetails].reverse().map((event) => ({
      description: event.event || "Tracking update",
      office: event.office,
      date: formatEventDate(event.date, event.time),
    })),
  };
};

const getAccessToken = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/beextcustomer/v1/access/login`,
      {
        username: process.env.INDIA_POST_USERNAME,
        password: process.env.INDIA_POST_PASSWORD,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data?.success) {
      throw new Error(
        response.data?.message || "India Post authentication failed"
      );
    }

    return response.data.data.access_token;
  } catch (error) {
    console.error(
      "India Post Login Error:",
      error.response?.data || error.message
    );

    throw new Error("Failed to authenticate with India Post");
  }
};

const getTrackingData = async (trackingNumber) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.post(
      `${BASE_URL}/beextcustomer/v1/tracking/bulk`,
      {
        bulk: [trackingNumber],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "India Post Tracking Error:",
      error.response?.data || error.message
    );

    throw new Error("Failed to fetch tracking data from India Post");
  }
};

module.exports = {
  getAccessToken,
  getTrackingData,
  normalizeTrackingResponse,
};
