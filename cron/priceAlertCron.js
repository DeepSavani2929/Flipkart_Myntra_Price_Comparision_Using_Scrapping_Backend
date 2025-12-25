const cron = require("node-cron");
const MyntraProduct = require("../models/myntraProductSchema");
const FlipkartProduct = require("../models/flipkartProductSchema");

cron.schedule("*/30 * * * *", async () => {
  console.log(" Running price alert cron job (every 10s)...");

  try {
    const myntraDeals = await MyntraProduct.find({
      price: { $lt: 1500 },
    });

    if (!myntraDeals.length) {
      console.log(" No new Myntra deals found for alerts.");
      return;
    }

    for (const product of myntraDeals) {
      console.log(
        `🔔 ALERT (Myntra): ${product.productName} dropped to ₹${product.price}`
      );

      product.priceAlertSent = true;
      await product.save();
    }

    const flipkartDeals = await FlipkartProduct.find({
      price: { $lt: 1500 },
      priceAlertSent: false,
    });

    if (!flipkartDeals.length) {
      console.log(" No new Flipkart deals found for alerts.");
      return;
    }

    for (const product of flipkartDeals) {
      console.log(
        `🔔 ALERT (Flipkart): ${product.productName} dropped to ₹${product.price}`
      );

      product.priceAlertSent = true;
      await product.save();
    }
  } catch (err) {
    console.error(" Cron Job Error:", err.message);
  }
});
