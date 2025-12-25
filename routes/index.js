const router = require("express").Router();
const priceComparisonRoutes = require("./priceComparisonRoutes");

router.use("/prices", priceComparisonRoutes);

module.exports = router;
