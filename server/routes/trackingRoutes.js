const express = require("express");
const { trackArticle } = require("../controllers/trackingController");

const router = express.Router();

router.get("/:trackingNumber", trackArticle);

module.exports = router;
