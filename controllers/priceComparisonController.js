const MyntraProduct = require("../models/myntraProductSchema.js");
const FlipkartProduct = require("../models/flipkartProductSchema.js");

const comparePrices = async (req, res) => {
  try {
    const myntraProducts = await MyntraProduct.find();

    const flipkartProducts = await FlipkartProduct.find({
      globalProductKey: { $exists: true },
    }).lean();

    const flipkartMap = {};
    for (const p of flipkartProducts) {
      if (!flipkartMap[p.globalProductKey]) {
        flipkartMap[p.globalProductKey] = [];
      }
      flipkartMap[p.globalProductKey].push({
        price: p.price,
        productUrl: p.productUrl,
      });
    }

    const result = myntraProducts
      .filter((p) => flipkartMap[p.globalProductKey])
      .map((p) => {
        const cheapestFlipkart = flipkartMap[p.globalProductKey].reduce(
          (min, curr) => (curr.price < min.price ? curr : min),
          flipkartMap[p.globalProductKey][0]
        );

        return {
          globalProductKey: p.globalProductKey,
          productName: p.productName,

          myntraPrice: p.price,
          myntraProductUrl: p.productUrl,

          flipkartPrice: cheapestFlipkart.price,
          flipkartProductUrl: cheapestFlipkart.productUrl,
        };
      });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "No matching products found for price comparison",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
      message: "Price comparison data fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { comparePrices };
