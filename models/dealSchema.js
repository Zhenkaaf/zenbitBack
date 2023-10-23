const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const dealSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    yield: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      required: true,
    },
    ticket: {
      type: Number,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Deal = mongoose.model("Deal", dealSchema);
module.exports = Deal;
