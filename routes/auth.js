const router = require("express").Router();
const UserSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.userPassword, 7);
    const newUser = new UserSchema({
      userEmail: req.body.userEmail,
      userPassword: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await UserSchema.findOne({ userEmail: req.body.userEmail });
    if (!user) {
      return res.status(400).json("Wrong credentials");
    }
    const validated = await bcrypt.compare(
      req.body.userPassword,
      user.userPassword
    );
    if (!validated) {
      return res.status(400).json("Wrong credentials");
    }
    const { userPassword, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
