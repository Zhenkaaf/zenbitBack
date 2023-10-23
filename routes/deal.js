const router = require("express").Router();
const dealSchema = require("../models/dealSchema");

//getAllDeals
router.get("/alldeals", async (req, res) => {
  try {
    console.log("dealsGet");
    const deals = await DealSchema.find();
    res.status(200).json(deals);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
