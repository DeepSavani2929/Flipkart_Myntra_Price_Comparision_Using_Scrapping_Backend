const router = require("express").Router();
const { comparePrices } = require("../controllers/priceComparisonController");

router.get("/comparePrices", comparePrices);

module.exports = router;
