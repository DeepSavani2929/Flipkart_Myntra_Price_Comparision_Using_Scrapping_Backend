const mongoose = require("mongoose");

const SpecificationSchema = new mongoose.Schema(
  {
    key: String,
    value: String,
  },
  { _id: false }
);

const MyntraProductSchema = new mongoose.Schema(
  {
    globalProductKey: {
      type: String,
      required: true,
      index: true,
    },

    productCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    productUrl: String,

    brand: String,
    productName: String,

    price: Number,
    mrp: Number,
    discount: String,

    rating: Number,
    ratingCount: String,

    images: [String],

    sizes: [String],

    highlights: [String],
    sizeFit: String,
    materialCare: String,

    specifications: [SpecificationSchema],

    source: {
      type: String,
      default: "myntra",
      index: true,
    },

    priceAlertSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("myntrascrappedData", MyntraProductSchema);
